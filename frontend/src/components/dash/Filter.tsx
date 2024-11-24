import React from "react";
import TagsSection from "./TagSection";

const Filter: React.FC = () => {
  return (
    <div className="w-full bg-white h-full px-6 py-8 border-r border-gray-200 rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6 ">Filters</h2>

      {/* Scrollable Filters */}
      <div className="h-full">
        {/* Category or Type */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-700 mb-3">Category or Type</h3>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Categories</option>
            <option value="web-dev">Web Development</option>
            <option value="ai-ml">AI/ML</option>
            <option value="mobile-apps">Mobile Apps</option>
            <option value="blockchain">Blockchain</option>
            <option value="health">Health</option>
          </select>
        </div>

        {/* Difficulty Level */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-700 mb-3">Difficulty Level</h3>
          <div className="space-y-3">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  className="form-radio text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-800 text-sm font-medium">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <TagsSection />

        {/* Ratings */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-700 mb-3">Ratings</h3>
          <div className="flex gap-3 flex-wrap">
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                className="flex items-center gap-2 px-5 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <select className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Durations</option>
            <option value="1-week">Last Week</option>
            <option value="1-month">Last Month</option>
            <option value="6-months">Last 6 Months</option>
            <option value="1-year">Last Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
