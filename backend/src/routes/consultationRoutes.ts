import { Router } from "express";
import { createConsultation, getAllConsultations, getConsultationById } from "../Controller/consultationController";
import { authenticate } from "../middleware/authenticate"; // Optional, if you want authentication
console.log("sdjfslkfjslf")
const router = Router();
// Route to create a consultation
router.post("/create", authenticate, createConsultation);

// Route to fetch all consultations
router.get("/all", authenticate, getAllConsultations);

// Route to fetch a specific consultation by ID
router.get("/:id", authenticate, getConsultationById);

export default router;
