import { Request, Response } from "express";
import { upsertRating, getUserRatingForProject, getAverageRatingForProject } from "../models/Rating";

interface AuthRequest extends Request {
  user?: { id: string }; // Authenticated user's ID
}

// Add or update a rating
export const addOrUpdateRating = async (req: AuthRequest, res: Response): Promise<void> => {

  const {target_id, rating } = req.body;
  const project_id = target_id;
  if (!req.user?.id || !project_id || !rating || rating < 1 || rating > 5) {
    res.status(400).json({ message: "Invalid or missing fields: user ID, project ID, or rating (1-5)" });
    return;
  }

  try {
    const newRating = await upsertRating({
      user_id: req.user.id,
      project_id,
      rating,
    });

    res.status(201).json({ message: "Rating added/updated successfully", rating: newRating });
  } catch (err) {
    console.error("Error adding/updating rating:", err);
    res.status(500).json({ message: "Failed to add/update rating", error: err.message });
  }
};

// Get the current user's rating for a project
export const getUserRating = async (req: AuthRequest, res: Response): Promise<void> => {
  const { project_id } = req.params;

  if (!req.user?.id || !project_id) {
    res.status(400).json({ message: "Missing required fields: user ID or project ID" });
    return;
  }

  try {
    const rating = await getUserRatingForProject(req.user.id, parseInt(project_id, 10));
    res.status(200).json({ rating });
  } catch (err) {
    console.error("Error fetching user rating:", err);
    res.status(500).json({ message: "Failed to fetch rating", error: err.message });
  }
};

// Get average rating for a project
export const getProjectAverageRating = async (req: Request, res: Response): Promise<void> => {
  const { project_id } = req.params;

  if (!project_id) {
    res.status(400).json({ message: "Missing project ID" });
    return;
  }

  try {
    const avgRating = await getAverageRatingForProject(parseInt(project_id, 10));
    const roundedValue = Math.round(avgRating);

    res.status(200).json({ average_rating: roundedValue});
  } catch (err) {
    console.error("Error fetching average rating:", err);
    res.status(500).json({ message: "Failed to fetch average rating", error: err.message });
  }
};
