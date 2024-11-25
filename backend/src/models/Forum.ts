import { connectToDatabase } from "../config/dbConfig"; // Assuming a common database connection function
import { Forum } from "../types/Forum"; // Importing the Forum type
import { RowDataPacket } from "mysql2";



interface Comment {
  comment_id: number;
  target_id: number;
  target_type: string;
  parent_comment_id: number | null;
  user_id: number;
  content: string;
  created_at: string;
}

// Create a new forum in the database
export const createForumInDb = async (forum: Forum): Promise<string> => {
  const {  forum_title, user_id, tags, created_at } = forum;

  try {
    const connection = await connectToDatabase();

    const query = `
      INSERT INTO forums ( forum_title, user_id, tags, created_at)
      VALUES (?, ?, ?, ?)
    `;

    // Insert the forum data into the database
    const [result] = await connection.query(query, [
      forum_title,
      user_id,
      JSON.stringify(tags), // Store tags as JSON string
      created_at,
    ]);

    const insertId = (result as any).insertId; // Retrieve the generated ID

    // Release the connection and return the ID
    connection.release();
    return insertId;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to create forum");
  }
};

// Fetch all forums with comment counts and user names
export const getAllForumsFromDb = async (): Promise<RowDataPacket[]> => {
  try {
    const connection = await connectToDatabase(); // Ensure this function is implemented correctly

    const query = `
      SELECT 
          f.forum_id,
          f.forum_title,
          f.user_id,
          CONCAT(u.first_name, ' ', u.last_name) AS user_name, -- Combine first and last names
          f.tags,
          f.created_at,
          COUNT(c.comment_id) AS comment_count
      FROM 
          forums f
      LEFT JOIN 
          comments c 
      ON 
          f.forum_id = c.target_id AND c.target_type = 'forum'
      LEFT JOIN 
          users u 
      ON 
          f.user_id = u.id
      GROUP BY 
          f.forum_id, f.forum_title, f.user_id, u.first_name, u.last_name, f.tags, f.created_at;
    `;

    // Execute the query
    const [rows] = await connection.query<RowDataPacket[]>(query);

    connection.release(); // Ensure the connection is released after the query

    return rows; // Return all forums with their comment counts and user names
  } catch (err) {
    console.error("Error fetching all forums with user names and comment counts:", err);
    throw new Error("Failed to fetch forums");
  }
};



// Fetch a forum by ID along with its comments
export const getForumByIdFromDb = async (forum_id: string): Promise<{ forum: Forum | null; comments: Comment[] }> => {
  try {
    const connection = await connectToDatabase();

    // Query to fetch the forum details
    const forumQuery = `
      SELECT forum_id, forum_title, user_id, tags, created_at
      FROM forums
      WHERE forum_id = ?
    `;
    const [forumRows] = await connection.query<RowDataPacket[]>(forumQuery, [forum_id]);

    // If no forum is found, return null with an empty comments array
    if (forumRows.length === 0) {
      return { forum: null, comments: [] };
    }

    const forum = forumRows[0] as Forum;

    // Query to fetch comments for the forum
    const commentsQuery = `
      SELECT comment_id, target_id, target_type, parent_comment_id, user_id, content, created_at
      FROM comments
      WHERE target_id = ? AND target_type = 'forum'
    `;
    const [commentRows] = await connection.query<RowDataPacket[]>(commentsQuery, [forum_id]);

    const comments = commentRows.map((row) => row as Comment);

    connection.release();

    // Return the forum and its associated comments
    return { forum, comments };
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to fetch forum and comments");
  }
};
