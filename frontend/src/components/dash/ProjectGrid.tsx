import React from "react";

const ProjectGrid: React.FC = () => {
  const projects = sampleProjects;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
          <div className="flex flex-col gap-2">
            <img
              src={project.image}
              alt={project.title}
              className="rounded-md mb-3 h-36 w-full object-cover"
            />
            <h3 className="text-md font-semibold text-purple-700 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {project.description}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-1 text-yellow-500 text-xs">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${i < project.rating ? "text-yellow-500" : "text-gray-300"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-600">({project.rating})</span>
            </div>

            {/* View Count, Comment Count and Actions */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12zm11 4a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  {project.views}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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

// Sample data
const sampleProjects = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x150",
    title: "Project 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    views: 512,
    likes: 80,
    comments: 12,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x150",
    title: "Project 2",
    description: "Curabitur facilisis est eu libero convallis, non sodales est dictum.",
    rating: 3,
    views: 340,
    likes: 55,
    comments: 8,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x150",
    title: "Project 3",
    description: "Aenean vulputate mauris ut justo sollicitudin, sed volutpat elit rutrum.",
    rating: 5,
    views: 780,
    likes: 120,
    comments: 15,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x150",
    title: "Project 4",
    description: "Suspendisse potenti. Cras ut metus non elit fringilla vehicula.",
    rating: 4,
    views: 456,
    likes: 67,
    comments: 10,
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x150",
    title: "Project 5",
    description: "Aliquam erat volutpat. Donec quis elit quis felis porttitor tincidunt.",
    rating: 3,
    views: 299,
    likes: 45,
    comments: 5,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x150",
    title: "Project 6",
    description: "Sed in arcu euismod, scelerisque libero vel, fermentum neque.",
    rating: 4,
    views: 512,
    likes: 60,
    comments: 9,
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300x150",
    title: "Project 7",
    description: "Maecenas dictum, arcu sed malesuada tincidunt, velit metus tincidunt libero.",
    rating: 5,
    views: 690,
    likes: 110,
    comments: 14,
  },
  {
    id: 8,
    image: "https://via.placeholder.com/300x150",
    title: "Project 8",
    description: "Nullam vehicula sapien vel nunc dictum, non accumsan libero accumsan.",
    rating: 3,
    views: 412,
    likes: 58,
    comments: 6,
  },
  {
    id: 9,
    image: "https://via.placeholder.com/300x150",
    title: "Project 9",
    description: "Vestibulum nec nunc in nulla elementum fringilla.",
    rating: 4,
    views: 368,
    likes: 52,
    comments: 7,
  },
  {
    id: 10,
    image: "https://via.placeholder.com/300x150",
    title: "Project 10",
    description: "Quisque vitae enim quis nunc fermentum ultricies.",
    rating: 5,
    views: 812,
    likes: 135,
    comments: 18,
  },
  {
    id: 11,
    image: "https://via.placeholder.com/300x150",
    title: "Project 11",
    description: "Ut congue odio at risus suscipit, at viverra justo pretium.",
    rating: 3,
    views: 245,
    likes: 40,
    comments: 4,
  },
  {
    id: 12,
    image: "https://via.placeholder.com/300x150",
    title: "Project 12",
    description: "Pellentesque at erat at nisl vehicula fermentum in a nunc.",
    rating: 4,
    views: 499,
    likes: 75,
    comments: 11,
  },
];

export default ProjectGrid;
export { sampleProjects };
