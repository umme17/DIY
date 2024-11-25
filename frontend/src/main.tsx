import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ProjectProvider } from './contexts/ProjectContext'; // Import the provider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider> {/* Wrap App with ProjectProvider */}
      <App />
    </ProjectProvider>
  </StrictMode>,
);
