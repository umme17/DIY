import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectDetails,
} from "../Controller/projectController";
import upload from "../middleware/uploadMiddleware";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

// Create a new project (protected by authentication middleware)
router.post("/", authenticate, upload.single("cover_image"), createProject);

// Fetch all projects (protected by authentication middleware)
router.get("/all", authenticate, getAllProjects);

// Fetch a single project's details by ID (protected by authentication middleware)
router.get("/:id", authenticate, getProjectDetails);

export default router;
