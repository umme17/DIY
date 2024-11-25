import { Request, Response } from 'express';
import { createProjectInDb, getProjectFromDb } from '../models/Project'; // Import the model function
import { getAllProjectsFromDb } from '../models/Project';
import path = require('path');

interface Project {
    title: string;
    tags: string[];
    level: 'easy' | 'intermediate' | 'advanced';
    description: string;
}

interface AuthRequest extends Request {
    user?: { id: string }; // Add `user` property to Request
}

// Create a new project
export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, tags, level, description } = req.body as Project;

    // Get user_id from req.user
    const user_id = req.user?.id;

    // Validate input
    if (!user_id || !title || !tags || tags.length === 0 || !level || !description) {
        res.status(400).json({
            error: 'Validation Error',
            message: 'All fields are required: user_id, title, tags (non-empty), level, and description',
        });
        return;
    }

    // Get only the file name if image is uploaded
    const cover_image = req.file ? req.file.filename : null;

    try {
        // Call the model function to insert the project into the database
        const insertId = await createProjectInDb(user_id, { title, tags, level, description, cover_image });

        // Respond with success message
        res.status(201).json({
            message: 'Project created successfully!',
            project: {
                id: insertId,
                user_id,
                title,
                tags,
                level,
                description,
                cover_image,
            },
        });
    } catch (err) {
        console.error('Error creating project:', err);

        res.status(500).json({
            error: 'Failed to create project',
            details: (err as Error).message,
        });
    }
};

export const getProjectDetails = async (req: AuthRequest, res: Response): Promise<void> => {
    const project_id = req.params.id;

    // Validate the project ID
    if (!project_id) {
        res.status(400).json({
            error: 'Validation Error',
            message: 'Project ID is required',
        });
        return;
    }

    try {
        // Fetch the project details from the database
        const project = await getProjectFromDb(project_id);

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        // Return the project details
        res.status(200).json({
            message: 'Project details fetched successfully',
            project,
        });
    } catch (err) {
        console.error('Error fetching project details:', err);
        res.status(500).json({
            error: 'Failed to fetch project details',
            details: (err as Error).message,
        });
    }
};



// Fetch all projects

export const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all projects from the database
        const projects = await getAllProjectsFromDb();
        // Return the formatted projects
        res.status(200).json({
            message: 'Projects fetched successfully',
            projects,
        });
    } catch (err) {
        console.error('Error fetching projects:', err);

        res.status(500).json({
            error: 'Failed to fetch projects',
            details: (err as Error).message,
        });
    }
};