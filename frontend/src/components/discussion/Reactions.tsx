import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";

interface ReactionProps {
  targetId: number; // ID of the target (project, comment, or reply)
  targetType: "project" | "comment" | "reply"; // Type of target
  currentReaction: string | null; // Current user reaction (if any)
  onReactionChange: (reaction: string | null) => void; // Callback for parent component
}

const Reaction: React.FC<ReactionProps> = ({
  targetId,
  targetType,
  currentReaction,
  onReactionChange,
}) => {
  const [reactions, setReactions] = useState({ like: 0, dislike: 0, love: 0 }); // Aggregated counts
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch reaction counts on mount or when targetId/targetType changes
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reactions?target_id=${targetId}&target_type=${targetType}`
        );

        if (response.ok) {
          const data = await response.json();
          setReactions(data.counts);
        } else {
          console.error("Failed to fetch reaction counts:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [targetId, targetType]);

  // Handle reaction change
  const handleReactionClick = async (reactionType: string) => {
    if (loading) return; // Prevent multiple requests
    const validReactions = ["like", "dislike", "love"]; // Validate reaction type

    if (!validReactions.includes(reactionType)) {
      console.error("Invalid reaction type:", reactionType);
      return;
    }

    const newReaction = currentReaction === reactionType ? null : reactionType; // Toggle reaction
    setLoading(true); // Set loading state

    try {
      const response = await fetch("http://localhost:5000/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
        body: JSON.stringify({
          target_id: targetId,
          target_type: targetType,
          reaction_type: newReaction, // Pass the new reaction (or null to remove)
        }),
      });

      if (response.ok) {
        const updatedReactions = await response.json(); // Backend returns updated counts
        setReactions(updatedReactions.counts); // Update UI counts
        onReactionChange(newReaction); // Notify parent component
      } else {
        console.error("Failed to update reaction:", await response.json());
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Reaction types and icons
  const reactionTypes = [
    { type: "like", icon: <FaThumbsUp className="text-lg" /> },
    { type: "dislike", icon: <FaThumbsDown className="text-lg" /> },
    { type: "love", icon: <FaHeart className="text-lg text-red-500" /> },
  ];

  // Conditional rendering based on targetType
  if (targetType === "project") {
    return (
      <div className="flex gap-6 justify-center">
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow ${
            currentReaction === "like"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-indigo-50"
          }`}
          onClick={() => handleReactionClick("like")}
          disabled={loading}
        >
          <FaThumbsUp className="text-xl" />
          {reactions.like} Likes
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow ${
            currentReaction === "dislike"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-red-50"
          }`}
          onClick={() => handleReactionClick("dislike")}
          disabled={loading}
        >
          <FaThumbsDown className="text-xl" />
          {reactions.dislike} Dislikes
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow ${
            currentReaction === "love"
              ? "bg-pink-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-pink-50"
          }`}
          onClick={() => handleReactionClick("love")}
          disabled={loading}
        >
          <FaHeart className="text-xl" />
          {reactions.love} Loves
        </button>
      </div>
    );
  }

  // Default design for other target types (e.g., comment, reply)
  return (
    <div className="mt-2 flex space-x-4 text-gray-600">
      {reactionTypes.map(({ type, icon }) => (
        <button
          key={type}
          onClick={() => handleReactionClick(type)}
          className="flex items-center space-x-1"
          disabled={loading} // Disable button during loading
        >
          {React.cloneElement(icon, {
            className: `text-lg ${
              currentReaction === type ? "text-blue-500" : "text-gray-400"
            }`,
          })}
          <span>{reactions[type as keyof typeof reactions]}</span>
        </button>
      ))}
    </div>

    

    
  );
};

export default Reaction;
