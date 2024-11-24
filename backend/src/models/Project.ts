import { connectToDatabase } from '../config/dbConfig';
import { Project } from '../types/Project'; // Import the Project type from a separate file if needed

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



export const getProjectFromDb = async (project_id: string): Promise<Project | null> => {
    try {
        const connection = await connectToDatabase();

        const query = `
            SELECT project_id, title, tags, level, cover_image, description, createdBy, createdAt
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