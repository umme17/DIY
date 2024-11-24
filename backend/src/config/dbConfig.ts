import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'diy_database',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

export const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database.');
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', (err as Error).message);
    throw new Error('Database connection failed');
  }
};
