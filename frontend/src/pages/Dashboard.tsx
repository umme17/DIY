import React from "react";
import Navbar2 from "../components/Navbar2";
import ProjectGrid from "../components/dash/ProjectGrid";
import Filter from "../components/dash/Filter";

const DashboardLayout: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar2 />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Filters (Sticky) */}
        <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-200 h-full overflow-y-auto sticky top-0">
          <Filter />
        </div>

        {/* Right Side: Search Bar and Grid */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar (Sticky) */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-6 shadow-md">
            <input
              type="text"
              placeholder="Search for projects, categories, or tags"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Scrollable Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <ProjectGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;