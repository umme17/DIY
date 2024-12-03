import { createContext } from 'react';

interface Project {
  id: number;
  image: string;
  level:string;
  title: string;
  description: string;
  rating: number;
  views: number;
  likes: number;
  comments: number;
  tags?: string[];
  difficulty?: string;
}

interface ProjectContextType {
  projects: Project[] | null; // Start with an empty array
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;

}

export const AllProjectContext = createContext<ProjectContextType | null>(null);
