import React from "react";

interface DocumentationLinksProps {
  links: string[]; // Receive links as a prop
  onLinksChange: (links: string[]) => void; // Callback to update links
}

const DocumentationLinks: React.FC<DocumentationLinksProps> = ({ links, onLinksChange }) => {
  // Handle input change for a specific link
  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    onLinksChange(updatedLinks);
  };

  // Add a new empty link input field
  const handleAddLink = (index: number) => {
    const currentLink = links[index].trim();
    if (currentLink) {
      const updatedLinks = [...links];
      updatedLinks.splice(index + 1, 0, ""); // Add a new empty link below the current one
      onLinksChange(updatedLinks);
    }
  };
 
  // Remove a specific link
  const handleRemoveLink = (index: number) => {
    onLinksChange(links.filter((_, i) => i !== index)); // Remove the link from the list
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Attach Documentation Links
      </label>
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type="url"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              placeholder={`Documentation link ${index + 1}`}
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 text-gray-700"
            />
            {/* Add Button */}
            <button
              onClick={() => handleAddLink(index)}
              className="bg-purple-600 text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition focus:outline-none shadow"
            >
              Add
            </button>
            {/* Remove Button (Cross) */}
            <button
              onClick={() => handleRemoveLink(index)}
              className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Display links as clickable pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {links.map((link, index) =>
          link ? (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full shadow text-sm"
            >
              {link}{" "}
              <button
                onClick={() => handleRemoveLink(index)}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition"
              >
                X
              </button>
            </span>
          ) : null
        )}
      </div>
    </div>
  );
};

export default DocumentationLinks;
