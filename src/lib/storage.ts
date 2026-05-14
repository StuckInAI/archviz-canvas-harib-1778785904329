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

function setAllProjects(projects: ProjectData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function listProjects(): ProjectData[] {
  return getAllProjects().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getProject(id: string): ProjectData | undefined {
  return getAllProjects().find((p) => p.id === id);
}

export function saveProject(project: ProjectData) {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  setAllProjects(projects);
}

export function deleteProject(id: string) {
  const projects = getAllProjects().filter((p) => p.id !== id);
  setAllProjects(projects);
}

export function createProject(name: string, description: string = ''): ProjectData {
  const project: ProjectData = {
    id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    name,
    description,
    objects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveProject(project);
  return project;
}
