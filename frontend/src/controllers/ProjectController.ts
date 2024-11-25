// controllers/projectController.ts
export const fetchProjectData = async (id: string, token: string | null) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch project data");
      }
  
      const data = await response.json();
      return data.project; // Return the project data
    } catch (error) {
      console.error("Error fetching project data:", error);
      throw error; // Rethrow to handle it in the component
    }
  };
  