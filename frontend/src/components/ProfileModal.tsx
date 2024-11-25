import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/login");
    onClose();
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-1/4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-4 text-gray-700">
          <li
            onClick={handleNavigateToProfile}
            className="cursor-pointer hover:text-purple-600 transition"
          >
            Profile
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer hover:text-purple-600 transition"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;
