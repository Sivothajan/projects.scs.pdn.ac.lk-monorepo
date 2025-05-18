import dotenv from "dotenv";
import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

dotenv.config();
const v2Router = express();

// Middleware
v2Router.use(cors()); // Enable CORS for all routes
v2Router.use(json());

// Local data file paths
const LOCAL_DATA_PATH = path.resolve(process.cwd(), "../data");
const LOCAL_COURSES_PATH = path.join(LOCAL_DATA_PATH, "/course");
const LOCAL_INSTRUCTORS_PATH = path.join(LOCAL_DATA_PATH, "/instructor");
const LOCAL_PROJECTS_PATH = path.join(LOCAL_DATA_PATH, "/project");
const LOCAL_STUDENTS_PATH = path.join(LOCAL_DATA_PATH, "/student");
const LOCAL_COMMON_PATH = path.join(LOCAL_DATA_PATH, "/common");

// Environment variables for data sources (abstracted)
const COURSE_URL = process.env.GITHUB_COURSE_URL;
const INSTRUCTOR_URL = process.env.GITHUB_INSTRUCTOR_URL;
const PROJECT_URL = process.env.GITHUB_PROJECT_URL;
const STUDENT_URL = process.env.GITHUB_STUDENT_URL;
const COMMON_URL = process.env.GITHUB_COMMON_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper function to fetch data (first from local file, then from GitHub as fallback)
const fetchData = async (url, jsonName) => {
  try {
    // Determine which local file to check based on the URL
    let localPath = null;
    if (url === COURSE_URL) {
      localPath = LOCAL_COURSES_PATH;
    } else if (url === INSTRUCTOR_URL) {
      localPath = LOCAL_INSTRUCTORS_PATH;
    } else if (url === PROJECT_URL) {
      localPath = LOCAL_PROJECTS_PATH;
    } else if (url === STUDENT_URL) {
      localPath = LOCAL_STUDENTS_PATH;
    } else if (url === COMMON_URL) {
      localPath = LOCAL_COMMON_PATH;
    }

    // If USE_LOCAL_DATA flag is set or GitHub token isn't available, prioritize local files
    if (process.env.USE_LOCAL_DATA === "true" || !GITHUB_TOKEN) {
      if (localPath) {
        try {
          console.log(`Using local data from: ${localPath}`);
          const fileName = path.join(localPath, `${jsonName || "template"}.json`);
          const data = await fs.readFile(fileName, "utf8");
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
          const fileName = path.join(localPath, `${jsonName || "template"}.json`);
          const data = await fs.readFile(fileName, "utf8");
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
      const githubUrl = url + `${jsonName.toLowerCase() || "template"}.json`;
      const response = await fetch(githubUrl, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "v2Routerlication/vnd.github.raw+json", // Required for GitHub API
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
v2Router.get("/v2/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId || typeof courseId !== "string") {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await fetchData(COURSE_URL, courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
v2Router.get("/v2/courses", async (req, res) => {
  try {
    const courses = await fetchData(COMMON_URL, "courses");
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get instructor details by username
v2Router.get("/v2/instructor/:instructorId", async (req, res) => {
  try {
    const { instructorId } = req.params;
    if (!instructorId || typeof instructorId !== "string") {
      return res.status(400).json({ error: "Invalid instructor username" });
    }

    const instructor = await fetchData(INSTRUCTOR_URL, instructorId);
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all related projects by course code
v2Router.get("/v2/projects/cc/:courseCode", async (req, res) => {
  const { courseCode } = req.params;
  if (!courseCode || typeof courseCode !== "string") {
    return res.status(400).json({ error: "Invalid course code" });
  }
  try {
    const githubUrl = COMMON_URL + "/relatedProjects";
    const projects = await fetchData(githubUrl, courseCode);
    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: "No projects found for this course" });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get project details by ID
v2Router.get("/v2/projects/id/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId || typeof projectId !== "string") {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await fetchData(PROJECT_URL, projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get student details by sNumber
v2Router.get("/v2/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId || typeof studentId !== "string") {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const student = await fetchData(STUDENT_URL, studentId);
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
v2Router.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default v2Router;
