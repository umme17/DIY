import React, { useState } from "react";
import TagsSection from "./TagSection";

interface FilterProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      difficulty?: string;
      tags?: string[];
      rating?: number;
      duration?: string;
    }>
  >;
}

const Filter: React.FC<FilterProps> = ({ setFilters }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
  const [selectedDuration, setSelectedDuration] = useState<string | undefined>(undefined);

  const handleDifficultyChange = (level: string) => {
    const normalizedLevel = level.toLowerCase(); // Normalize to lowercase
    setSelectedDifficulty(normalizedLevel);
    setFilters((prev) => ({ ...prev, difficulty: normalizedLevel }));
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
    setFilters((prev) => ({ ...prev, tags }));
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setFilters((prev) => ({ ...prev, rating }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = e.target.value;
    setSelectedDuration(duration);
    setFilters((prev) => ({ ...prev, duration }));
  };

  return (
    <div className="w-full bg-white h-full px-6 py-8 border-r border-gray-200 rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>

      {/* Difficulty Level */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-700 mb-3">Difficulty Level</h3>
        <div className="space-y-3">
          
          {["easy", "intermediate", "advanced"].map((level) => (
            <label
              key={level}
              className="flex items-center gap-3 cursor-pointer"
            >

             
              <input
                type="radio"
                name="difficulty"
                className="form-radio text-purple-600 focus:ring-purple-500"
                checked={selectedDifficulty === level}
                onChange={() => handleDifficultyChange(level)}
              />
              <span className="text-gray-800 text-sm font-medium">
                {level.charAt(0).toUpperCase() + level.slice(1)} {/* Capitalize for display */}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <TagsSection selectedTags={selectedTags} onTagsChange={handleTagChange} />

      {/* Ratings */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-700 mb-3">Ratings</h3>
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              onClick={() => handleRatingChange(i + 1)}
              className={`flex items-center gap-2 px-5 py-2 border rounded-full text-sm ${
                selectedRating === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              } hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {i + 1} Star
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-700 mb-3">Duration</h3>
        <select
          value={selectedDuration || ""}
          onChange={handleDurationChange}
          className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Durations</option>
          <option value="6-months">Last Hour</option>
          <option value="1-week">Last Week</option>
          <option value="1-year">Last Day</option>
          <option value="1-month">Last Month</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
