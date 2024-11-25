import express from "express";
import { google } from "googleapis";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5173" // Replace with your redirect URI
);

// Route to generate a meeting
router.post("/schedule-meeting", async (req, res) => {
  try {
    const { startTime, endTime, summary, description, attendeeEmail } = req.body;

    // Authenticate (ensure token is available)
    oauth2Client.setCredentials({
      access_token: req.headers.authorization, // Frontend should pass access token
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Create a meeting
    const event = {
      summary,
      description,
      start: { dateTime: startTime, timeZone: "UTC" },
      end: { dateTime: endTime, timeZone: "UTC" },
      attendees: [{ email: attendeeEmail }],
      conferenceData: {
        createRequest: { requestId: "random-string" },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    res.status(200).json({ meetLink: response.data.hangoutLink });
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    res.status(500).json({ error: "Failed to schedule meeting." });
  }
});

export default router;
