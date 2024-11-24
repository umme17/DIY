import React from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";

interface ChecklistProps {
  sections: string[];
  completedSections: string[]; // Array of completed section names
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const Checklist: React.FC<ChecklistProps> = ({
  sections,
  completedSections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Checklist</h2>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li
            key={section}
            className={`flex items-center gap-2 cursor-pointer ${
              completedSections.includes(section)
                ? "text-green-600 font-medium"
                : section === activeSection
                ? "text-purple-700 font-semibold"
                : "text-gray-600 hover:text-purple-500"
            }`}
            onClick={() => onSectionClick(section)}
          >
            {completedSections.includes(section) ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
            <span>{section}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <p className="text-sm text-gray-600">
          Progress: {completedSections.length}/{sections.length} Steps Completed
        </p>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            className="bg-purple-500 h-2 rounded transition-all"
            style={{
              width: `${(completedSections.length / sections.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
