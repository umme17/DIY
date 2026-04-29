// Define the structure of the Project data that will be passed to the model and controller
export type Project = {
    id:number;
    user_id: number; // Foreign key to the User who created the project
    title: string;
    tags: string[]; // Tags can be an array of strings
    level: 'Easy' | 'Intermediate' | 'Advanced'; // Level is a string with a set of possible values
    description: string;
    cover_image?: string | null; // Optional: The path to the cover image, can be null if no image is uploaded
    created_at: Date;
    updated_at: Date;
}