import React, { useState } from "react";

const ConsultationCreateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [topic, setTopic] = useState<string>("");
  const [meetLink, setMeetLink] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState<string>("10:00 AM");
  const [description, setDescription] = useState<string>(""); // New state for description
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleMeetLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetLink(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value); // Update description state
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Set loading state to true
    setError(null); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    const apiUrl = "http://localhost:5000/api/consultations"; // Replace with your API endpoint

    // Create FormData to send as multipart data (if needed)
    const multipartData = new FormData();
    multipartData.append("topic", topic);
    multipartData.append("meet_link", meetLink);
    multipartData.append("date", date);
    multipartData.append("time", time);
    multipartData.append("description", description); // Add description to the data

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: multipartData,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create consultation");
      }

      const data = await response.json();
      setSuccessMessage("Consultation created successfully!");
      console.log("Consultation created:", data);

      // Reset form data after successful submission
      setTopic("");
      setMeetLink("");
      setDate(new Date().toISOString().split("T")[0]);
      setTime("10:00 AM");
      setDescription(""); // Reset description

      // Close the modal after successful submission
      onClose();
    } catch (error: any) {
      console.error("Error during submission:", error);
      setError(error.message || "Unknown error occurred");
    } finally {
      setLoading(false); // Stop loading after the process finishes
    }
  };

  const handleClose = () => {
    setTopic("");
    setMeetLink("");
    setError(null);
    setSuccessMessage("");
    setLoading(false);
    setDescription(""); // Reset description
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center mb-4">Create Consultation</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic/Title
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={handleTopicChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter the consultation topic"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="meetLink" className="block text-sm font-medium text-gray-700 mb-2">
              Google Meet Link
            </label>
            <input
              id="meetLink"
              type="text"
              value={meetLink}
              onChange={handleMeetLinkChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Paste Google Meet link here"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter a brief description for the consultation"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg ${loading ? "bg-gray-500" : "bg-purple-600 text-white hover:bg-purple-700"}`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationCreateModal;
