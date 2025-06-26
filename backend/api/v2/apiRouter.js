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

const linkHeaderValue =
  '/favicon.ico; rel="icon", ' +
  '/favicon/apple-touch-icon.webp; rel="apple-touch-icon" sizes="180x180", ' +
  '/favicon/favicon-32x32.webp; rel="icon" type="image/webp" sizes="32x32", ' +
  '/favicon/favicon-16x16.webp; rel="icon" type="image/webp" sizes="16x16", ' +
  '/favicon/site.webmanifest; rel="manifest"';

v2Router.use((_req, res, next) => {
  res.setHeader("Link", linkHeaderValue);
  next();
});

// Local data file paths
const LOCAL_DATA_PATH = path.resolve(process.cwd(), "../data/v2");
const LOCAL_COURSE_PATH = path.join(LOCAL_DATA_PATH, "/course");
const LOCAL_INSTRUCTOR_PATH = path.join(LOCAL_DATA_PATH, "/instructor");
const LOCAL_PROJECT_PATH = path.join(LOCAL_DATA_PATH, "/project");
const LOCAL_STUDENT_PATH = path.join(LOCAL_DATA_PATH, "/student");
const LOCAL_COMMON_PATH = path.join(LOCAL_DATA_PATH, "/common");

// Environment variables for data sources
const BASE_GITHUB_URL =
  process.env.BASE_GITHUB_URL_V2 ||
  "https://raw.githubusercontent.com/Sivothajan/projects.scs.pdn.ac.lk-monorepo/master/data/v2";
