import React from "react";
import background from '../../assets/background.png'
const ForumHeader: React.FC = () => {
  return (
    <div className="relative w-full bg-gray-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img
        src={background}
        alt="Forum Background"
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">General Discussion</h1>
        <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-700">
          New Discussion
        </button>
      </div>
    </div>
  );
};

export default ForumHeader;
