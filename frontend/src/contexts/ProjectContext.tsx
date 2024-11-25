import React, { createContext, useContext, useState } from "react";

interface Project {
  id: string;
  title: string;
  tags: string[];
  level: string;
  cover_image: string;
  description: string;
}

interface ProjectContextType {
  cachedProjects: Record<string, Project>;
  setCachedProject: (id: string, project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cachedProjects, setCachedProjects] = useState<Record<string, Project>>({});

  const setCachedProject = (id: string, project: Project) => {
    setCachedProjects((prev) => ({ ...prev, [id]: project }));
  };

  return (
    <ProjectContext.Provider value={{ cachedProjects, setCachedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
