


const fetchProject = async (user_id: string): Promise<any> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/info/${user_id}`, {
      method: 'GET',
      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch project information');
    }

    const data = await response.json();
    return data.project; // Assuming the response contains a `project` object
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in fetchProject:', err.message);
    } else {
      console.error('Unknown error in fetchProject:', err);
    }
    throw err; // Re-throw the error for further handling
  }
};

export default fetchProject;
