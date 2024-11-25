import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { id: string, email: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // Log the authorization header for debugging


  // Extract the token from "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  // Log the extracted token for debugging

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'Token is missing' });
    return; // Ensure the function exits without calling next()
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Forbidden', message: 'Invalid token' });
      return; // Ensure the function exits without calling next()
    }

    req.user = decoded as { id: string, email: string }; // Attach user data to the request
    next(); // Call the next middleware or route handler
  });
};
