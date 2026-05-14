import { Project, SceneObject } from '@/types';

const PROJECTS_KEY = 'eduarch3d_projects';

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveProject(project: Project): void {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = loadProjects().filter((p) => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function loadProject(id: string): Project | undefined {
  return loadProjects().find((p) => p.id === id);
}

export function createProject(name: string, description: string, objects: SceneObject[] = []): Project {
  const { v4: uuidv4 } = require('uuid') as { v4: () => string };
  const project: Project = {
    id: uuidv4(),
    name,
    description,
    objects,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveProject(project);
  return project;
}
