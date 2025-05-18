import styles from "./Home.module.css";
import { getCourses } from "../../scripts/getCourses";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourses();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCourseClick = useCallback(
    (courseId) => {
      navigate(`/course/${courseId}`);
    },
    [navigate],
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
        <div className={styles.description}>
          Welcome to the Statistics & Computer Science Student Projects at the
          University of Peradeniya.
          <br />
          Browse documentation, code, and media from academic and
          extracurricular projects done by the Students.
          <br />
          <br />
          To contribute, please visit:{" "}
          <a href="https://github.com/sivothajan/projects.scs.pdn.ac.lk-monorepo">
            GitHub
          </a>
        </div>
      </div>
      <section className={styles.coursesSection}>
        <h2 className={styles.courseSpecificProjects}>
          Course-Specific Projects
        </h2>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <span>Loading courses...</span>
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && courses.length > 0 && (
          <div className={styles.courseGrid}>
            {courses.map((course) => (
              <article
                key={course.courseCode}
                className={styles.courseContainer}
                onClick={() => handleCourseClick(course.courseCode)}
                role="link"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleCourseClick(course.courseCode)
                }
              >
                <div
                  className={styles.courseImage}
                  style={{
                    backgroundImage: `url(${course.courseImageUrl || "https://placehold.co/300X300"})`,
                  }}
                  aria-label={`${course.title} preview`}
                />
                <h3 className={styles.courseTitle}>{course.title}</h3>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className={styles.noCourses}>
            No courses available at the moment
          </div>
        )}
      </section>
    </div>
  );
}
export default Home;
