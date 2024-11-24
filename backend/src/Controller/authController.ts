import { Request, Response } from 'express';
import { findUserByEmail } from '../models/User'; // Assume this function fetches the user by email from the database
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate JWT token with expiration
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Token payload
      process.env.JWT_SECRET as string, // Secret key
      { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Set token in the response header or as a cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 3600 * 1000, // 1 hour
    });

    // Respond with success message
    res.status(200).json({
      message: 'Login successful',
      token, // Optional: Include token in the response body
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      message: 'Error during login',
      error: (err as Error).message,
    });
  }
};
