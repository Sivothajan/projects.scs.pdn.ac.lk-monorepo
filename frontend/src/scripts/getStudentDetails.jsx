const getStudentDetails = async (studentId) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/student/${studentId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student details:", error);
    return null;
  }
};

export default getStudentDetails;
