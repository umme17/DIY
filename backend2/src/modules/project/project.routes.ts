import {Router} from 'express';
import * as projectController from './project.controller.js';
import {authMiddleware} from '../../middlewares/auth.middleware.js';

const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.post('/', projectController.createProject);
projectRouter.get('/', projectController.getProjects);
projectRouter.get('/:id', projectController.getProjectById);
projectRouter.delete('/:id', projectController.deleteProject);

export default projectRouter;