import {pool} from '../../config/db.js';
import type {User} from './user.types.js';


export const getAllUsers = async () : Promise <User[]> => {
    const query = `SELECT * FROM users`;
    const result = await pool.query(query);
    return result.rows;
}

export const findUserByEmail = async(email:string) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const value = [email];
    const result = await pool.query(query,value);
    return result.rows[0];
}
