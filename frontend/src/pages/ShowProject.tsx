import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import CommentSection from "../components/discussion/CommentSection";
import Navbar2 from "../components/Navbar2";

const ProjectDisplayPage: React.FC = () => {
  const projectData = {
    title: "My Awesome Project",
    tags: ["Art", "Wearables", "Technology"],
    level: "Intermediate",
    coverImage: "https://via.placeholder.com/800x450",
    description: `
      <p>This project is designed to showcase a fusion of <strong>art</strong> and <strong>technology</strong>.</p>
      <p>Features include:</p>
      <ul>
        <li>Responsive wearable design</li>
        <li>Interactive user interface</li>
        <li>AI-powered analytics</li>
      </ul>
      <p>Explore the future of wearable art with this project.</p>
    `,
  };

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loves, setLoves] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [activeReaction, setActiveReaction] = useState<string | null>(null); // Track the active reaction

  // Toggle Reactions
  const toggleReaction = (reaction: string) => {
    setActiveReaction((prev) => {
      if (prev === reaction) {
        // Remove reaction if already active
        if (reaction === "like") setLikes((prev) => prev - 1);
        if (reaction === "dislike") setDislikes((prev) => prev - 1);
        if (reaction === "love") setLoves((prev) => prev - 1);
        return null;
      } else {
        // Update reaction
        if (reaction === "like") {
          setLikes((prev) => prev + 1);
          if (prev === "dislike") setDislikes((prev) => prev - 1);
        }
        if (reaction === "dislike") {
          setDislikes((prev) => prev + 1);
          if (prev === "like") setLikes((prev) => prev - 1);
        }
        if (reaction === "love") setLoves((prev) => prev + 1);
        return reaction;
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navbar */}
      <Navbar2 level="+ Create Project" />

      {/* Header */}
      <header className="relative bg-gradient-to-br from-indigo-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md">{projectData.title}</h1>
          <p className="mt-4 text-lg opacity-90">Level: {projectData.level}</p>
          <div className="mt-6 flex justify-center gap-3">
            {projectData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white text-purple-700 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-purple-50 transition duration-300 flex items-center gap-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="absolute top-6 right-6 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2">
            <AiOutlineShareAlt className="text-lg" />
            Share
          </button>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative max-w-7xl mx-auto -mt-16">
        <div className="overflow-hidden rounded-lg shadow-lg relative">
          <img
            src={projectData.coverImage}
            alt="Project Cover"
            className="w-full h-[500px] object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <h2 className="absolute bottom-4 left-4 text-2xl text-white font-bold drop-shadow-md">
            {projectData.title}
          </h2>
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
        <section className="bg-white shadow-lg rounded-xl p-10">
          <div className="flex flex-col gap-8">
            {/* Reaction Buttons */}
            <div className="flex gap-6 justify-center">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow ${
                  activeReaction === "like"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-50"
                }`}
                onClick={() => toggleReaction("like")}
              >
                <FaThumbsUp className="text-xl" />
                {likes} Likes
              </button>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow ${
                  activeReaction === "dislike"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50"
                }`}
                onClick={() => toggleReaction("dislike")}
              >
                <FaThumbsDown className="text-xl" />
                {dislikes} Dislikes
              </button>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow ${
                  activeReaction === "love"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50"
                }`}
                onClick={() => toggleReaction("love")}
              >
                <FaHeart className="text-xl" />
                {loves} Loves
              </button>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center items-center gap-4">
              <div className="flex gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transform transition-transform ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400 scale-125"
                        : "text-gray-300 scale-100"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-lg font-medium text-gray-700">
                {rating > 0 ? `${rating}/5` : "Rate this project"}
              </p>
            </div>
          </div>
        </section>

        {/* Comment Section */}
        <section className="bg-white shadow-lg rounded-xl p-10">
          <CommentSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-800 text-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            © 2024 My Project Showcase. Built with ❤️ by [Your Name].
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDisplayPage;
