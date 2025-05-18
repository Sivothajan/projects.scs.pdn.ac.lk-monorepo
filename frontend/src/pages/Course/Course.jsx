import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import courseStyles from "./Course.module.css";
import Error404 from "../Errors/Error404";
import { getRelatedProjects } from "../../scripts/getRelatedProjects";
import { getCourse } from "../../scripts/getCourse";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const navigate = useNavigate();

  const fetchRelatedProjects = useCallback(async (courseId) => {
    try {
      const data = await getRelatedProjects(courseId);
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }
      setRelatedProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    }
  }, []);

  useEffect(() => {
    fetchRelatedProjects(courseId);
  }, [fetchRelatedProjects, courseId]);

  const handleRleatedProjectsClick = useCallback(
    (projectId) => {
      navigate(`/project/id/${projectId}`);
    },
    [navigate],
  );

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const courseData = await getCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching courses: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className={courseStyles.loading}>Loading...</div>;
  }

  if (error) {
    return <Error404 />;
  }

  return (
    <div className={courseStyles.courseContainer}>
      <div className={courseStyles.courseDetails}>
        <div className={courseStyles.title}>
          <strong>Course Name: </strong>
          {course.title}
        </div>
        <div className={courseStyles.courseCode}>
          <strong>Course Code:</strong> {course.courseCode}
        </div>
        <div className={courseStyles.description}>
          <strong>Description:</strong> {course.description}
        </div>
      </div>
      <section className={courseStyles.relatedProjectsSection}>
        <h2 className={courseStyles.relatedProjectsTitle}>Related Projects</h2>

        {loading && (
          <div className={courseStyles.loadingContainer}>
            <div className={courseStyles.spinner}></div>
            <span>Loading related projects...</span>
          </div>
        )}

        {error && <div className={courseStyles.error}>{error}</div>}

        {!loading && !error && relatedProjects.length > 0 && (
          <div className={courseStyles.projectGrid}>
            {relatedProjects.map((project) => (
              <article
                key={project.id}
                className={courseStyles.projectContainer}
                onClick={() => handleRleatedProjectsClick(project.id)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleRleatedProjectsClick(project.id)
                }
              >
                <div
                  className={courseStyles.projectCoverImage}
                  style={{
                    backgroundImage: `url(${project.coverImageUrl || "https://placehold.co/300X300"})`,
                  }}
                  aria-label={`${project.title} preview`}
                />
                <h3 className={courseStyles.projectTitle}>
                  {project.name}{" "}
                  <div className={courseStyles.tinyId}>({project.id})</div>
                </h3>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && relatedProjects.length === 0 && (
          <div className={courseStyles.noRelatedProjects}>
            No related projects available at the moment
          </div>
        )}
      </section>
    </div>
  );
}

export default Course;
