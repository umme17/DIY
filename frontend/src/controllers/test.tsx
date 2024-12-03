// import { fetchAllProjects } from "./ProjectController";
// import { fetchAverageRatings } from "./RatingControllers";
// import { useState, useEffect } from "react";

// interface Project {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
//   rating: number; // Placeholder for initial rating
//   views: number;
//   likes: number;
//   comments: number;
//   tags?: string[];
//   difficulty?: string;
// }


//   export  const fetchAll = async () => {
//       try {
//         setLoading(true);
//         const projectData = await fetchAllProjects(); // Fetch project data
//         const projectsWithRatings = await Promise.all(
//           projectData.map(async (project: Project) => {
//             const averageRating = await fetchAverageRatings(project.id); // Fetch rating for each project
//             return {
//               ...project,
//               rating: averageRating, // Add the rating to the project
//             };
//           })
//         );
//         setProjects(projectsWithRatings); // Set the project data with ratings
//       } catch (err) {
//         setError("Failed to load project data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
    
