import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AllProjectContext } from './contexts/ProjectContext';

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

const RootComponent = () => {
  // Initialize projects state as null
  const [projects, setProjects] = useState<Project[] | null>(null);

  return (
    <AllProjectContext.Provider value={{ projects, setProjects }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AllProjectContext.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
