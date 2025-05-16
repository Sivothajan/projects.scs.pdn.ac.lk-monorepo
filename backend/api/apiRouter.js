import dotenv from "dotenv";
import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(json());

// Local data file paths
const LOCAL_DATA_PATH = path.resolve(process.cwd(), "../data");
const LOCAL_COURSES_PATH = path.join(LOCAL_DATA_PATH, "courses.json");
const LOCAL_INSTRUCTORS_PATH = path.join(LOCAL_DATA_PATH, "instructors.json");
const LOCAL_PROJECTS_PATH = path.join(LOCAL_DATA_PATH, "projects.json");
const LOCAL_STUDENTS_PATH = path.join(LOCAL_DATA_PATH, "students.json");

// Environment variables for data sources (abstracted)
const COURSES_URL = process.env.GITHUB_COURSES_URL;
const INSTRUCTORS_URL = process.env.GITHUB_INSTRUCTORS_URL;
const PROJECTS_URL = process.env.GITHUB_PROJECTS_URL;
const STUDENTS_URL = process.env.GITHUB_STUDENTS_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper function to fetch data (first from local file, then from GitHub as fallback)
const fetchData = async (url) => {
  try {
    // Determine which local file to check based on the URL
    let localPath = null;
    if (url === COURSES_URL) {
      localPath = LOCAL_COURSES_PATH;
    } else if (url === INSTRUCTORS_URL) {
      localPath = LOCAL_INSTRUCTORS_PATH;
    } else if (url === PROJECTS_URL) {
      localPath = LOCAL_PROJECTS_PATH;
    } else if (url === STUDENTS_URL) {
      localPath = LOCAL_STUDENTS_PATH;
    }

    // If USE_LOCAL_DATA flag is set or GitHub token isn't available, prioritize local files
    if (process.env.USE_LOCAL_DATA === "true" || !GITHUB_TOKEN) {
      if (localPath) {
        try {
          console.log(`Using local data from: ${localPath}`);
          const data = await fs.readFile(localPath, "utf8");
          return JSON.parse(data);
        } catch (localError) {
          console.error(`Error reading local file: ${localError.message}`);
          throw new Error(
            `Failed to read local data file: ${localError.message}`,
          );
        }
      }
    } else {
      // Try to read from local file first if a path was found
      if (localPath) {
        try {
          console.log(`Attempting to read data from local file: ${localPath}`);
          const data = await fs.readFile(localPath, "utf8");
          return JSON.parse(data);
        } catch (localError) {
          console.log(
            `Could not read from local file (${localError.message}), falling back to GitHub`,
          );
          // If local file doesn't exist or has invalid JSON, continue to GitHub fetch
        }
      }

      // Fallback to GitHub fetch
      console.log(`Fetching data from GitHub: ${url}`);
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.raw+json", // Required for GitHub API
        },
      });
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
      return response.json().catch(() => {
        throw new Error("Invalid JSON response");
      });
    }
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

// Get single course by courseCode
app.get("/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId || typeof courseId !== "string") {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const courses = await fetchData(COURSES_URL);
    const course = courses.find(
      (c) => c.courseCode.toLowerCase() === courseId.toLowerCase(),
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all courses with optional filtering
app.get("/courses", async (req, res) => {
  try {
    const courses = await fetchData(COURSES_URL);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get instructor details by name
app.get("/instructor/:instructorName", async (req, res) => {
  try {
    const { instructorName } = req.params;
    if (!instructorName || typeof instructorName !== "string") {
      return res.status(400).json({ error: "Invalid instructor name" });
    }

    const instructors = await fetchData(INSTRUCTORS_URL);
    const instructor = instructors.find(
      (i) =>
        i.name.toLowerCase().replace(/(\s|%20)/g, "-") ===
        instructorName.toLowerCase().replace(/(\s|%20)/g, "-"),
    );
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all related projects with optional filtering
app.get("/projects/cc/:courseCode", async (req, res) => {
  const { courseCode } = req.params;
  if (!courseCode || typeof courseCode !== "string") {
    return res.status(400).json({ error: "Invalid course code" });
  }
  try {
    const projects = await fetchData(PROJECTS_URL);
    const filteredProjects = projects.filter(
      (project) =>
        project.courseCode.toLowerCase() === courseCode.toLowerCase(),
    );
    res.status(200).json(filteredProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get project details by ID
app.get("/projects/id/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId || typeof projectId !== "string") {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const projects = await fetchData(PROJECTS_URL);
    const project = projects.find(
      (p) => p.id.toLowerCase() === projectId.toLowerCase(),
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get project details with ID and name
app.get("/projects/id/:projectId/n/:projectName", async (req, res) => {
  try {
    const { projectId, projectName } = req.params;
    if (
      !projectId ||
      !projectName ||
      typeof projectId !== "string" ||
      typeof projectName !== "string"
    ) {
      return res.status(400).json({ error: "Invalid project ID or name" });
    }

    const projects = await fetchData(PROJECTS_URL);
    const normalizedProjectName = projectName
      .toLowerCase()
      .replace(/(\s|%20)/g, "-");
    const project = projects.find(
      (p) =>
        p.id.toLowerCase() === projectId.toLowerCase() &&
        p.name.toLowerCase().replace(/(\s|%20)/g, "-") ===
          normalizedProjectName,
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID and name:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get student details by sNumber
app.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId || typeof studentId !== "string") {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const students = await fetchData(STUDENTS_URL);
    const student = students.find(
      (s) => s.sNumber.toLowerCase() === studentId.toLowerCase(),
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default app;
