import { Router } from "express";
import {
  addOrUpdateRating,
  getUserRating,
  getProjectAverageRating,
} from "../Controller/ratingController";
import { authenticate } from "../middleware/authenticate"; // Assuming you have authentication middleware

const router = Router();

// Add or update a rating
router.post("/", authenticate, addOrUpdateRating);

// Get the current user's rating for a project
router.get("/:project_id", authenticate, getUserRating);

// Get the average rating for a project
router.get("/average/:project_id",authenticate, getProjectAverageRating);

export default router;
