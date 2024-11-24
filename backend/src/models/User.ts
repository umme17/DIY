import { connectToDatabase } from '../config/dbConfig';
import { User } from '../types/User';

export const insertUser = async (user: User): Promise<void> => {
  try {
    const connection = await connectToDatabase();

    const query = `
      INSERT INTO users (id, first_name, last_name, email, password_hash, age)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(query, [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.password_hash,
      user.age,
    ]);

    console.log('User added successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error inserting data:', (err as Error).message);
    throw new Error('Database insert error');
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const connection = await connectToDatabase();

    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.execute(query, [email]);

    connection.release();
    return (rows as User[])[0] || null;
  } catch (err) {
    console.error('Error retrieving user:', (err as Error).message);
    throw new Error('Database retrieval error');
  }
};
