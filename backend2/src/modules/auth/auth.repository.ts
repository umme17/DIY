import {pool} from '../../config/db.js';
import type {User} from '../user/user.types.js';


export const createUser = async (firstName: string, lastName: string, email: string, password: string): Promise<User> => {

    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [firstName, lastName, email, password];

    const result = await pool.query(query, values);

    return result.rows[0];

}
