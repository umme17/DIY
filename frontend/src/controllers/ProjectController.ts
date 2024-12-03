interface AddProjectData {
  projectTitle: string;
  level:string;
  tags: string[];
  skillLevel: string;
  description: string;
  coverImage: File | null;
  user_id: string; // Explicitly add user_id here
}

export const addProject = async (formData: AddProjectData) => {
  const apiUrl = "http://localhost:5000/api/projects"; // API endpoint to add a project

  const token = localStorage.getItem("token"); // Retrieve token

  try {
    // Prepare FormData for the new project
    const multipartData = new FormData();
    multipartData.append("title", formData.projectTitle);
    multipartData.append("tags", JSON.stringify(formData.tags)); // Convert array to JSON string
    multipartData.append("level", formData.skillLevel);
    multipartData.append("description", formData.description);
    multipartData.append("user_id", formData.user_id); // Add user_id to the form data

    // Append cover image if it exists
    if (formData.coverImage) {
      multipartData.append("cover_image", formData.coverImage);
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      body: multipartData,
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Include the token for authentication
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add project");
    }
    const data = await response.json();
    console.log("Project Added Successfully");
    return data.project; // Return the added project data
  } catch (error) {
    console.error("Error adding project:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

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
  

 export const fetchAllProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error("Error fetching all project data:", error);
      throw error; // Rethrow to handle it in the component
    } 
  };

  

  export const deleteProject = async (projectId: string): Promise<void> => {
    const apiUrl = `http://localhost:5000/api/projects/${projectId}`; // API endpoint to delete the project
  
    const token = localStorage.getItem("token"); // Retrieve token
  
    if (!token) {
      throw new Error("User not authenticated");
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token for authentication
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete project");
      }
  
      const data = await response.json();
      console.log(data.message); // Log success message (optional)
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  