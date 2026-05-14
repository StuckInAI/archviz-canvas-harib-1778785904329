import { SceneObject } from '@/types';

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  objects: SceneObject[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'eduarch3d_projects';

function getAllProjects(): ProjectData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ProjectData[];
  } catch {
    return [];
  }
}

function saveAllProjects(projects: ProjectData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjects(): ProjectData[] {
  return getAllProjects();
}

export function getProject(id: string): ProjectData | undefined {
  return getAllProjects().find((p) => p.id === id);
}

export function saveProject(project: ProjectData) {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  saveAllProjects(projects);
}

export function deleteProject(id: string) {
  const projects = getAllProjects().filter((p) => p.id !== id);
  saveAllProjects(projects);
}
