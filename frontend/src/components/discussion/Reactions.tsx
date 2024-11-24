// Reaction.tsx
import React from "react";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";

interface ReactionProps {
  currentReaction: string | null;
  onReactionChange: (reaction: string) => void;
}

const Reaction: React.FC<ReactionProps> = ({ currentReaction, onReactionChange }) => {
  const reactions = [
    { type: "like", icon: <FaThumbsUp className="text-lg" /> },
    { type: "dislike", icon: <FaThumbsDown className="text-lg" /> },
    { type: "love", icon: <FaHeart className="text-lg text-red-500" /> },
  ];

  const handleReactionClick = (reaction: string) => {
    if (currentReaction === reaction) {
      onReactionChange(""); // Remove the reaction if the same one is clicked again
    } else {
      onReactionChange(reaction); // Set the new reaction
    }
  };

  return (
    <div className="mt-2 flex space-x-4 text-gray-600">
      {reactions.map(({ type, icon }) => (
        <button
          key={type}
          onClick={() => handleReactionClick(type)}
          className="flex items-center space-x-1"
        >
          {React.cloneElement(icon, {
            className: `text-lg ${currentReaction === type ? "text-blue-500" : "text-gray-400"}`,
          })}
          <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </button>
      ))}
    </div>
  );
};

export default Reaction;
