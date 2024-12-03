import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { AiOutlineShareAlt } from "react-icons/ai";
import CommentSection from "../components/discussion/CommentSection";
import Navbar2 from "../components/Navbar2";
import Reaction from "../components/discussion/Reactions";
import Ratings from "../components/discussion/Ratings";
import { AllProjectContext } from "../contexts/ProjectContext";

interface Project {
  id: number;
  image: string;
  level:string;
  title: string;
  description: string;
  rating: number; // Assuming rating is already part of the project object
  views: number;
  likes: number;
  comments: number;
  tags?: string[]; // Tags are optional
  difficulty?: string;
}

const ProjectDisplayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get project ID from URL
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);

  // Get the context values with type check
  const context = useContext(AllProjectContext);

  // If the context is not yet available (null or loading), handle gracefully
  if (!context) {
    return <p>Context is not available.</p>;
  }

  const { projects} = context;

  useEffect(() => {
    // Fetch project data from context using project id
    const fetchProject = () => {
      if (!projects || !id) {
        setError("No project data available.");
        setLoading(false);
        return;
      }

      // Find project by id from the context
      const foundProject = projects.find(project => project.id === parseInt(id));

      if (foundProject) {
        setProjectData(foundProject);
        setLoading(false);
      } else {
        setError("Project not found.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, projects]); // Triggered when `id` or `projects` change

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  // Render error message if project is not found
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // If project data doesn't exist, show an error message
  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-600 min-h-screen font-sans">
      <Navbar2 level="+ Create Project" />

      {/* Header */}
      <header className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md text-white">
            {projectData.title}
          </h1>
          <p className="mt-4 text-lg text-gray-300 mb-9 uppercase">{projectData.level}</p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {(Array.isArray(projectData.tags) ? projectData.tags : []).map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-600 transition duration-300 flex items-center gap-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="absolute top-6 right-6 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2">
            <AiOutlineShareAlt className="text-lg" />
            Share
          </button>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative max-w-7xl mx-auto -mt-16">
        <div className="overflow-hidden rounded-lg shadow-lg relative">
          <img
            src={`http://localhost:5000/uploads/${projectData.image}`}
            alt="Project Cover"
            className="w-full h-[500px] object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>
      </div>

      {/* Project Details */}
      <main className="max-w-7xl mx-auto mt-12 px-6 space-y-12">
        {/* Description Section */}
        <section className="bg-white shadow-lg rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">Project Description</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: projectData.description }}
          ></div>
        </section>

        {/* Interaction Section */}
        <Reaction
          targetId={Number(id) || 0}
          targetType="project"
          currentReaction={reaction}
          onReactionChange={setReaction}
        />

        <Ratings
          targetId={Number(id) || 0}
          onRatingChange={(rating) => console.log("New rating:", rating)}
        />

        {/* Comment Section */}
        <section className="bg-white shadow-lg rounded-xl p-10">
          <CommentSection target_id={Number(id) || 0} target_type={"project"} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-800 text-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2024 My Project Showcase. Built with ❤️ by [Your Name].</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDisplayPage;
