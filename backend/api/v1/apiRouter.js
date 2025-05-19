import dotenv from "dotenv";
import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

dotenv.config();
const v1Router = express();

// Middleware
v1Router.use(cors()); // Enable CORS for all routes
v1Router.use(json());

// Local data file paths
const LOCAL_DATA_PATH = path.resolve(process.cwd(), "../data/v1");
const LOCAL_COURSES_PATH = path.join(LOCAL_DATA_PATH, "courses.json");
const LOCAL_INSTRUCTORS_PATH = path.join(LOCAL_DATA_PATH, "instructors.json");
const LOCAL_PROJECTS_PATH = path.join(LOCAL_DATA_PATH, "projects.json");
const LOCAL_STUDENTS_PATH = path.join(LOCAL_DATA_PATH, "students.json");

// Environment variables for data sources
const BASE_GITHUB_URL =
  process.env.BASE_GITHUB_URL_V1 ||
  "https://raw.githubusercontent.com/Sivothajan/projects.scs.pdn.ac.lk-monorepo/master/data/v1";
const COURSES_URL = `${BASE_GITHUB_URL}/courses.json`;
const INSTRUCTORS_URL = `${BASE_GITHUB_URL}/instructors.json`;
const PROJECTS_URL = `${BASE_GITHUB_URL}/projects.json`;
const STUDENTS_URL = `${BASE_GITHUB_URL}/students.json`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper function to fetch data (first from local file, then from GitHub as fallback)
const fetchData = async (url, relative) => {
  try {
    // Determine which local file to check based on the URL
    let localPath = null;
    if (relative === "courses.json") {
      localPath = LOCAL_COURSES_PATH;
    } else if (relative === "instructors.json") {
      localPath = LOCAL_INSTRUCTORS_PATH;
    } else if (relative === "projects.json") {
      localPath = LOCAL_PROJECTS_PATH;
    } else if (relative === "students.json") {
      localPath = LOCAL_STUDENTS_PATH;
    } else {
      throw new Error("Unknown data source URL");
    }

    // If USE_LOCAL_DATA flag is set or GitHub token isn't available, prioritize local files
    if (process.env.USE_LOCAL_DATA === "true" || !GITHUB_TOKEN) {
      if (localPath) {
        try {
          console.log(`Using local data from: ${localPath}`);
          const data = await fs.readFile(localPath, "utf8");
          return JSON.parse(data);
        } catch (localError) {
          console.error(
            `Error reading local file ${localPath}: ${localError.message}`,
          );
          throw new Error(
            `Failed to read local data file ${localPath}: ${localError.message}`,
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
            `Could not read from local file ${localPath} (${localError.message}), falling back to GitHub`,
          );
          // If local file doesn't exist or has invalid JSON, continue to GitHub fetch
        }
      }

      // Fallback to GitHub fetch
      if (!GITHUB_TOKEN) {
        throw new Error(
          "GitHub token is required for accessing private repository",
        );
      }

      console.log(`Fetching data from GitHub: ${url}`);
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch from URL: ${url}`);
        throw new Error(
          `Network error: ${response.status} - ${response.statusText}`,
        );
      }

      try {
        const data = await response.json();
        return data;
      } catch (jsonError) {
        throw new Error(
          `Invalid JSON response from ${url}: ${jsonError.message}`,
        );
      }
    }
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

// Get single course by courseCode
v1Router.get("/v1/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId || typeof courseId !== "string") {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const courses = await fetchData(COURSES_URL, "courses.json");
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
v1Router.get("/v1/courses", async (req, res) => {
  try {
    const courses = await fetchData(COURSES_URL, "courses.json");
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get instructor details by name
v1Router.get("/v1/instructor/:instructorUsername", async (req, res) => {
  try {
    const { instructorUsername } = req.params;
    if (!instructorUsername || typeof instructorUsername !== "string") {
      return res.status(400).json({ error: "Invalid instructor name" });
    }

    const instructors = await fetchData(INSTRUCTORS_URL, "instructors.json");
    const instructor = instructors.find(
      (i) => i.username.toLowerCase() === instructorUsername.toLowerCase(),
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
v1Router.get("/v1/projects/cc/:courseCode", async (req, res) => {
  const { courseCode } = req.params;
  if (!courseCode || typeof courseCode !== "string") {
    return res.status(400).json({ error: "Invalid course code" });
  }
  try {
    const projects = await fetchData(PROJECTS_URL, "projects.json");
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
v1Router.get("/v1/projects/id/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId || typeof projectId !== "string") {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const projects = await fetchData(PROJECTS_URL, "projects.json");
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
v1Router.get("/v1/projects/id/:projectId/n/:projectName", async (req, res) => {
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

    const projects = await fetchData(PROJECTS_URL, "projects.json");
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
v1Router.get("/v1/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId || typeof studentId !== "string") {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const students = await fetchData(STUDENTS_URL, "students.json");
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

// Catch-all for unmatched paths
v1Router.all("*", (req, res) => {
  res.status(404).json({
    error: "Route not found in v1 API",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 3000;
v1Router.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default v1Router;
