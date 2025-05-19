const getInstructorCourses = async (instructorUsername) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/courses/instructor/${instructorUsername}`;
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

export default getInstructorCourses;
