import { pool } from '../../config/db.js';
export const createUser = async (firstName, lastName, email, password) => {
    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [firstName, lastName, email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
};
export const getAllUsers = async () => {
    const query = `SELECT * FROM users`;
    const result = await pool.query(query);
    return result.rows;
};
//# sourceMappingURL=user.repository.js.map