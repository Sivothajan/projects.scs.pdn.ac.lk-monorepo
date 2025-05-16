const getProjectDetails = async (projectId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/id/${projectId}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const projectDetails = await response.json();
    return projectDetails;
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
};

export default getProjectDetails;
