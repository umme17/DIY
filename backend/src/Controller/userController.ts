import { Request, Response } from 'express';
import { insertUser, findUserByEmail, findUserById } from '../models/User';
import { User } from '../types/User';
import { v4 as uuidv4 } from 'uuid';

const bcrypt = require('bcrypt');

interface AuthRequest extends Request {
  user?: { id: string }; // Add `user` property to Request
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password, age } = req.body;

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Create the user
    const user: User = {
      id: uuidv4(),
      first_name,
      last_name,
      email,
      password_hash,
      age,
    };

    await insertUser(user);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: (err as Error).message });
  }
};


export const getUserInfo = async (req: AuthRequest, res: Response): Promise<void> => {

  const user_id = req.params.id;// Prefer user from middleware if available

  if (!user_id) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    const user = await findUserById(user_id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error in getUserInfo:', err);
    res.status(500).json({ message: 'Error fetching user information', error: (err as Error).message });
  }
};
