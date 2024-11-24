import React, { useState } from "react";

interface DocumentationLinksProps {
  links: string[]; // Receive links as a prop
  onLinksChange: (links: string[]) => void; // Callback to update links
}

const DocumentationLinks: React.FC<DocumentationLinksProps> = ({ links, onLinksChange }) => {
  const [submittedLinks, setSubmittedLinks] = useState<string[]>([]); // Store submitted links

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    onLinksChange(updatedLinks);
  };

  // Add a new empty link input field
  const handleAddLink = (index: number) => {
    const currentLink = links[index].trim();
    if (currentLink) {
      setSubmittedLinks((prev) => [...prev, currentLink]); // Add to submitted links
      const updatedLinks = [...links];
      onLinksChange(updatedLinks);
    }
  };

  // Remove a specific link
  const handleRemoveLink = (index: number) => {
    onLinksChange(links.filter((_, i) => i !== index)); // Remove the link from the list
  };

  return (
    <div className="p-6 shadow-md border border-gray-200 rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4 text-purple-700">Documentation</h2>

      {/* Dynamic Input Fields */}
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="url"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                placeholder={`Documentation link ${index + 1}`}
                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 text-gray-700"
              />
              <button
                onClick={() => handleAddLink(index)}
                className="bg-purple-600 text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition focus:outline-none shadow"
              >
                Add
              </button>
              <button
                onClick={() => handleRemoveLink(index)}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition"
              >
                X
              </button>
            </div>
          </div>
        ))}

        {/* Submitted Links as Clickable Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {submittedLinks.map((submittedLink, index) => (
            <a
              key={index}
              href={submittedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full shadow text-sm hover:bg-purple-200 transition"
            >
              {submittedLink}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentationLinks;
