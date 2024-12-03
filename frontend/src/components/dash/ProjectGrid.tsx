import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AllProjectContext } from "../../contexts/ProjectContext";

// interface Project {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
//   rating: number; // Assuming rating is already part of the project object
//   views: number;
//   likes: number;
//   comments: number;
//   tags?: string[]; // Tags are optional
//   difficulty?: string;
// }

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
  const navigate = useNavigate();

  // Get the context values with type check
  const context = useContext(AllProjectContext);

  // If the context is not yet available (null or loading), handle gracefully
  if (!context) {
    return <p>Context is not available.</p>;
  }

  const { projects} = context;

  // If projects are null or undefined, return early
  if (!projects) {
    return <p>No projects found.</p>;
  }

  const handleProjectClick = (project_id: number) => {
    navigate(`/displayproject/${project_id}`);
  };

  // Filter projects based on the search query and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !filters.difficulty || project.difficulty === filters.difficulty;
    const matchesTags = !filters.tags || filters.tags.every((tag) => project.tags?.includes(tag) || false);
    const matchesRating = !filters.rating || project.rating >= filters.rating; // Use the rating from the project
    const matchesDuration = true; // You can implement a duration filter if needed

    return matchesSearch && matchesDifficulty && matchesTags && matchesRating && matchesDuration;
  });


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
                  className={`h-4 w-4 ${i < (project.rating || 0) ? "text-yellow-500" : "text-gray-300"}`} // Ensure rating is a valid number
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-600">{project.rating}</span>
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
