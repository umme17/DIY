import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Reaction from "./Reactions";
import ReplyAuthor from "../mostUse/ReplyAuthorName";

interface Reply {
  author: string;
  timeAgo: string;
  content: string;
  reaction: string | null;
  comment_id:number;
  user_id:string;
}

interface CommentProps {
  author: string;
  timeAgo: string;
  content: string;
  target_id:Number;
  target_type:string;
  commentId?: number; // Add comment ID for backend integration
  user_id : string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  age: number;
}


const Comment: React.FC<CommentProps> = ({
  author,
  timeAgo,
  content,
  target_id,
  target_type,
  commentId,
  user_id,
}) => {
  const [reaction, setReaction] = useState<string | null>(null); // Reaction for the comment
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyReactions, setReplyReactions] = useState<Record<number, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReplies = async () => {
    if (!commentId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/replies?comment_id=${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch replies: ${response.statusText}`);
      }

      const data = await response.json();
      setReplies(data.replies || []); // Update replies state with fetched data

      // Initialize reactions for replies
      const initialReactions = data.replies.reduce((acc: Record<number, string | null>, reply: Reply) => {
        acc[reply.comment_id] = null; // Or fetch existing reactions from the API
        return acc;
      }, {});
      setReplyReactions(initialReactions);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [commentId]);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: replyContent,
          parent_comment_id: commentId,
          target_id,
          target_type,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReplies((prevReplies) => [
          ...prevReplies,
          { ...data.comment, author: "You", timeAgo: "Just now" },
        ]);
        setReplyReactions((prevReactions) => ({
          ...prevReactions,
          [data.comment.comment_id]: null, // Initialize reaction for the new reply
        }));
        setReplyContent("");
      } else {
        console.error("Failed to post reply:", await response.json());
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleReplyReactionChange = (replyId: number, newReaction: string | null) => {
    setReplyReactions((prevReactions) => ({
      ...prevReactions,
      [replyId]: newReaction,
    }));
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      {/* Comment Header */}
      <div className="flex items-center space-x-2">
        <FaUser className="text-purple-400" />
        <span className="font-semibold text-purple-700">{author}</span>
        <ReplyAuthor authorId={user_id} />
        <span className="text-sm text-gray-500">{timeAgo}</span>
      </div>

      {/* Comment Content */}
      <p className="mt-2 text-gray-800">{content}</p>

      {/* Reaction Component for Comment */}
      <Reaction
        targetId={commentId!}
        targetType="comment"
        currentReaction={reaction}
        onReactionChange={setReaction}
      />

      {/* Replies Section */}
      <div className="mt-4">
        {loading && <p>Loading replies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {replies.map((reply) => (
          <div
            key={reply.comment_id}
            className="flex flex-col bg-purple-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
          >
            <div className="flex items-center space-x-2">
              <FaUser className="text-purple-400" />
              <ReplyAuthor authorId={reply.user_id} />
              <span className="text-sm text-gray-500">{reply.timeAgo}</span>
            </div>
            <p className="mt-2 text-gray-800">{reply.content}</p>
            <Reaction
              targetId={reply.comment_id}
              targetType="reply"
              currentReaction={replyReactions[reply.comment_id]}
              onReactionChange={(newReaction) =>
              handleReplyReactionChange(reply.comment_id, newReaction)
              }
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
















// import React, { useState } from "react";
// import { FaUser } from "react-icons/fa";
// import Reaction from "./Reactions";

// interface Reply {
//   author: string;
//   timeAgo: string;
//   content: string;
//   reaction: string | null;
// }

// interface CommentProps {
//   author: string;
//   timeAgo: string;
//   content: string;
//   replies?: Reply[];
//   commentId?: number; // Add comment ID for backend integration
// }

// const Comment: React.FC<CommentProps> = ({
//   author,
//   timeAgo,
//   content,
//   replies = [],
//   commentId,
// }) => {
//   const [reaction, setReaction] = useState<string | null>(null); // Reaction state for the comment
//   const [replyContent, setReplyContent] = useState(""); // Input content for new replies
//   const [newReplies, setNewReplies] = useState(replies); // Store replies locally

//   // Handle submitting a new reply
//   const handleReplySubmit = async () => {
//     if (replyContent.trim()) {
//       try {
//         // Add parent_comment_id in the request body
//         const response = await fetch("http://localhost:5000/api/comments", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
//           },
//           body: JSON.stringify({
//             content: replyContent,
//             parent_comment_id: commentId, // Pass the parent comment ID
//             target_id: 1, // Replace with actual target_id (e.g., project_id or forum_id)
//             target_type: "forum", // Replace with actual target_type
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setNewReplies([
//             ...newReplies,
//             { ...data.comment, author: "You", timeAgo: "Just now" },
//           ]);
//           setReplyContent(""); // Reset input after submission
//         } else {
//           console.error("Failed to post reply:", await response.json());
//         }
//       } catch (error) {
//         console.error("Error posting reply:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
//       {/* Comment Header */}
//       <div className="flex items-center space-x-2">
//         <FaUser className="text-purple-400" />
//         <span className="font-semibold text-purple-700">{author}</span>
//         <span className="text-sm text-gray-500">{timeAgo}</span>
//       </div>

//       {/* Comment Content */}
//       <p className="mt-2 text-gray-800">{content}</p>

//       {/* Reaction Component */}
//       <Reaction currentReaction={reaction} onReactionChange={setReaction} />

//       {/* Replies Section */}
//       <div className="mt-4">
//         {newReplies.map((reply, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col bg-purple-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
//           >
//             <div className="flex items-center space-x-2">
//               <FaUser className="text-purple-400" />
//               <span className="font-semibold text-purple-700">{reply.author}</span>
//               <span className="text-sm text-gray-500">{reply.timeAgo}</span>
//             </div>
//             <p className="mt-2 text-gray-800">{reply.content}</p>
//           </div>
//         ))}
//       </div>

//       {/* Reply Input */}
//       <textarea
//         value={replyContent}
//         onChange={(e) => setReplyContent(e.target.value)}
//         placeholder="Write a reply..."
//         className="w-full p-2 border border-purple-300 rounded-lg mt-2 resize-none"
//         rows={3}
//       />
//       <div className="mt-2 flex justify-between">
//         <button
//           onClick={() => setReplyContent("")}
//           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleReplySubmit}
//           disabled={!replyContent.trim()}
//           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
//         >
//           Post Reply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Comment;
