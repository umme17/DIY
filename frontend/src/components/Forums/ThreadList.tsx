import React, { useState, useEffect } from "react";
import { FaStar, FaUser, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ThreadListProps {
  searchTerm: string;
}

interface Thread {
  forum_id: number;
  forum_title: string;
  author: string;
  category: string;
  replies: number;
  created_at: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ searchTerm }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getRelativeTime = (date: string): string => {
    const now = new Date();
    const givenDate = new Date(date);
    const diffInMs = now.getTime() - givenDate.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (years > 0) return rtf.format(-years, "year");
    if (months > 0) return rtf.format(-months, "month");
    if (weeks > 0) return rtf.format(-weeks, "week");
    if (days > 0) return rtf.format(-days, "day");
    if (hours > 0) return rtf.format(-hours, "hour");
    if (minutes > 0) return rtf.format(-minutes, "minute");
    return rtf.format(-seconds, "second");
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/forums/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch threads: ${response.status}`);
        }

        const data = await response.json();
        const formattedThreads = data.forums.map((forum: any) => ({
          forum_id: forum.forum_id,
          forum_title: forum.forum_title,
          author: forum.user_name,
          category:  Array.isArray(forum.tags) ? forum.tags : JSON.parse(forum.tags),
          replies: forum.comment_count,
          created_at: forum.created_at,
        }));

        setThreads(formattedThreads);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      }
    };

    fetchThreads();
  }, []);

const filteredThreads = threads.filter((thread) => {
  const now = new Date();

  // Helper function to calculate the time difference in hours
  const hoursSinceCreation = (createdAt: string): number => {
    const createdDate = new Date(createdAt);
    return (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
  };

  const matchesSearch =
    thread.forum_title.toLowerCase().includes(searchTerm.toLowerCase())
    // thread.category.toLowerCase().includes(searchTerm.toLowerCase());

  if (activeTab === "All") return matchesSearch;

  if (activeTab === "Unanswered") {
    // Threads with 0 replies
    return thread.replies === 0 && matchesSearch;
  }

  if (activeTab === "Latest") {
    // Threads created within the last 24 hours
    return hoursSinceCreation(thread.created_at) <= 24 && matchesSearch;
  }

  if (activeTab === "Popular") {
    // Threads with 10+ replies and created within the last 7 days
    return thread.replies >= 10 && hoursSinceCreation(thread.created_at) <= 7 * 24 && matchesSearch;
  }

  return matchesSearch;
});


  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="sticky top-0 bg-white p-4 z-40 shadow-md">
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

      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
          {filteredThreads.map((thread) => (
            <li
            key={thread.forum_id}
            onClick={() =>
              navigate(`/thread/${thread.forum_id}`, { state: { thread } })
            }
              className="flex flex-col sm:flex-row justify-between p-5 bg-white rounded-lg shadow hover:shadow-md transition duration-300 border border-gray-200"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800 hover:text-purple-600 transition duration-300 cursor-pointer">
                  {thread.forum_title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-2 gap-3">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>{thread.author}</span>
                  </div>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {Array.isArray(thread.category)
                    ? thread.category.map((tag, index) => (
                 <span
                     key={index}
          className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium"
         >
          {tag}
        </span>
      ))
    : null}
                  </span>
                  <span className="text-gray-400">{getRelativeTime(thread.created_at)}</span>
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
