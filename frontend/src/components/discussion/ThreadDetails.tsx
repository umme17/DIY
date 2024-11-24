import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar2 from "../Navbar2"; // Import Navbar2 component
import Comment from "./Comment";
import RelatedDiscussions from "./RelatedDiscussions";

// Define the interface for Reply
interface Reply {
  author: string;
  timeAgo: string;
  content: string;
}

// Define the interface for Thread
interface Thread {
  title: string;
  author: string;
  time: string;
  content: string;
  replies: Reply[]; // An array of replies
}

const threads: Thread[] = [
  {
    title: "How to Improve Game Graphics on a Budget",
    author: "Daniel Pierce",
    time: "5 minutes ago",
    content: "Content of the thread...",
    replies: [
      {
        author: "Samantha Clark",
        timeAgo: "2 minutes ago",
        content: "This is a reply to the thread.",
      },
      {
        author: "John Doe",
        timeAgo: "5 minutes ago",
        content: "Another reply to the thread.",
      },
    ],
  },
  // Add more thread objects as needed
];

const ThreadDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const thread = threads[parseInt(id || "0", 10)];

  // State for new comment
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Reply[]>(thread.replies); // Use replies as initial state for comments

  // Handle new comment submission
  const handleNewCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        author: "You",
        timeAgo: "Just now",
        content: newComment,
      };
      setComments([comment, ...comments]); // Add new comment to the top of the list
      setNewComment(""); // Reset comment input after submission
    }
  };

  if (!thread) return <div className="p-4 text-center text-gray-600">Thread not found</div>;

  return (
    <div className="bg-white">
      {/* Navbar2 Component */}
      <Navbar2 />

      <div className="max-w-7xl mx-auto px-4 py-6 flex space-x-8">
        {/* Left Section: Thread Content and Comments */}
        <div className="flex-1 space-y-6">
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-800">{thread.title}</h1>
            <div className="flex items-center text-sm text-gray-600 mt-2 gap-3">
              <span className="font-medium">{thread.author}</span>
              <span className="text-gray-400">{thread.time}</span>
            </div>
          </div>

          <div className="mb-6 text-gray-800">
            <p>{thread.content}</p>
          </div>

          
          {/* New Comment Input Box */}
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border border-purple-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setNewComment("")} // Cancel the comment input
                className="px-4 py-2  text-purple-800 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 border border-purple-600"
              >
                Cancel
              </button>
              <button
                onClick={handleNewCommentSubmit}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
              >
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            {comments.map((comment, idx) => (
              <Comment
                key={idx}
                author={comment.author}
                timeAgo={comment.timeAgo}
                content={comment.content}
                replies={[]} // Replies will be handled separately in the Comment component
              />
            ))}
          </div>

        </div>

        {/* Right Section: Related Discussions */}
        <div className="w-1/3 flex-shrink-0">
          <div className="p-6 bg-purple-100 rounded-lg shadow border mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Discussions</h2>
            <RelatedDiscussions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetails;
