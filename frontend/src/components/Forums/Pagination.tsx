import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-white border-t border-gray-200 shadow-sm">
      {/* Older Threads Button */}
      <button
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 font-medium transition-colors duration-300"
        aria-label="Older Threads"
      >
        <FaArrowLeft />
        <span>Older Threads</span>
      </button>

      {/* Page Number Indicator */}
      <span className="text-gray-700 font-semibold">
        Page <span className="text-purple-500">2</span> of 58
      </span>

      {/* Newer Threads Button */}
      <button
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 font-medium transition-colors duration-300"
        aria-label="Newer Threads"
      >
        <span>Newer Threads</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
