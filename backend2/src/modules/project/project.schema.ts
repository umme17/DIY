import {z} from 'zod';

export const ProjectSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    title: z.string().max(200),
    tags: z.array(z.string()).max(10),
    level: z.enum(['Easy', 'Intermediate', 'Advanced']),
    description: z.string().max(500),
    cover_image: z.string().url("Invalid image URL").nullable(),    
    created_at: z.date(),
    updated_at: z.date(),
});


export const CreateProjectSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string().max(200),
  tags: z.array(z.string()).max(10),
  level: z.enum(['Easy', 'Intermediate', 'Advanced']),
  description: z.string().max(500),
  cover_image: z.string().url("Invalid image URL").optional(), // Optional: The path to the cover image, can be null if no image is uploaded
});


export const UpdateProjectSchema = z.object({
  title: z.string().max(200).optional(),
  tags: z.array(z.string()).max(10).optional(),
  level: z.enum(['Easy', 'Intermediate', 'Advanced']).optional(),
  description: z.string().max(500).optional(),
  cover_image: z.string().url("Invalid image URL").optional(), // Optional: The path to the cover image, can be null if no image is uploaded
});




