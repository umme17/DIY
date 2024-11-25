import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";

const ConsultationPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate generating a Google Meet link
    const simulatedMeetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 7)}-${Math.random()
      .toString(36)
      .substring(2, 7)}-${Math.random().toString(36).substring(2, 5)}`;
    setMeetingLink(simulatedMeetLink);

    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar2 level="+ Consultation"/>

      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-4">Consultation Form</h1>
        <p className="text-gray-600 text-center mb-8">
          Fill out the form below to request a consultation.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                placeholder="Write your message here"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-purple-600">Thank You!</h2>
            <p className="text-gray-600">
              Your consultation request has been submitted. Join the meeting using the link below:
            </p>
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline hover:text-purple-800"
            >
              Join Google Meet
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationPage;
