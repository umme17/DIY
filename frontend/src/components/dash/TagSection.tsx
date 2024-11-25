import React, { useState } from "react";

interface TagsSectionProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsSection: React.FC<TagsSectionProps> = ({ selectedTags, onTagsChange }) => {
  const initialTags = ["React", "Python", "Art", "AI", "Health"];
  const [newTag, setNewTag] = useState<string>("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      const trimmedTag = newTag.trim();
      // Prevent duplicate tags
      if (!selectedTags.includes(trimmedTag)) {
        const updatedTags = [...selectedTags, trimmedTag];
        onTagsChange(updatedTags);
      }
      setNewTag(""); // Clear input after adding
    }
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if it's already selected
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      // Add tag if it's not selected
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Tags</h3>
      {/* Initial and Added Tags */}
      <div className="space-y-2">
        {[...initialTags, ...selectedTags.filter((tag) => !initialTags.includes(tag))].map(
          (tag, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          )
        )}
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
