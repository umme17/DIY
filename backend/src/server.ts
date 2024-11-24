import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import { Server } from "socket.io";


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Update this to match your frontend's origin
    credentials: true,
  })
);

app.use(express.json());
// app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
