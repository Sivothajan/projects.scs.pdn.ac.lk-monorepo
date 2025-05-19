import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instructorStyle from "./Instructor.module.css";
import Error404 from "../Errors/Error404";
import getInstructorDetails from "../../scripts/getInstructorDetails.jsx";

function Instructor() {
  const { instructorUsername } = useParams();
  const [instructorName, setInstructorName] = useState("");
  const [department, setDepartment] = useState("Unknown");
  const [sMail, setSMail] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAndSetDetails = () => {
      if (!instructorUsername || instructorUsername.trim() === "") {
        setHasError(true);
      } else {
        const sanitizedInstructorName = instructorUsername.replace(
          /(\s|%20)/g,
          "-",
        );
        setHasError(false);
        setInstructorName(sanitizedInstructorName);
      }
    };

    validateAndSetDetails();
  }, [instructorUsername]);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const sanitizedInstructorName = instructorUsername.replace(
          /(\s|%20)/g,
          "-",
        );
        const data = await getInstructorDetails(sanitizedInstructorName);
        if (data) {
          setInstructorName(data.name || "");
          setDepartment(data.department || "");
          // data.profilePictureUrl
          setProfilePictureUrl(
            /*
            !data.profilePictureUrl || data.profilePictureUrl === 'undefined'
              ? '/images/placeholder.webp'
              : data.profilePictureUrl
            */
            "/images/placeholder.webp",
          );
          setSMail(data.email || "");
          setHasError(false);
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error("Error fetching instructor details:", err);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [instructorUsername]);

  if (loading) {
    return <div className={instructorStyle.loading}>Loading...</div>;
  }

  if (hasError) {
    return <Error404 />;
  }

  return (
    <div className={instructorStyle.fullPageContainer}>
      <div className={instructorStyle.profileImageContainer}>
        <img
          src={profilePictureUrl}
          alt="Avatar"
          className={instructorStyle.profileImage}
        />
      </div>
      <div className={instructorStyle.instructorDetails}>
        <h2 className={instructorStyle.instructorName}>{instructorName}</h2>
        <h3 className={instructorStyle.department}>Department: {department}</h3>
        <h3 className={instructorStyle.email}>
          E-mail: <a href={`mailto:${sMail}`}>{sMail}</a>
        </h3>
      </div>
    </div>
  );
}

export default Instructor;
