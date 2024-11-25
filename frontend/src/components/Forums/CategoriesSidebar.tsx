import React from "react";
import { FaGamepad, FaSearch } from "react-icons/fa";

interface CategoriesSidebarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const categories = [
    { name: "All", count: 10, icon: <FaGamepad className="text-purple-500" /> },
    { name: "Game Title 1", count: 4, icon: <FaGamepad className="text-green-500" /> },
    { name: "Game Title 2", count: 8, icon: <FaGamepad className="text-blue-500" /> },
    { name: "Game Title 3", count: 2, icon: <FaGamepad className="text-yellow-500" /> },
    { name: "Game Title 4", count: 5, icon: <FaGamepad className="text-red-500" /> },
  ];

  return (
    <div className="w-full bg-gray-100 p-6 border-r border-gray-200 h-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Categories</h2>

      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search threads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              {category.icon}
              <span className="text-gray-700 font-medium">{category.name}</span>
            </div>
            <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
