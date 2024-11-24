// Define the structure of the Project data that will be passed to the model and controller
export interface Project {
    title: string;
    tags: string[]; // Tags can be an array of strings
    level: 'easy' | 'intermediate' | 'advanced'; // Level is a string with a set of possible values
    description: string;
    cover_image?: string | null; // Optional: The path to the cover image, can be null if no image is uploaded
}

// Define the structure of the AuthRequest which extends the default Express Request type
export interface AuthRequest extends Request {
    user?: { id: string }; // Attach user information (user ID) to the request object
}

// You can add more types as needed in this file to represent different entities in your app
