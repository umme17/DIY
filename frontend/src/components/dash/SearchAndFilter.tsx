import React from "react";

const SearchAndFilter: React.FC = () => {
  return (
    <div className="w-full px-6 py-4 bg-gray-50 border-b border-gray-200 shadow-md">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            className="w-48 px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Categories</option>
            <option value="robotics">Robotics</option>
            <option value="iot">IoT</option>
            <option value="automation">Home Automation</option>
            <option value="environment">Environment Monitoring</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            className="w-40 px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Any Type</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <select
            className="w-40 px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Search Button */}
        <button className="bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
