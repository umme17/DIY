import { Request, Response } from "express";
import { createCommentInDb, getCommentCountByTarget, getCommentsByTarget, getRepliesByCommentId } from "../models/Comment";
import { Server } from "socket.io";

interface AuthRequest extends Request {
  user?: { id: number }; // Authenticated user's ID
}

/**
 * Helper function to broadcast updates via WebSocket.
 */
const broadcastCommentUpdate = (io: Server, targetType: string, targetId: number, comment: any): void => {
  io.emit(`${targetType}_${targetId}_comments`, comment);
};

/**
 * Create a new comment for any target type (project, forum, etc.).
 */
export const createComment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { target_id, target_type, content, parent_comment_id } = req.body;
  if (!req.user?.id || !target_id || !target_type || !content) {
    res.status(400).json({ message: "Missing required fields: user ID, target ID, target type, or content" });

    return;
  }

  const newComment = {
    target_id,
    target_type,
    parent_comment_id: parent_comment_id || null,
    user_id: req.user.id,
    content,
  };

  try {
    // Insert the comment into the database
    const createdComment = await createCommentInDb(newComment);

    // Broadcast the new comment via WebSocket
    const io = req.app.get("io") as Server;
    broadcastCommentUpdate(io, target_type, target_id, createdComment);

    // Send the response
    res.status(201).json({ message: "Comment created successfully", comment: createdComment });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Failed to create comment", error: err.message });
  }
};

/**
 * Get all comments for any target type (project, forum, etc.).
 */
export const getComments = async (req: Request, res: Response): Promise<void> => {

  const target_id = parseInt(req.query.target_id as string, 10);
  const target_type = req.query.target_type as "project" | "forum";


  if (isNaN(target_id) || !target_type) {
    res.status(400).json({ message: "Invalid or missing target ID or target type" });
    return;
  }

  try {
    // Fetch comments from the database
    const comments = await getCommentsByTarget(target_id, target_type);

    // Send the response
    res.status(200).json({ comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};


/**
 * Get the total count of comments for a specific target.
 */
export const getCommentCount = async (req: Request, res: Response): Promise<void> => {
  const target_id = parseInt(req.query.target_id as string, 10);
  const target_type = req.query.target_type as "project" | "forum";


 if (isNaN(target_id) || !target_type) {
    res.status(400).json({ message: "Invalid or missing target ID or target type" });
    return;
  } 

  try {
    // Fetch the total comment count from the database
    const count = await getCommentCountByTarget(target_id, target_type);

    // Send the response
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching comment count:", err);
    res.status(500).json({ message: "Failed to fetch comment count", error: err.message });
  }
};


export const getReplies = async (req: Request, res: Response): Promise<void> => {
  const comment_id = parseInt(req.query.comment_id as string, 10);

  if (isNaN(comment_id)) {
    res.status(400).json({ message: "Invalid or missing comment ID" });
    return;
  }

  try {
    // Fetch replies from the database
    const replies = await getRepliesByCommentId(comment_id);

    // Send the response
    res.status(200).json({ replies });
  } catch (err) {
    console.error("Error fetching replies:", err);
    res.status(500).json({ message: "Failed to fetch replies", error: err.message });
  }
};
