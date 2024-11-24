import express from 'express';
import { registerUser } from '../Controller/userController';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

export default router;
