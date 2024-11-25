import { Router } from "express";
import { createComment, getComments, getCommentCount, getReplies } from "../Controller/commentController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// Create a comment for any target type
router.post("/", authenticate, createComment);

// Get comments for any target type
router.get("/", getComments);
router.get("/replies", getReplies);

// Get the total count of comments for any target type
router.get("/count", getCommentCount);

export default router;
