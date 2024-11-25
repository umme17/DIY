import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdNotifications } from "react-icons/md";
import logo from "../assets/logo.png";

interface NavbarProps {
  level: string;
}

const Navbar2: React.FC<NavbarProps> = ({ level }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/login");
  };

  const toggleProfileModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 bg-white text-gray-800 py-2 px-8 flex justify-between items-center w-full shadow-lg z-50 border-b border-gray-200">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-4 ml-8 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src={logo} alt="Logo" className="h-10" />
          <p className="text-gray-800 font-bold text-xl tracking-wide">DIY</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => handleNavigation("/dashboard")}
            className="text-sm font-medium text-gray-600 hover:text-purple-600 transition duration-200 ease-in-out"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavigation("/forum")}
            className="text-sm font-medium text-gray-600 hover:text-purple-600 transition duration-200 ease-in-out"
          >
            Forums
          </button>
          <button
            onClick={() => handleNavigation("/consultation")}
            className="text-sm font-medium text-gray-600 hover:text-purple-600 transition duration-200 ease-in-out"
          >
            Consultation
          </button>
        </div>

        {/* Right: Buttons and Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Conditional Action Button */}
          <button
            onClick={() => handleNavigation(level === "+ Create Project" ? "/createProject" : "/forum")}
            className="hidden md:block bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 shadow-md transition duration-200 ease-in-out"
          >
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
          <div className="relative">
            <button
              onClick={toggleProfileModal}
              className="text-purple-600 hover:bg-purple-100 p-3 rounded-full border-2 border-purple-600 transition duration-200 ease-in-out"
            >
              <FaUser className="text-2xl" />
            </button>

            {/* Profile Modal Dropdown */}
            {isModalOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-lg border border-gray-200 rounded-lg w-48 py-2 z-50">
                <ul className="text-sm text-gray-800">
                  <li
                    onClick={() => {
                      navigate("/profile");
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      navigate("/my-courses");
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    My Courses
                  </li>
                  <li
                    onClick={() => {
                      navigate("/my-plans");
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    My Plans
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
