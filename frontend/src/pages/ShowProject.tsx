import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { fetchProjectData } from "../controllers/ProjectController";
import { useProjectContext } from "../contexts/ProjectContext";
import Reaction from "../components/discussion/Reactions";
import Ratings from "../components/discussion/Ratings";
import CommentSection from "../components/discussion/CommentSection";
import { AiOutlineShareAlt } from "react-icons/ai";
import Navbar2 from "../components/Navbar2";

interface Project {
  id: string;
  title: string;
  tags: string[];
  level: string;
  cover_image: string;
  description: string;
}

const ProjectDisplayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cachedProjects, setCachedProject } = useProjectContext();

  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (id && cachedProjects[id]) {
        // Use cached data
        setProjectData(cachedProjects[id]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const project = await fetchProjectData(id || "", token);
        setProjectData(project);
        setCachedProject(id || "", project); // Cache the data
      } catch (err) {
        setError("Failed to load project data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id, cachedProjects, setCachedProject]);

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error || !projectData) {
    return <p className="text-red-500">{error || "Project not found."}</p>;
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
          <p className="mt-4 text-lg text-gray-300 mb-9">Level: {projectData.level}</p>
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
            src={`http://localhost:5000/uploads/${projectData.cover_image}`}
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































