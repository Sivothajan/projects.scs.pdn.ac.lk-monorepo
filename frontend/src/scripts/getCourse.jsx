export const getCourse = async (courseId) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/courses/${courseId}`;

  if (!import.meta.env.VITE_API_URL) {
    throw new Error("VITE_API_URL is not defined in environment variables");
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error!\nstatus: ${response.status},\nmessage: ${errorText}\n`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Detailed fetch error: ", error, "\n");
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching courses!\n");
  }
};

export default getCourse;
