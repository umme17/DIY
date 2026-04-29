import {pool} from '../../config/db.js';
import { z } from 'zod';
import {CreateProjectSchema,UpdateProjectSchema} from './project.schema.js';

export const createProject = async (projectData: z.infer<typeof CreateProjectSchema>) => {
    const query = `InSERT INTO projects (user_id, title, tags, level, description, cover_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [projectData.user_id, projectData.title, projectData.tags, projectData.level, projectData.description, projectData.cover_image];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export const getProjects = async (page:number, limit: number) => {
    const offset = (page - 1) * limit;
    try{
        const query = ` SELECT * FROM projects ORDER BY id DESC LIMIT $1 OFFSET $2`;
        const values = [limit, offset];
        const result = await pool.query(query, values);

        const countQuery = `SELECT COUNT(*) FROM projects`;
        const countResult = await pool.query(countQuery);
        const totalProjects = parseInt(countResult.rows[0].count);
        return {
            projects: result.rows,
            metadata: {
                totalCount: totalProjects,
                totalPages: Math.ceil(totalProjects / limit),
                currentPage: page,
            }
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export const getProjectById = async (projectId: number) => {
    try {
        const query = `SELECT * FROM projects WHERE id = $1`;
        const values = [projectId];
        const result = await pool.query(query, values);
        if(result.rows.length === 0){
            throw new Error('Project not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        throw error;
    }
}

export const deleteProject = async (projectId: number) => {
    try{
        const query = `DELETE FROM projects WHERE id = $1`;
        const values = [projectId];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}