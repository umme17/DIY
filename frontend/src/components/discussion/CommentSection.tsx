import React, { useState, useEffect } from "react";
import Comment from "./Comment";

interface CommentSectionProps {
  target_id: Number;
  target_type: string;
  
}

const CommentSection: React.FC<CommentSectionProps> = ({target_id,target_type}) => {
  const [commentContent, setCommentContent] = useState(""); // Content of the new comment
  const [comments, setComments] = useState<any[]>([]); // Store top-level comments

  // Fetch comments from the backend
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments?target_id=${target_id}&target_type=${target_type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        console.error("Failed to fetch comments:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Post a new comment to the backend
  const handleCommentSubmit = async () => {
    if (commentContent.trim()) {
      try {
        const response = await fetch("http://localhost:5000/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
          body: JSON.stringify({
            target_id: target_id, // Replace with dynamic target details
            target_type: target_type,
            content: commentContent,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setComments([data.comment, ...comments]); // Add the new comment
          setCommentContent(""); // Reset input after submission
        } else {
          console.error("Failed to post comment:", await response.json());
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

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
            onClick={() => setCommentContent("")}
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
          author={comment.author || "Anonymous"} // Replace with backend-provided author
          timeAgo={comment.created_at || "Just now"} // Replace with backend-provided time
          content={comment.content}
          commentId={comment.comment_id} // Pass comment ID for backend operations
          target_id  = {target_id}
          target_type = {target_type}
          user_id = {comment.user_id}
        />
      ))}
    </div>
  );
};

export default CommentSection;
