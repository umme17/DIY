import React, { useState } from "react";
import Checklist from "../components/CheckList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar2 from "../components/Navbar2";

const ProjectCreationPage: React.FC = () => {
  const sections = ["Project Title", "Tags", "Level", "Cover image", "Project Description"];
  const predefinedTags = ["Art", "Home Automation", "Wearables", "Robotics"];
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    projectTitle: "",
    tags: [] as string[],
    skillLevel: "",
    coverImage: "",
    description: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };
      console.log(field);
  
      // Map form fields to checklist sections
      const fieldToSectionMap: { [key: string]: string } = {
        projectTitle: "Project Title",
        tags: "Tags",
        skillLevel: "Level",
        coverImage: "Cover image",
        description: "Project Description",
      };
  
      const sectionName = fieldToSectionMap[field];
      if (sectionName) {
        let isCompleted = false;
  
        // Special handling for "tags"
        if (field === "tags") {
          isCompleted = value.length > 0;
          console.log(value.length) // Tags completed if array is non-empty
        } else if (field === "description") {
          const plainText = value.replace(/<\/?[^>]+(>|$)/g, "").trim(); // Strip HTML tags
          isCompleted = plainText.length > 0;
        } else {
          isCompleted = value.trim() !== ""; // Default: string fields
        }
  
        // Update `completedSections` based on completion status
        setCompletedSections((prevSections) => {
          if (isCompleted && !prevSections.includes(sectionName)) {
            return [...prevSections, sectionName];
          }
          if (!isCompleted && prevSections.includes(sectionName)) {
            return prevSections.filter((section) => section !== sectionName);
          }
          return prevSections;
        });
      }
  
      return updatedFormData;
    });
  };
  

  const handleDescriptionChange = (value: string) => {
    handleFieldChange("description", value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      handleFieldChange("coverImage", imageUrl);
    }
  };

  const removeImage = () => {
    handleFieldChange("coverImage", "");
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      const updatedTags = [...formData.tags, newTag];
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }));
      handleFieldChange("tags", updatedTags); // Call handleFieldChange with updated tags
      setTagInput("");
    }
  };
  
  const removeTag = (tag: string) => {
    const updatedTags = formData.tags.filter((t) => t !== tag);
    setFormData((prev) => ({
      ...prev,
      tags: updatedTags,
    }));
    handleFieldChange("tags", updatedTags); // Call handleFieldChange with updated tags
  };
  
  const handleTagSelect = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      const updatedTags = [...formData.tags, tag];
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }));
      handleFieldChange("tags", updatedTags); // Call handleFieldChange with updated tags
    }
  };
  
  // const handleFormSubmit = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setSuccessMessage("Project submitted successfully!");
  //     console.log("Form submitted:", formData);
  //   }, 2000);
  // };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Set loading state to true
    setSuccessMessage(""); // Clear previous success messages
  
    const apiUrl = "http://localhost:5000/api/projects"; // Replace with your API endpoint
  
    // Convert `formData` to `FormData` for multipart submission
    const multipartData = new FormData();
    multipartData.append("title", formData.projectTitle);
    multipartData.append("tags", JSON.stringify(formData.tags)); // Convert array to JSON string
    multipartData.append("level", formData.skillLevel);
    multipartData.append("description", formData.description);
  
    // Convert `coverImage` (blob URL) to a File object if available
    const coverImageInput = document.querySelector<HTMLInputElement>("#cover-image");
    if (coverImageInput?.files && coverImageInput.files[0]) {
      multipartData.append("cover_image", coverImageInput.files[0]); // File from the input
    }

    const token = localStorage.getItem("token");

  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: multipartData,
        headers: {
          // Add the Authorization header with Bearer token
          Authorization: token ? `Bearer ${token}` : "",
        }, // Send FormData directly
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit project");
      }
  
      const data = await response.json();
      setSuccessMessage("Project submitted successfully!");
      console.log("Form submitted:", data);
    } catch (error: any) {
      console.error("Error during submission:", error);
      alert(`Submission failed: ${error.message || "Unknown error occurred"}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen font-sans">
      {/* Header */}
      <Navbar2 level="+ New Project" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 py-12 px-6">
        {/* Sidebar */}
        <aside className="col-span-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sections</h2>
          <Checklist
            sections={sections}
            completedSections={completedSections}
            activeSection={activeSection}
            onSectionClick={setActiveSection}
          />
        </aside>

        {/* Form */}
        <section className="col-span-3 bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
          <div className="space-y-10">
            {/* Project Title */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-indigo-600">Project Title</h2>
              <input
                type="text"
                maxLength={100}
                placeholder="Enter your project title"
                value={formData.projectTitle}
                onChange={(e) => handleFieldChange("projectTitle", e.target.value)}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm border-gray-300 placeholder-gray-400"
                aria-label="Project Title"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.projectTitle.length}/100 characters
              </p>
            </div>

            {/* Tags */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-indigo-600">Tags</h2>
              <div className="mt-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInput}
                    placeholder="Add a tag"
                    className="flex-1 border rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
                    aria-label="Tag Input"
                  />
                  <button
                    onClick={addTag}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full shadow-sm flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        aria-label={`Remove ${tag}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Suggestions:</h3>
                  <div className="flex gap-2 mt-2">
                    {predefinedTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagSelect(tag)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.tags.includes(tag)
                            ? "bg-gray-300 text-gray-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        disabled={formData.tags.includes(tag)}
                        aria-label={`Select ${tag}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Level */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-indigo-600">Skill Level</h2>
              <div className="flex gap-4 mt-4">
                {["Easy", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="skillLevel"
                      value={level}
                      checked={formData.skillLevel === level}
                      onChange={(e) => handleFieldChange("skillLevel", e.target.value)}
                      className="form-radio text-indigo-600"
                      aria-label={level}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <label htmlFor="cover-image" className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <div className="mt-4">
                {formData.coverImage && (
                  <div className="relative">
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-md shadow-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm shadow-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  id="cover-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-4 block w-full py-2 px-3 text-sm text-gray-500 border rounded-md"
                  aria-label="Upload Cover Image"
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-indigo-600">Description</h2>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleDescriptionChange}
                className="mt-4"
                aria-label="Project Description"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.description.split(/\s+/).length} words
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              className={`bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-xl font-medium ${
                completedSections.length < sections.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-indigo-700 hover:to-purple-600"
              }`}
              disabled={completedSections.length < sections.length || loading}
              onClick={handleFormSubmit}
              aria-label="Save and Submit"
            >
              {loading ? "Submitting..." : "Save & Submit"}
            </button>
            {successMessage && (
              <p className="text-green-600 font-medium mt-4">{successMessage}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectCreationPage;
