import { connectToDatabase } from "../config/dbConfig"; // Common DB connection function
import { RowDataPacket } from "mysql2";

// Define the Consultation interface
export interface Consultation {
  consultation_id: number;
  topic: string;
  meet_link: string;
  date: string;
  time: string;
  description: string | null;
  created_at: string;
}

// Create a new consultation in the database
export const createConsultationInDb = async (consultation: Consultation): Promise<number> => {
  const { topic, meet_link, date, time, description, created_at } = consultation;
  console.log(consultation);
  try {
    const connection = await connectToDatabase();
    const query = `
      INSERT INTO consultations (topic, meet_link, date, time, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(query, [
      topic,
      meet_link,
      date,
      time,
      description,
      created_at,
    ]);

    connection.release();
    return (result as any).insertId; // Return the generated ID for the consultation
  } catch (err) {
    console.error("Error creating consultation:", err);
    throw new Error("Failed to create consultation");
  }
};

// Fetch all consultations from the database
export const getAllConsultationsFromDb = async (): Promise<RowDataPacket[]> => {
  try {
    const connection = await connectToDatabase();
    const query = `
      SELECT consultation_id, topic, meet_link, date, time, description, created_at
      FROM consultations
    `;
    const [rows] = await connection.query<RowDataPacket[]>(query);
    connection.release();
    console.log(rows);
    return rows;
  } catch (err) {
    console.error("Error fetching consultations:", err);
    throw new Error("Failed to fetch consultations");
  }
};

// Fetch a consultation by its ID
export const getConsultationByIdFromDb = async (consultation_id: number): Promise<Consultation | null> => {
  try {
    const connection = await connectToDatabase();
    const query = `
      SELECT consultation_id, topic, meet_link, date, time, description, created_at
      FROM consultations
      WHERE consultation_id = ?
    `;
    const [rows] = await connection.query<RowDataPacket[]>(query, [consultation_id]);
    connection.release();
    return rows.length > 0 ? (rows[0] as Consultation) : null;
  } catch (err) {
    console.error("Error fetching consultation by ID:", err);
    throw new Error("Failed to fetch consultation");
  }
};
