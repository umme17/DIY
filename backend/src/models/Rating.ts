import { connectToDatabase } from "../config/dbConfig"; // Assuming `pool` is your database connection

export interface Rating {
  user_id: string;
  project_id: number;
  rating: number;
}

// Insert or update a rating
export const upsertRating = async (rating: Rating): Promise<Rating> => {

  const pool= await connectToDatabase();
  const query = `
    INSERT INTO ratings (user_id, project_id, rating)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = VALUES(rating);
  `;
  const values = [rating.user_id, rating.project_id, rating.rating];
  await pool.query(query, values);

  return rating;
};

// Get rating for a specific user and project
export const getUserRatingForProject = async (userId: string, projectId: number): Promise<number | null> => {
  const pool= await connectToDatabase();
  const query = `SELECT rating FROM ratings WHERE user_id = ? AND project_id = ?`;
  const [rows]: any = await pool.query(query, [userId, projectId]);

  return rows.length ? rows[0].rating : null;
};

// Get average rating for a project
export const getAverageRatingForProject = async (projectId: number): Promise<number> => {

  const pool= await connectToDatabase();
  const query = `SELECT AVG(rating) as avg_rating FROM ratings WHERE project_id = ?`;
  const [rows]: any = await pool.query(query, [projectId]);

  return rows[0].avg_rating || 0;
};
