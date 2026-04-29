import * as projectService from './project.service.js';
import type {Request, Response, NextFunction} from 'express';
import { CreateProjectSchema } from './project.schema.js';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    const {user_id, title, tags, level, description, cover_image} = CreateProjectSchema.parse(req.body);
    try{
        const newProject = await projectService.createProjectService({user_id, title, tags, level, description, cover_image});
        res.status(201).json(newProject);
    }catch(error){
        next(error);
    }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    try{
        const result = await projectService.getProjectsService(page, limit);
        res.json(result);
    }catch(error){
        next(error);
    }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    const projectId = parseInt(req.params.id as string);
    try{
        const project = await projectService.getProjectByIdService(projectId);
        res.json(project);
    }catch(error){
        next(error);
    }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const projectId = parseInt(req.params.id as string);  
    try{
        await projectService.deleteProjectService(projectId);
        res.status(204).send();
    }   catch(error){
        next(error);
    }
};