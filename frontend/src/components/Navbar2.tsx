import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdNotifications } from "react-icons/md";

import logo from "../assets/logo.png"; // Import your logo

interface NavbarProps {
  level: string;
}

const Navbar: React.FC<NavbarProps> = ({ level }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 bg-white text-gray-800 py-2 px-8 flex justify-between items-center w-full shadow-lg z-50 border-b border-gray-200">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 ml-8">
          <img src={logo} alt="Logo" className="h-10 cursor-pointer" />
          <p className="text-gray-800 font-bold text-xl tracking-wide">DIY</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Projects', 'Forums', 'Consultation'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition duration-200 ease-in-out"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Buttons and Icons */}
        <div className="flex items-center gap-4">
          {/* New Project Button */}
          <button className="hidden md:block bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 shadow-md transition duration-200 ease-in-out">
            {level}
          </button>

          {/* Notification Icon */}
          <button className="relative p-3 hover:bg-purple-100 rounded-full transition duration-200 ease-in-out">
            <MdNotifications className="text-purple-600 text-2xl" />
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              3
            </span>
          </button>

          {/* Favorite Icon */}
          <button className="p-3 hover:bg-purple-100 rounded-full transition duration-200 ease-in-out">
            <MdFavoriteBorder className="text-purple-600 text-2xl" />
          </button>

          {/* User Icon */}
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="text-purple-600 hover:bg-purple-100 p-3 rounded-full border-2 border-purple-600 transition duration-200 ease-in-out"
          >
            <FaUser className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed top-20 right-8 bg-white shadow-lg rounded-md border border-gray-200 w-56 z-50"
          onMouseLeave={() => setIsModalOpen(false)}
        >
          <ul className="flex flex-col text-sm text-gray-700 divide-y divide-gray-200">
            <li className="px-4 py-3 hover:bg-purple-50 cursor-pointer font-semibold text-purple-700">
              Notifications
            </li>
            <li className="px-4 py-3 hover:bg-purple-50 cursor-pointer">Profile</li>
            <li className="px-4 py-3 hover:bg-purple-50 cursor-pointer">My Courses</li>
            <li className="px-4 py-3 hover:bg-purple-50 cursor-pointer">My Plans</li>
            <li className="px-4 py-3 hover:bg-purple-50 cursor-pointer text-red-600 font-semibold">
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
