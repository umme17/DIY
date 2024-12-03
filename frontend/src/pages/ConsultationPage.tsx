import React, { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2";

// Consultation interface matching the backend structure
interface Consultation {
  consultation_id: number;
  topic: string;
  meet_link: string;
  date: string; // Date in 'YYYY-MM-DD' format
  time: string; // Time in 'HH:mm AM/PM' format
  description: string | null;
}

const ConsultationPage: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch consultations data from the server
  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/consultations/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Optional, if you use JWT authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch consultations");
      }

      const data = await response.json();
      setConsultations(data.consultations); // Set the fetched consultations to state
      console.log(data.consultations);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Error fetching consultations");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []); // Fetch consultations when the component mounts

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // returns current date in 'YYYY-MM-DD'
  };

  const categorizeConsultations = (consultations: Consultation[]) => {
    const currentDate = getCurrentDate();

 // Meetings scheduled for today (will include both upcoming and ended meetings for today)
 const today = consultations.filter(
  (consultation) => consultation.date === currentDate
);

// Upcoming meetings (those happening after today)
const upcoming = consultations.filter(
  (consultation) => consultation.date > currentDate
);

// Ended meetings (those happening before today)
const ended = consultations.filter(
  (consultation) => consultation.date < currentDate && consultation.date !== currentDate
);


    return { upcoming, today, ended };
  };

  const { upcoming, today, ended } = categorizeConsultations(consultations);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar2 level="+ Create Consultation" />

      <div className="max-w-7xl mx-auto p-6 mt-10">
        <p className="text-gray-600 text-center font-bold text-3xl mb-10">
          Browse through available consultations and join the meeting using the provided links.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-xl text-gray-500">Loading consultations...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <>
            {/* Today's Meetings Section (Top) */}
            {today.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-purple-600 mb-6">Today's Meetings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {today.map((consultation) => (
                    <div
                      key={consultation.consultation_id}
                      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-purple-600 mb-4">{consultation.topic}</h3>
                      <p className="text-gray-700 mb-4">{consultation.description}</p>
                      <p className="text-gray-600 mb-4">
                        <strong>Date:</strong> {consultation.date} <br />
                        <strong>Time:</strong> {consultation.time}
                      </p>
                      <a
                        href={consultation.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
                      >
                        Join Google Meet
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Meetings Section */}
            {upcoming.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-purple-600 mb-6">Upcoming Meetings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcoming.map((consultation) => (
                    <div
                      key={consultation.consultation_id}
                      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-purple-600 mb-4">{consultation.topic}</h3>
                      <p className="text-gray-700 mb-4">{consultation.description}</p>
                      <p className="text-gray-600 mb-4">
                        <strong>Date:</strong> {consultation.date} <br />
                        <strong>Time:</strong> {consultation.time}
                      </p>
                      <a
                        href={consultation.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
                      >
                        Join Google Meet
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ended Meetings Section */}
            {ended.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-purple-600 mb-6">Ended Meetings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ended.map((consultation) => (
                    <div
                      key={consultation.consultation_id}
                      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-purple-600 mb-4">{consultation.topic}</h3>
                      <p className="text-gray-700 mb-4">{consultation.description}</p>
                      <p className="text-gray-600 mb-4">
                        <strong>Date:</strong> {consultation.date} <br />
                        <strong>Time:</strong> {consultation.time}
                      </p>
                      <a
                        href={consultation.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
                      >
                        Join Google Meet
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultationPage;
