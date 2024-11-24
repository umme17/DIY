import React, { useState } from "react";
import Comment from "./Comment"; // Import Comment component

const CommentSection: React.FC = () => {
  const [commentContent, setCommentContent] = useState(""); // Content of the new comment
  const [comments, setComments] = useState<any[]>([]); // Store top-level comments (independent of replies)

  const handleCommentSubmit = () => {
    if (commentContent.trim()) {
      const newComment = {
        author: "You",
        timeAgo: "Just now",
        content: commentContent,
        replies: [], // No replies at the time of creation
      };
      setComments([newComment, ...comments]); // Add the new comment to the top of the list
      setCommentContent(""); // Reset input after submission
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Independent Comment Box */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          rows={4}
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCommentContent("")} // Cancel the comment input
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleCommentSubmit}
            disabled={!commentContent.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {comments.map((comment, idx) => (
        <Comment
          key={idx}
          author={comment.author}
          timeAgo={comment.timeAgo}
          content={comment.content}
          replies={comment.replies} // Pass replies (if any) to each comment
        />
      ))}
    </div>
  );
};

export default CommentSection;
