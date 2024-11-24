import React from "react";

const DiscussionHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Understanding State Management in React
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Posted by <span className="font-semibold">John Doe</span> on{" "}
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default DiscussionHeader;
