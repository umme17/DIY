import express from 'express';
import { createProject, getProjectDetails } from '../Controller/projectController';
import upload from '../middleware/uploadMiddleware';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

// Route to create a new project (protected by authentication middleware)
router.post('/', authenticate, upload.single('cover_image'), createProject);
router.get('/:id', authenticate, getProjectDetails);

// Route to fetch all projects (uncomment when implemented)
// router.get('/', authenticate, getProjects);

export default router;
