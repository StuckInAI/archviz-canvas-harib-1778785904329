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
const TUTORIAL_KEY = 'eduarch3d_tutorial_seen';

function getProjects(): ProjectData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setProjects(projects: ProjectData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadAllProjects(): ProjectData[] {
  return getProjects();
}

export function loadProject(id: string): ProjectData | undefined {
  return getProjects().find((p) => p.id === id);
}

export function saveProject(project: ProjectData) {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  setProjects(projects);
}

export function deleteProject(id: string) {
  const projects = getProjects().filter((p) => p.id !== id);
  setProjects(projects);
}

export function hasTutorialBeenSeen(): boolean {
  return localStorage.getItem(TUTORIAL_KEY) === 'true';
}

export function markTutorialSeen() {
  localStorage.setItem(TUTORIAL_KEY, 'true');
}
