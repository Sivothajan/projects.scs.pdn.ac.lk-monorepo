export const getRelatedProjects = async (courseCode) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/projects/cc/${courseCode}`;

  if (!import.meta.env.VITE_API_URL) {
    throw new Error("API_URL is not defined in environment variables");
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error!\nstatus: ${response.status},\nmessage: ${errorText}`,
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        "Received invalid data format from API - expected an array!\n",
      );
    }

    return data;
  } catch (error) {
    console.error("Detailed fetch error: ", error, "\n");
    throw error instanceof Error
      ? error
      : new Error(
          "An unexpected error occurred while fetching related projects!\n",
        );
  }
};

export default getRelatedProjects;
