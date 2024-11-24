import { Request, Response } from 'express';
import { insertUser, findUserByEmail } from '../models/User';
import { User } from '../types/User';
import { v4 as uuidv4 } from 'uuid';

const bcrypt = require('bcrypt');


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  console.log("hello");
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
