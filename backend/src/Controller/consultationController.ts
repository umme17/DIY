import { Request, Response } from "express";
import { createConsultationInDb, getAllConsultationsFromDb, getConsultationByIdFromDb } from "../models/consultation";
import { Consultation } from "../models/consultation";


// Create a new consultation
export const createConsultation = async (req: Request, res: Response): Promise<void> => {
  const { topic, meet_link, date, time, description } = req.body;

  // Validate input
  if (!topic || !meet_link || !date || !time) {
    res.status(400).json({
      error: "Validation Error",
      message: "All fields are required: topic, meet_link, date, time",
    });
    return;
  }

  const consultation: Consultation = {
    consultation_id: 0, // This will be auto-generated by the database
    topic,
    meet_link,
    date,
    time,
    description: description || null, // Optional field
    created_at: new Date().toISOString(), // Current timestamp
  };

  try {
    // Create the consultation in the DB and get the generated ID
    const insertId = await createConsultationInDb(consultation);

    // Set the generated consultation_id to the consultation object
    consultation.consultation_id = insertId;

    res.status(201).json({
      message: "Consultation created successfully!",
      consultation, // Now this includes the generated consultation_id
    });
  } catch (err) {
    console.error("Error creating consultation:", err);
    res.status(500).json({
      error: "Failed to create consultation",
      details: (err as Error).message,
    });
  }
};

// Fetch all consultations
export const getAllConsultations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const consultations = await getAllConsultationsFromDb();
    // console.log(consultations);
    res.status(200).json({
      message: "Consultations fetched successfully",
      consultations,
    });
  } catch (err) {
    console.error("Error fetching consultations:", err);
    res.status(500).json({
      error: "Failed to fetch consultations",
      details: (err as Error).message,
    });
  }
};

// Fetch a specific consultation by ID
export const getConsultationById = async (req: Request, res: Response): Promise<void> => {
  const consultation_id = parseInt(req.params.id, 10);

  if (!consultation_id) {
    res.status(400).json({
      error: "Validation Error",
      message: "Consultation ID is required",
    });
    return;
  }

  try {
    const consultation = await getConsultationByIdFromDb(consultation_id);

    if (!consultation) {
      res.status(404).json({ message: "Consultation not found" });
      return;
    }

    res.status(200).json({
      message: "Consultation details fetched successfully",
      consultation,
    });
  } catch (err) {
    console.error("Error fetching consultation by ID:", err);
    res.status(500).json({
      error: "Failed to fetch consultation details",
      details: (err as Error).message,
    });
  }
};