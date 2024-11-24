import React, { useState } from "react";

const TagsSection: React.FC = () => {
  const [tags, setTags] = useState<string[]>([
    "React",
    "Python",
    "Blockchain",
    "AI",
    "Health",
  ]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      // Prevent duplicate tags
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag(""); // Clear input after adding
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Tags</h3>
      {/* Default and Added Tags */}
      <div className="space-y-2">
        {tags.map((tag, index) => (
          <label key={index} className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" /> {tag}
          </label>
        ))}
      </div>

      {/* Add New Tag */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Add New Tag</h4>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Enter a tag and press Enter"
          className="w-full px-2 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

export default TagsSection;
