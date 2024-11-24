import React, { useState } from "react";
import { FaUser} from "react-icons/fa";
import Reaction from "./Reactions"; // Importing the existing Reaction component

// Define the interface for Reply
interface Reply {
  author: string;
  timeAgo: string;
  content: string;
  reaction: string | null; // Add reaction state for replies
}

interface CommentProps {
  author: string;
  timeAgo: string;
  content: string;
  replies?: Reply[]; // Optional replies array
}

const Comment: React.FC<CommentProps> = ({ author, timeAgo, content, replies = [] }) => {
  const [reaction, setReaction] = useState<string | null>(null); // Reaction state for the comment
  const [replyContent, setReplyContent] = useState(""); // Input content for new replies
  const [newReplies, setNewReplies] = useState(replies); // Store replies locally

  // Handle reaction change for the main comment
  const handleReactionChange = (reaction: string) => {
    setReaction(reaction);
  };

  // Handle reaction change for replies
  const handleReplyReactionChange = (index: number, reaction: string) => {
    const updatedReplies = [...newReplies];
    updatedReplies[index].reaction = reaction;
    setNewReplies(updatedReplies);
  };

  // Handle submitting a new reply
  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      setNewReplies([
        ...newReplies,
        { author: "You", timeAgo: "Just now", content: replyContent, reaction: null },
      ]);
      setReplyContent(""); // Reset input after submission
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      {/* Comment Header */}
      <div className="flex items-center space-x-2">
        <FaUser className="text-purple-400" />
        <span className="font-semibold text-purple-700">{author}</span>
        <span className="text-sm text-gray-500">{timeAgo}</span>
      </div>

      {/* Comment Content */}
      <p className="mt-2 text-gray-800">{content}</p>

      {/* Reaction System for the Comment */}
      <Reaction currentReaction={reaction} onReactionChange={handleReactionChange} />

      {/* Display replies */}
      <div className="mt-4">
        {newReplies.map((reply, idx) => (
          <div key={idx} className="flex flex-col bg-purple-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="flex items-center space-x-2">
              <FaUser className="text-purple-400" />
              <span className="font-semibold text-purple-700">{reply.author}</span>
              <span className="text-sm text-gray-500">{reply.timeAgo}</span>
            </div>
            <p className="mt-2 text-gray-800">{reply.content}</p>

            {/* Reaction System for the Reply */}
            <Reaction
              currentReaction={reply.reaction}
              onReactionChange={(reaction) => handleReplyReactionChange(idx, reaction)}
            />
          </div>
        ))}
      </div>

      {/* Reply Input */}
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Write a reply..."
        className="w-full p-2 border border-purple-300 rounded-lg mt-2 resize-none"
        rows={3}
      />
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => setReplyContent("")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleReplySubmit}
          disabled={!replyContent.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
        >
          Post Reply
        </button>
      </div>
    </div>
  );
};

export default Comment;
