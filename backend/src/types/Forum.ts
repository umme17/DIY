// Extended Request type for authenticated routes (specific to Forum)
import { Request } from "express";
// Type for a Forum
export interface Forum {
  forum_title: string; // Title of the forum
  user_id: string; // ID of the user who created the forum
  tags: string[]; // Array of tags for the forum
  created_at: Date; // Timestamp of forum creation
}

export interface ForumAuthRequest extends Request {
  user?: { id: string }; // Authenticated user information
}