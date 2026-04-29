import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import {AuthProvider} from "./contexts/AuthContext.tsx";

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

  return (
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
