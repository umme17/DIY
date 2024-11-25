import { Request, Response } from "express";
import { createForumInDb, getAllForumsFromDb, getForumByIdFromDb } from "../models/Forum";
import { Forum } from "../types/Forum";
import { v4 as uuidv4 } from "uuid";

// Extending Request to include `user` for authenticated routes
interface AuthRequest extends Request {
  user?: { id: string }; // Custom user property
}

// Create a new forum
export const createForum = async (req: AuthRequest, res: Response): Promise<void> => {
  const { topic, tags } = req.body;
  const forum_title = topic;

  // Get user_id from req.user (middleware should set this)
  const user_id = req.user?.id;

  // Validate input
  if (!user_id || !forum_title || !tags || !Array.isArray(tags)) {
    res.status(400).json({
      error: "Validation Error",
      message: "All fields are required: forum_title, user_id, and tags (as an array)",
    });
    return;
  }

  const forum: Forum = {
    forum_title,
    user_id,
    tags,
    created_at: new Date(), // Current timestamp
  };

  try {
    const insertId = await createForumInDb(forum);

    res.status(201).json({
      message: "Forum created successfully!",
      forum: { forum_id: insertId, ...forum },
    });
  } catch (err) {
    console.error("Error creating forum:", err);
    res.status(500).json({
      error: "Failed to create forum",
      details: (err as Error).message,
    });
  }
};

// Fetch all forums
export const getAllForums = async (_req: Request, res: Response): Promise<void> => {
  try {
    const forums = await getAllForumsFromDb();
    res.status(200).json({
      message: "Forums fetched successfully",
      forums,
    });
  } catch (err) {
    console.error("Error fetching forums:", err);
    res.status(500).json({
      error: "Failed to fetch forums",
      details: (err as Error).message,
    });
  }
};

// Fetch a single forum by ID with associated comments
export const getForumById = async (req: Request, res: Response): Promise<void> => {
  const forum_id = req.params.id;

  if (!forum_id) {
    res.status(400).json({
      error: "Validation Error",
      message: "Forum ID is required",
    });
    return;
  }

  try {
    // Fetch the forum and its comments
    const { forum, comments } = await getForumByIdFromDb(forum_id);

    if (!forum) {
      res.status(404).json({ message: "Forum not found" });
      return;
    }

    res.status(200).json({
      message: "Forum details fetched successfully",
      forum,
      comments,
    });
  } catch (err) {
    console.error("Error fetching forum by ID:", err);
    res.status(500).json({
      error: "Failed to fetch forum details",
      details: (err as Error).message,
    });
  }
};
