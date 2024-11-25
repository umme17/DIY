import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; // Import HTTP server to wrap Express
import { Server } from "socket.io"; // Import socket.io

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import commentRoutes from "./routes/commentRoutes";
import reactionRoutes from "./routes/reactionRoutes";
import path from "path";
import ratingsRoutes from "./routes/ratingsRoutes";
import forumRoutes from "./routes/forumRoutes";
import infoRoutes from "./routes/infoRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const httpServer = createServer(app); // Wrap the Express app with HTTP server

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Update this to match your frontend's origin
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Update this to match your frontend's origin
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
// app.use("/api/projects/all", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/info", infoRoutes);
// Attach the io instance to the app for access in controllers
app.set("io", io);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Define custom WebSocket event listeners
  socket.on("reactionUpdated", (data) => {
    console.log("Reaction update event received:", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
