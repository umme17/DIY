import { connectToDatabase } from '../config/dbConfig';
import { Project } from '../types/Project'; // Import the Project type from a separate file if needed
import { RowDataPacket } from 'mysql2';

// Create a new project in the database
export const createProjectInDb = async (user_id: string, project: Project) => {
    const { title, tags, level, description, cover_image } = project;

    try {
        const connection = await connectToDatabase();

        const query = `
            INSERT INTO projects (user_id, title, tags, level, cover_image, description)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Insert the project data into the database
        const [result] = await connection.query(query, [
            user_id,
            title,
            JSON.stringify(tags), // Store tags as JSON string
            level,
            cover_image,
            description,
        ]);

        const insertId = (result as any).insertId; // Get the auto-generated project_id

        // Release the connection and return the inserted project ID
        connection.release();
        return insertId;
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to create project');
    }
};

// Fetch a single project by ID
export const getProjectFromDb = async (project_id: string): Promise<Project | null> => {
    try {
        const connection = await connectToDatabase();

        const query = `
            SELECT project_id, title, tags, level, cover_image, description, createdBy
            FROM projects
            WHERE project_id = ?
        `;

        const [rows] = await connection.query(query, [project_id]);

        connection.release();

        if ((rows as any[]).length === 0) {
            return null; // Return null if no project is found
        }

        // Cast the result to the Project type
        return (rows as Project[])[0] || null;

    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to fetch project');
    }
};

// Fetch all projects

export const getAllProjectsFromDb = async (): Promise<any[]> => {
    try {
        const connection = await connectToDatabase();

        const query = `
            SELECT 
                p.project_id AS id,
                p.title,
                p.cover_image AS image,
                p.description,
                p.level,
                p.tags,
                COALESCE(SUM(r.reaction_type = 'like'), 0) AS likes, -- Count of likes
                COALESCE(SUM(r.reaction_type = 'view'), 0) AS views, -- Count of views
                COALESCE(COUNT(c.comment_id), 0) AS comments -- Count of comments
            FROM projects p
            LEFT JOIN reactions r ON p.project_id = r.target_id AND r.target_type = 'project'
            LEFT JOIN comments c ON p.project_id = c.target_id AND c.target_type = 'project'
            GROUP BY p.project_id;
        `;

        // Explicitly type `rows` as RowDataPacket[]
        const [rows] = await connection.query<RowDataPacket[]>(query);

        connection.release();

        return rows; // Return rows as an array of projects
    } catch (err) {
        console.error('Database error:', err);
        throw new Error('Failed to fetch projects');
    }
};
