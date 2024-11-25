import { Router } from "express";
import { handleReaction, fetchReactionCounts } from "../Controller/reactionController";
import { authenticate } from "../middleware/authenticate"; // Ensure user is authenticated

const router = Router();

/**
 * Route to add or update a reaction.
 * POST /api/reactions
 */
router.post("/", authenticate, handleReaction);

/**
 * Route to fetch reaction counts for a target.
 * GET /api/reactions
 */
router.get("/", fetchReactionCounts);

export default router;
