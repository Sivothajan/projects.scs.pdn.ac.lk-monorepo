const getProjectDetailsWithName = async (projectId, projectName) => {
  let convertedProjectName = projectName.replace(/ /g, "-");
  convertedProjectName = convertedProjectName
    .replace(/%20/g, "-")
    .toUpperCase();
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/id/${projectId}/n/${convertedProjectName}`,
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

export default getProjectDetailsWithName;
