import React from "react";
import { useParams, useLocation } from "react-router-dom";
// import threads from "./ThreadList";

const ForumDetails: React.FC = () => {
  const location = useLocation();
  const thread = location.state?.thread;

  if (!thread) {
    return <div>Thread not found</div>;
  }
// //   const location = useLocation(); // Access thread data passed from ThreadList
// const thread = 
//     {
//       title: "How to Improve Game Graphics on a Budget",
//       author: "Daniel Pierce",
//       category: "Game Development",
//       replies: 12,
//       time: "5 minutes ago",
//       content: " I am habiba"
//     }// Extract thread details from state

  if (!thread) {
    return <div className="p-4">Thread not found!</div>;
  }
  console.log(thread);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">{thread.title}</h1>
        <div className="mt-4 text-sm text-gray-600">
          <span>By {thread.author}</span> | <span>{thread.time}</span> |{" "}
          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            {thread.category}
          </span>
        </div>
        <p className="mt-6 text-gray-700 leading-6">{thread.content}</p>
      </div>
    </div>
  );
};

export default ForumDetails;
