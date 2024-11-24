import React, { useState } from "react";

const NewProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState("");
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState("active");
  const [newTag, setNewTag] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTagAdd = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("resources", resources);
    formData.append("submissionDate", submissionDate);
    formData.append("status", status);
    formData.append("tags", JSON.stringify(tags));
    formData.append("file", file);

    console.log("Form data ready for submission:", formData);

    // Replace with an API endpoint for file upload
    const response = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Project created successfully!");
    } else {
      alert("Failed to create the project.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Create a New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of your project"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Resources */}
        <div>
          <label htmlFor="resources" className="block text-sm font-medium text-gray-700">
            Resources (Optional)
          </label>
          <textarea
            id="resources"
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            placeholder="Add any relevant links or instructions"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

                {/* File Upload */}
                <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload File (PDF)
          </label>
          <input
            type="file"
            id="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: <span className="font-semibold">{file.name}</span>
            </p>
          )}
        </div>

        {/* Submission Date */}
        <div>
          <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700">
            Submission Date
          </label>
          <input
            type="date"
            id="submissionDate"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="text"
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-2 space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>


        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
