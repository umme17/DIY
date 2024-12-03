import React, { useState } from "react";

// Simple regex for Google Meet link validation
const isValidMeetLink = (link: string) => {
  const regex = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/;
  return regex.test(link);
};

const ConsultationCreateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [topic, setTopic] = useState<string>("");
  const [meetLink, setMeetLink] = useState<string>("");
  const [date, setDate] = useState<string>(""); // Initially empty
  const [time, setTime] = useState<string>(""); // Initially empty  
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Check if all fields are filled
  const isFormValid = topic && meetLink && date && time && description;

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
    setDescription(event.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!isFormValid) {
      setError("All fields must be filled.");
      return;
    }
    
    // Validate Google Meet link
    if (!isValidMeetLink(meetLink)) {
      setError("Please provide a valid Google Meet link.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message

    const apiUrl = "http://localhost:5000/api/consultations/create"; // Your API endpoint

    const payload = {
      topic,
      meet_link: meetLink,
      date,
      time,
      description: description || "", // Ensure description is an empty string if not provided
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
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
      setDate("");
      setTime("");
      setDescription("");
      setSuccessMessage("");

      // Close the modal after successful submission
      onClose();
    } catch (error: any) {
      console.error("Error during submission:", error);
      setError(error.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTopic("");
    setMeetLink("");
    setDescription("");
    setError(null);
    setSuccessMessage("");
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[40%] shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        <h2 className="text-2xl text-purple-600 font-bold text-center mb-4">Create Consultation</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium mb-2 text-purple-600">
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
            <label htmlFor="description" className="block text-sm font-medium text-purple-600 mb-2">
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

          <div className="mb-4">
            <label htmlFor="meetLink" className="block text-sm font-medium text-purple-600 mb-2">
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
            <label htmlFor="date" className="block text-sm font-medium text-purple-600 mb-2">
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
            <label htmlFor="time" className="block text-sm font-medium text-purple-600 mb-2">
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
              disabled={loading || !isFormValid}
              className={`px-4 py-2 rounded-lg ${loading || !isFormValid ? "bg-gray-500" : "bg-purple-600 text-white hover:bg-purple-700"}`}
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
