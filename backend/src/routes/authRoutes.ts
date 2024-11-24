import express from 'express';
import { loginUser } from '../Controller/authController';

const router = express.Router();

// POST request to login a user
router.post('/login', loginUser);

export default router;
  