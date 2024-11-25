import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number; // Placeholder for initial rating
  views: number;
  likes: number;
  comments: number;
  tags?: string[];
  difficulty?: string;
}

interface ProjectGridProps {
  searchQuery: string;
  filters: {
    difficulty?: string;
    tags?: string[];
    rating?: number;
    duration?: string;
  };
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ searchQuery, filters }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [averageRatings, setAverageRatings] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
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
        setProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch average ratings for each project
  useEffect(() => {
    const fetchAverageRatings = async () => {
      const ratings: { [key: number]: number } = {};

      await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await fetch(`http://localhost:5000/api/ratings/average/${project.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              ratings[project.id] = data.average_rating || 0; // Use 0 as fallback
            }
          } catch (err) {
            console.error(`Failed to fetch rating for project ID: ${project.id}`);
          }
        })
      );
      setAverageRatings(ratings);
    };

    if (projects.length > 0) {
      fetchAverageRatings();
    }
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !filters.difficulty || project.difficulty === filters.difficulty;
    const matchesTags = !filters.tags || filters.tags.every((tag) => project.tags?.includes(tag) || false);
    const matchesRating = !filters.rating || averageRatings[project.id] >= filters.rating;
    const matchesDuration = true;

    return matchesSearch && matchesDifficulty && matchesTags && matchesRating && matchesDuration;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/displayproject/${projectId}`);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
          onClick={() => handleProjectClick(project.id)}
        >
          <div className="flex flex-col gap-2">
            <img
              src={`http://localhost:5000/uploads/${project.image}`}
              alt={project.title}
              className="rounded-md mb-3 h-36 w-full object-cover"
            />

            <h3 className="text-md font-semibold text-purple-700 mb-1">
              {project.title}
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-1 text-yellow-500 text-xs">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${i < (averageRatings[project.id] || 0) ? "text-yellow-500" : "text-gray-300"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-600">
                ({averageRatings[project.id] !== undefined ? averageRatings[project.id] : "Loading..."})
              </span>
            </div>

            {/* Comment Count and Actions */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {project.likes}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-4 9H8v-2h8v2zm4-4H8V5h12v2z" />
                  </svg>
                  {project.comments}
                </span>
              </div>
              <button className="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-purple-700 transition duration-150 ease-in-out">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
