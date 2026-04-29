import * as projectRepo from './project.repository.js'

export const createProjectService = async (projectData: any) => {
    const {user_id, title, tags, level, description, cover_image} = projectData;

    if(!user_id || !title || !tags || !level || !description){
        throw new Error('Missing required fields');
    }

    try{
        const newProject = await projectRepo.createProject(projectData);
        return newProject;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export const getProjectsService = async (page: number, limit: number) => {
    try{
        return await projectRepo.getProjects(page, limit);
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export const getProjectByIdService = async (projectId: number) => {
    try{
        return await projectRepo.getProjectById(projectId);
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        throw error;
    }
}

export const deleteProjectService = async (projectId: number) => {
    try{
        await projectRepo.deleteProject(projectId);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}
