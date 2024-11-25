import express from 'express';
import { getUserInfo, registerUser } from '../Controller/userController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();



// Register a new user
router.post('/register', registerUser);
router.get('/:id', getUserInfo);

export default router;
