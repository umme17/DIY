import React, { useState, useEffect } from "react";

interface RatingsProps {
  targetId: number; // ID of the target (e.g., project)
  onRatingChange?: (rating: number) => void; // Callback to notify parent about rating changes
}

const Ratings: React.FC<RatingsProps> = ({ targetId, onRatingChange }) => {
  const [rating, setRating] = useState(0); // Current rating by the user
  const [hoverRating, setHoverRating] = useState<number | null>(null); // Hover state for rating

  // Fetch initial rating (optional, if the user already rated)
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ratings/${targetId}`);
        if (response.ok) {
          const data = await response.json();
          setRating(data.rating); // Set initial rating from the server
        } else {
          console.error("Failed to fetch rating:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchRating();
  }, [targetId]);

  // Handle rating change
  const handleRatingClick = async (star: number) => {
    try {
      const response = await fetch("http://localhost:5000/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
        body: JSON.stringify({
          target_id: targetId,
          rating: star,
        }),
      });

      if (response.ok) {
        setRating(star); // Update the local rating
        onRatingChange && onRatingChange(star); // Notify parent about the change
      } else {
        console.error("Failed to update rating:", await response.json());
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="mt-4 flex justify-center items-center gap-4">
      <div className="flex gap-2 text-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => handleRatingClick(star)}
            className={`cursor-pointer transform transition-transform ${
              (hoverRating || rating) >= star
                ? "text-yellow-400 scale-125"
                : "text-gray-300 scale-100"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-lg font-medium text-gray-700">
        {rating > 0 ? `${rating}/5` : "Rate this project"}
      </p>
    </div>
  );
};

export default Ratings;
