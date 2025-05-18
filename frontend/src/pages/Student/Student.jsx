import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import studentStyle from "./Student.module.css";
import Error404 from "../Errors/Error404";
import getStudentDetails from "../../scripts/getStudentDetails";
import { checkImage } from "../../scripts/checkImage.jsx";

function Student() {
  const { sNumber } = useParams();
  const upperCaseSNumber = sNumber.toUpperCase();

  const [studentName, setStudentName] = useState("Unknown");
  const [department, setDepartment] = useState("Unknown");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const isValidS21513Format = /^S\d{5}$/.test(upperCaseSNumber);
  const isValidS21SP513Format = /^S\d{2}SP\d{3}$/.test(upperCaseSNumber);

  useEffect(() => {
    const validateAndSetDetails = () => {
      if (isValidS21SP513Format || isValidS21513Format) {
        setHasError(false);
      } else {
        setHasError(true);
      }
    };

    validateAndSetDetails();
  }, [upperCaseSNumber, isValidS21SP513Format, isValidS21513Format]);

  const sMail = sNumber.toLowerCase() + "@sci.pdn.ac.lk";

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await getStudentDetails(sNumber);
        if (data) {
          setStudentName(data.name);
          setDepartment(data.department);
          const baseUrl = "";
          // const baseUrl = `https://stud.pdn.ac.lk/images/20${data.year}/Science/${data.sNumber.toUpperCase()}`;
          const tempProfilePictureUrl =
            (await checkImage(`${baseUrl}.JPG`)) ||
            (await checkImage(`${baseUrl}.jpg`))
              ? `${baseUrl}.${(await checkImage(`${baseUrl}.JPG`)) ? "JPG" : "jpg"}`
              : "/images/placeholder.webp";
          setProfilePictureUrl(tempProfilePictureUrl);

          if (isValidS21SP513Format) {
            setRegistrationNumber(`S/${data.year}/SP/${data.sNumber.slice(5)}`);
          } else if (isValidS21513Format) {
            setRegistrationNumber(`S/${data.year}/${data.sNumber.slice(3)}`);
          } else {
            setHasError(true);
          }

          setHasError(false);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [sNumber, isValidS21SP513Format, isValidS21513Format]);

  if (loading) {
    return <div className={studentStyle.loading}>Loading...</div>;
  }

  if (hasError) {
    return <Error404 />;
  }

  return (
    <div className={studentStyle.fullPageContainer}>
      <div className={studentStyle.profileImageContainer}>
        <img
          src={profilePictureUrl}
          alt="Avatar"
          className={studentStyle.profileImage}
        />
      </div>
      <div className={studentStyle.studentDetails}>
        <h2 className={studentStyle.studentName}>{studentName}</h2>
        <h3 className={studentStyle.studentId}>
          Registration Number: {registrationNumber}
        </h3>
        <h3 className={studentStyle.department}>Department: {department}</h3>
        <h3 className={studentStyle.email}>
          E-mail: <a href={`mailto:${sMail}`}>{sMail}</a>
        </h3>
      </div>
    </div>
  );
}

export default Student;
