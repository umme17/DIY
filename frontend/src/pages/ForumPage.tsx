import React, { useState } from "react";
import Navbar2 from "../components/Navbar2"; 
import CategoriesSidebar from "../components/Forums/CategoriesSidebar";
import ThreadList from "../components/Forums/ThreadList";

const ForumPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar2 level="+ Create Forum"/>

      {/* Forum Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
          <CategoriesSidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Thread List */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ThreadList searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
