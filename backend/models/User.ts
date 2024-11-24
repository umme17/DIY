import { connectToDatabase } from '../src/config/dbConfig.js';

export const insertUser = async (user) => {
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
    connection.end();
  } catch (err) {
    console.error('Error inserting data:', err.message);
  }
};

export const getAllUsers = async () => {
  try {
    const connection = await connectToDatabase();

    const query = 'SELECT * FROM users';
    const [rows] = await connection.execute(query);

    connection.end();
    return rows;
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    return [];
  }
};