const COURSE_URL = `${BASE_GITHUB_URL}/course`;
const INSTRUCTOR_URL = `${BASE_GITHUB_URL}/instructor`;
const PROJECT_URL = `${BASE_GITHUB_URL}/project`;
const STUDENT_URL = `${BASE_GITHUB_URL}/student`;
const COMMON_URL = `${BASE_GITHUB_URL}/common`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper function to fetch data (first from local file, then from GitHub as fallback)
const fetchData = async (reqPath, filePath, jsonName, githubUrl) => {
  try {
    // Determine which local file to check based on the URL
    let localPath = null;
    // Map reqPath to the correct local file path
    if (reqPath.startsWith("/v2/course/")) {
      // Single course by courseCode
      localPath = LOCAL_COURSE_PATH + `/${filePath.toLowerCase()}`;
    } else if (reqPath.startsWith("/v2/courses")) {
      // All courses
      localPath = LOCAL_COMMON_PATH;
    } else if (reqPath.startsWith("/v2/instructor/")) {
      // Instructor by ID
      localPath = LOCAL_INSTRUCTOR_PATH;
    } else if (reqPath.startsWith("/v2/projects/cc/")) {
      // Related projects by course code
      localPath = LOCAL_COMMON_PATH + `/${filePath.toLowerCase()}`;
    } else if (reqPath.startsWith("/v2/projects/id/")) {
      // Project by ID
      localPath = LOCAL_PROJECT_PATH + `/${filePath.toLowerCase()}`;
    } else if (reqPath.startsWith("/v2/student/")) {
      // Student by ID
      localPath = LOCAL_STUDENT_PATH + `/${filePath.toLowerCase()}`;
    } else if (reqPath.startsWith("/v2/projects")) {
      // All projects (if needed)
      localPath = LOCAL_COMMON_PATH;
    } else if (reqPath.startsWith("/v2/relatedProjects/")) {
      localPath = LOCAL_COMMON_PATH + "/relatedProjects";
    } else {
      throw new Error("Unknown data source URL");
    }

    // If USE_LOCAL_DATA flag is set or GitHub token isn't available, prioritize local files
    if (process.env.USE_LOCAL_DATA === "true" || !GITHUB_TOKEN) {
      if (localPath) {
        try {
          console.log(`Using local data from: ${localPath}`);
          const fileName = path.join(
            localPath,
            `${jsonName.toLowerCase() || "template"}.json`,
          );
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
          const fileName = path.join(
            localPath,
            `${jsonName || "template"}.json`,
          );
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
      if (!GITHUB_TOKEN) {
        throw new Error(
          "GitHub token is required for accessing private repository",
        );
      }

      console.log(`Fetching data from GitHub: ${githubUrl}`);
      // Construct the final URL to exactly match local path structure
      const finalUrl = filePath
        ? `${githubUrl}${filePath.startsWith("/") ? "" : "/"}${filePath}${jsonName ? `/${jsonName.toLowerCase()}.json` : "/template.json"}`
        : `${githubUrl}/${jsonName.toLowerCase() || "template"}.json`;

      console.log(`Final URL: ${finalUrl}`);
      const response = await fetch(finalUrl, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch from URL: ${finalUrl}`);
        throw new Error(
          `Network error: ${response.status} - ${response.statusText}`,
        );
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

// Get single course by courseCode
v2Router.get("/v2/courses/:courseCode", async (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  try {
    const { courseCode } = req.params;
    if (!courseCode || typeof courseCode !== "string") {
      return res.status(400).json({ error: "Invalid course Code" });
    }

    // Valid courseCode format (e.g., "CSC1013")
    const coursePrefix = courseCode.slice(0, 3).toLowerCase();
    const course = await fetchData(
      "/v2/course/",
      coursePrefix,
      courseCode,
      COURSE_URL,
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course[0]);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
v2Router.get("/v2/courses", async (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  try {
    const courses = await fetchData("/v2/courses", null, "courses", COMMON_URL);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get instructor details by username
v2Router.get("/v2/instructor/:instructorUsername", async (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  try {
    const { instructorUsername } = req.params;
    if (!instructorUsername || typeof instructorUsername !== "string") {
      return res.status(400).json({ error: "Invalid instructor username" });
    }

    const instructor = await fetchData(
      "/v2/instructor/",
      null,
      instructorUsername,
      INSTRUCTOR_URL,
    );
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(200).json(instructor[0]);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all related projects by course code
v2Router.get("/v2/projects/cc/:courseCode", async (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  const { courseCode } = req.params;
  if (!courseCode || typeof courseCode !== "string") {
    return res.status(400).json({ error: "Invalid course code" });
  }
  try {
    const coursePrefix = courseCode.slice(0, 3).toLowerCase();
    let courseCategory = courseCode.slice(3, 4).toLocaleLowerCase();
    // Normalize courseCategory: if it's a single digit (0-9), pad with '000'
    if (/^[0-9]$/.test(courseCategory)) {
      courseCategory += "000";
    }
    const coursePath = `relatedProjects/${coursePrefix}/${courseCategory}`;
    const projects = await fetchData(
      "/v2/projects/cc/",
      coursePath,
      courseCode,
      COMMON_URL,
    );
    if (!projects || projects.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    console.error(`Error details: ${error.message}`);
    res.status(200).json([]);
  }
});

// Get project details by ID
v2Router.get("/v2/projects/id/:projectId", async (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  try {
    const { projectId } = req.params;
    if (!projectId || typeof projectId !== "string") {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    const coursePrefix = projectId.slice(0, 3).toLowerCase();
    const projectYear = projectId.slice(8, 12);
    let courseCategory = projectId.slice(3, 4).toLowerCase();
    courseCategory += "000";
    const projectUrl = `${coursePrefix}/${projectYear}/${courseCategory}`;
    const project = await fetchData(
      "/v2/projects/id/",
      projectUrl,
      projectId,
      PROJECT_URL,
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get student details by sNumber
v2Router.get("/v2/student/:studentId", async (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  try {
    const { studentId } = req.params;
    if (!studentId || typeof studentId !== "string") {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const studentBatch = studentId.slice(0, 3).toLowerCase();
    const studentUrl = `${STUDENT_URL}/${studentBatch}`;
    console.log(`Fetching student data from: ${studentUrl}`);
    const student = await fetchData(
      "/v2/student/",
      studentBatch,
      studentId,
      STUDENT_URL,
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student[0]);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: error.message });
  }
});

// Catch-all for unmatched paths
v2Router.all(/.*/, (req, res) => {
  res.setHeader("Link", linkHeaderValue);
  res.status(404).json({
    error: "Route not found in v2 API",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 3000;
v2Router.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default v2Router;
