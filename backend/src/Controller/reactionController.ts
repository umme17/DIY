import { Request, Response } from "express";
import { addOrUpdateReaction, deleteReaction, getReactionCounts } from "../models/Reaction";

interface AuthRequest extends Request {
  user?: { id: number }; // Authenticated user's ID
}

/**
 * Add or update a reaction.
 */
export const handleReaction = async (req: AuthRequest, res: Response): Promise<void> => {
  const { target_id, target_type, reaction_type } = req.body;

  // Validate inputs
  if (!req.user?.id || !target_id || !target_type) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const validReactions = ["like", "dislike", "love"];
  if (reaction_type && !validReactions.includes(reaction_type)) {
    res.status(400).json({ message: "Invalid reaction type" });
    return;
  }

  try {
    if (!reaction_type) {
      // Remove the reaction if reaction_type is null
      await deleteReaction(target_id, target_type, req.user.id);
    } else {
      // Add or update the reaction
      await addOrUpdateReaction({
        target_id,
        target_type,
        user_id: req.user.id,
        reaction_type,
      });
    }

    // Fetch updated reaction counts
    const counts = await getReactionCounts(target_id, target_type);

    res.status(200).json({ counts });
  } catch (err) {
    console.error("Error handling reaction:", err);
    res.status(500).json({ message: "Failed to handle reaction" });
  }
};

/**
 * Fetch reaction counts for a specific target.
 */
export const fetchReactionCounts = async (req: Request, res: Response): Promise<void> => {
  const { target_id, target_type } = req.query;

  // Validate inputs
  if (!target_id || !target_type) {
    res.status(400).json({ message: "Missing target_id or target_type" });
    return;
  }

  try {
    // Fetch the reaction counts
    const counts = await getReactionCounts(Number(target_id), String(target_type));

    res.status(200).json({ counts });
  } catch (err) {
    console.error("Error fetching reaction counts:", err);
    res.status(500).json({ message: "Failed to fetch reaction counts" });
  }
};
