import { connectToDatabase } from "../config/dbConfig";

export interface Comment {
  comment_id?: number;
  target_id: number;
  target_type: "project" | "forum"; // Add other target types as needed
  parent_comment_id?: number | null;
  user_id: number;
  content: string;
  created_at?: string;
}

/**
 * Insert a new comment into the database.
 */
export const createCommentInDb = async (comment: Comment): Promise<Comment> => {
  try {
    const connection = await connectToDatabase();
    const query = `
      INSERT INTO comments (target_id, target_type, parent_comment_id, user_id, content)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(query, [
      comment.target_id,
      comment.target_type,
      comment.parent_comment_id || null,
      comment.user_id,
      comment.content,
    ]);

    const insertId = (result as any).insertId;

    connection.release();

    return { ...comment, comment_id: insertId };
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to create comment");
  }
};

/**
 * Fetch all comments for a specific target (project, forum, etc.), including replies.
 */
export const getCommentsByTarget = async (target_id: number, target_type: "project" | "forum"): Promise<Comment[]> => {
  try {
    const connection = await connectToDatabase();
    const query = `
      SELECT *
      FROM comments
      WHERE target_id = ? AND target_type = ?
      ORDER BY created_at ASC
    `;

    const [rows] = await connection.query(query, [target_id, target_type]);

    connection.release();

    return rows as Comment[];
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to fetch comments");
  }
};


/**
 * Get the total count of comments for a specific target.
 */
export const getCommentCountByTarget = async (target_id: number, target_type: "project" | "forum"): Promise<number> => {
  try {
    const connection = await connectToDatabase();
    const query = `
      SELECT COUNT(*) AS count
      FROM comments
      WHERE target_id = ? AND target_type = ?
    `;

    const [rows] = await connection.query(query, [target_id, target_type]);
    const count = (rows as any)[0]?.count || 0;

    connection.release();

    return count;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to get comment count");
  }
};


/**
 * Fetch all replies for a specific comment by comment_id.
 */
export const getRepliesByCommentId = async (comment_id: number): Promise<Comment[]> => {
  try {
    const connection = await connectToDatabase();
    const query = `
      SELECT *
      FROM comments
      WHERE parent_comment_id = ?
      ORDER BY created_at ASC
    `;

    const [rows] = await connection.query(query, [comment_id]);

    connection.release();

    return rows as Comment[];
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to fetch replies for the comment");
  }
};
