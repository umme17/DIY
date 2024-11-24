import React from "react";

const RelatedDiscussions: React.FC = () => {
  return (
    <div className="mt-6">
      <ul className="space-y-3 mt-3">
        {/* You can dynamically generate this list */}
        <li className="text-blue-600 hover:underline cursor-pointer">How to Build a Game from Scratch</li>
        <li className="text-blue-600 hover:underline cursor-pointer">The Evolution of VR in Gaming</li>
      </ul>
    </div>
  );
};

export default RelatedDiscussions;
