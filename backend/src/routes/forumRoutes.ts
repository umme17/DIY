import { Router } from "express";
import { createForum, getAllForums, getForumById } from "../Controller/forumController";
import { authenticate } from "../middleware/authenticate";

const router = Router();
// Route to create a forum
router.post("/create",authenticate, createForum);

// Route to fetch all forums
router.get("/all",authenticate, getAllForums);

// Route to fetch a specific forum by ID
router.get("/:id",authenticate, getForumById);

export default router;
