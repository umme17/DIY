import React from "react";

interface FileUploadProps {
  label: string;
  files: File[]; // Receive files as a prop
  onFilesChange: (files: File[]) => void; // Callback to notify parent of changes
}

const FileUpload: React.FC<FileUploadProps> = ({ label, files, onFilesChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedFiles = Array.from(event.target.files);
      onFilesChange(updatedFiles); // Notify parent of updated files
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles); // Notify parent after removing a file
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Choose File Button */}
        <input
          type="file"
          id={label.replace(" ", "-").toLowerCase()}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <label
          htmlFor={label.replace(" ", "-").toLowerCase()}
          className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition focus:outline-none shadow"
        >
          Choose File
        </label>

        {/* File List */}
        <div className="flex-1">
          {files.length > 0 ? (
            <ul className="bg-gray-50 border border-gray-300 rounded-md shadow-sm p-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-gray-600 truncate mb-1"
                >
                  {file.name}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-gray-400">No files selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
