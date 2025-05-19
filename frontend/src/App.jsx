import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import Error404 from "./pages/Errors/Error404";
import About from "./pages/About/About";
import Documentation from "./pages/Documentation/Documentation";
import Student from "./pages/Student/Student";
import Instructor from "./pages/Instructor/Instructor";
import Course from "./pages/Course/Course";
import Project from "./pages/Project/Project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error404 />} />

        <Route caseSensitive={false} path="/about" element={<About />} />
        <Route
          caseSensitive={false}
          path="/documentation"
          element={<Documentation />}
        />

        <Route
          caseSensitive={false}
          path="/student/:sNumber"
          element={<Student />}
        />
        <Route
          caseSensitive={false}
          path="/instructor/:instructorUsername"
          element={<Instructor />}
        />
        <Route
          caseSensitive={false}
          path="/course/:courseId"
          element={<Course />}
        />
        <Route
          caseSensitive={false}
          path="/project/id/:projectId/n/:projectName"
          element={<Project />}
        />
        <Route
          caseSensitive={false}
          path="/project/id/:projectId"
          element={<Project />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
