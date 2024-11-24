import React, { useState } from "react";
import { FaStar, FaUser, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ThreadListProps {
  searchTerm: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ searchTerm }) => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // Filter threads based on the search term and active tab
  const filteredThreads = threads.filter((thread) => {
    const matchesSearch =
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    if (activeTab === "Unanswered") return thread.replies === 0 && matchesSearch;
    if (activeTab === "Latest") return matchesSearch; // Add logic for "Latest" if needed
    if (activeTab === "Popular") return thread.replies >= 10 && matchesSearch;

    return matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Navigation Tabs */}
      <div className="sticky top-0 bg-white p-4 z-50 shadow-md">
        <div className="flex gap-8 justify-center text-sm sm:text-base font-medium text-gray-600">
          {[
            { label: "All", info: "" },
            { label: "Unanswered", info: "12" },
            { label: "Latest", info: "" },
            { label: "Popular", info: "" },
          ].map((tab) => (
            <div
              key={tab.label}
              className="relative flex flex-col items-center cursor-pointer group"
              onClick={() => setActiveTab(tab.label)}
            >
              <span
                className={`pb-2 transition-colors duration-300 ${
                  activeTab === tab.label
                    ? "font-semibold text-purple-600"
                    : "group-hover:text-gray-800"
                }`}
              >
                {tab.label}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full transform transition-transform duration-300 ${
                  activeTab === tab.label
                    ? "bg-purple-600 scale-x-100"
                    : "bg-purple-300 scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </div>
          ))}
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
          {filteredThreads.map((thread, index) => (
            <li
              key={index}
              onClick={() => navigate(`/thread/${index}`)}
              className="flex flex-col sm:flex-row justify-between p-5 bg-white rounded-lg shadow hover:shadow-md transition duration-300 border border-gray-200"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800 hover:text-purple-600 transition duration-300 cursor-pointer">
                  {thread.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-2 gap-3">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>{thread.author}</span>
                  </div>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                    {thread.category}
                  </span>
                  <span className="text-gray-400">{thread.time}</span>
                </div>
              </div>

              <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaComment className="mr-2 text-blue-400" />
                  <span>{thread.replies} Replies</span>
                </div>
                <button
                  className="text-sm text-gray-500 hover:text-yellow-500 transition"
                  aria-label="Star thread"
                >
                  <FaStar className="text-yellow-400" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThreadList;

export const threads = [
    {
      title: "How to Improve Game Graphics on a Budget",
      author: "Daniel Pierce",
      category: "Game Development",
      replies: 12,
      time: "5 minutes ago",
    },
    {
      title: "Top 10 Indie Games to Try This Year",
      author: "Samantha Clark",
      category: "Gaming News",
      replies: 8,
      time: "10 minutes ago",
    },
    {
      title: "Best Multiplayer Games for 2024",
      author: "John Doe",
      category: "Game Reviews",
      replies: 20,
      time: "15 minutes ago",
    },
    {
      title: "How to Build a Game from Scratch",
      author: "Sarah Johnson",
      category: "Game Development",
      replies: 16,
      time: "20 minutes ago",
    },
    {
      title: "Is AI Taking Over Game Development?",
      author: "Emma Wilson",
      category: "Tech Discussions",
      replies: 34,
      time: "30 minutes ago",
    },
    {
      title: "Speedrunning: Tips for Beginners",
      author: "James Carter",
      category: "Gaming Tips",
      replies: 5,
      time: "40 minutes ago",
    },
    {
      title: "Upcoming Gaming Conventions in 2024",
      author: "Olivia Brown",
      category: "Gaming News",
      replies: 12,
      time: "1 hour ago",
    },
    {
      title: "The Evolution of VR in Gaming",
      author: "Liam Davis",
      category: "Tech Discussions",
      replies: 18,
      time: "2 hours ago",
    },
    {
      title: "Best Console for Beginners in 2024",
      author: "Sophia Taylor",
      category: "Game Reviews",
      replies: 7,
      time: "3 hours ago",
    },
    {
      title: "The Art of Character Design",
      author: "Ella Thompson",
      category: "Game Development",
      replies: 22,
      time: "4 hours ago",
    },
    {
      title: "Top Strategies for RTS Games",
      author: "Michael Baker",
      category: "Gaming Tips",
      replies: 10,
      time: "5 hours ago",
    },
    {
      title: "How to Make Money as a Game Streamer",
      author: "Lucas Johnson",
      category: "Streaming Tips",
      replies: 40,
      time: "1 day ago",
    },
  ];

