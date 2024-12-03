
export const fetchAverageRatings = async (project_id:Number) => {
    try {
        const response = await fetch(`http://localhost:5000/api/ratings/average/${project_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        if (!response.ok) {
          console.error(`Failed to fetch rating for project ID: ${project_id}`);
          return 0; // Fallback if response is not ok
        }
    
        const data = await response.json();
        return data.average_rating || 0; // Use 0 if no average rating is available
      } catch (err) {
        console.error(`Error fetching rating for project ID: ${project_id}`, err);
        return 0; // Fallback to 0 in case of error
      }
  };


  export const fetchRating = async (project_id: number): Promise<number> => {
    try {
      const response = await fetch(`http://localhost:5000/api/ratings/${project_id}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.rating || 0; // Return the rating or 0 if undefined
      } else {
        console.error("Failed to fetch rating:", await response.json());
        return 0; // Return 0 if the response is not ok
      }
    } catch (error) {
      console.error("Error fetching rating:", error);
      return 0; // Return 0 in case of an error
    }
  };
  