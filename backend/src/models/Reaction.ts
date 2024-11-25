import { connectToDatabase } from "../config/dbConfig";

interface Reaction {
  target_id: number;
  target_type: "project" | "comment" | "reply";
  user_id: number;
  reaction_type: "like" | "dislike" | "love";
}

/**
 * Add or update a reaction in the database.
 */
export const addOrUpdateReaction = async (reaction: Reaction): Promise<void> => {
  let connection;
  try {
    connection = await connectToDatabase(); // Establish database connection
    const query = `
      INSERT INTO reactions (target_id, target_type, user_id, reaction_type)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE reaction_type = VALUES(reaction_type)
    `;

    // Execute the query
    await connection.query(query, [
      reaction.target_id,
      reaction.target_type,
      reaction.user_id,
      reaction.reaction_type,
    ]);
  } catch (err) {
    console.error("Database error while adding/updating reaction:", err);
    throw new Error("Failed to add or update reaction");
  } finally {
    if (connection) connection.release(); // Ensure connection is released
  }
};

/**
 * Remove a reaction from the database.
 */
export const deleteReaction = async (
  target_id: number,
  target_type: string,
  user_id: number
): Promise<void> => {
  let connection;
  try {
    connection = await connectToDatabase();
    const query = `
      DELETE FROM reactions
      WHERE target_id = ? AND target_type = ? AND user_id = ?
    `;

    // Execute the query
    await connection.query(query, [target_id, target_type, user_id]);
  } catch (err) {
    console.error("Database error while deleting reaction:", err);
    throw new Error("Failed to delete reaction");
  } finally {
    if (connection) connection.release(); // Ensure connection is released
  }
};

/**
 * Fetch aggregated reaction counts for a specific target.
 */
export const getReactionCounts = async (
  target_id: number,
  target_type: string
): Promise<{ like: number; dislike: number; love: number }> => {
  let connection;
  try {
    connection = await connectToDatabase();
    const query = `
      SELECT reaction_type, COUNT(*) AS count
      FROM reactions
      WHERE target_id = ? AND target_type = ?
      GROUP BY reaction_type
    `;

    // Execute the query
    const [rows] = await connection.query(query, [target_id, target_type]);

    // Transform rows into an object with counts
    const counts = { like: 0, dislike: 0, love: 0 };
    (rows as { reaction_type: string; count: number }[]).forEach((row) => {
      if (row.reaction_type in counts) {
        counts[row.reaction_type as keyof typeof counts] = row.count;
      }
    });

    return counts;
  } catch (err) {
    console.error("Database error while fetching reaction counts:", err);
    throw new Error("Failed to fetch reaction counts");
  } finally {
    if (connection) connection.release(); // Ensure connection is released
  }
};
