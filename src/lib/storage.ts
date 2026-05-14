import { SceneObject } from '@/types';

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  objects: SceneObject[];
  createdAt: string;
  updatedAt: string;
}

const PROJECTS_KEY = 'eduarch3d_projects';

function getAll(): ProjectData[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function persist(projects: ProjectData[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function listProjects(): ProjectData[] {
  return getAll();
}

export function getProject(id: string): ProjectData | undefined {
  return getAll().find((p) => p.id === id);
}

export function saveProject(project: ProjectData) {
  const all = getAll();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    all[idx] = project;
  } else {
    all.push(project);
  }
  persist(all);
}

export function deleteProject(id: string) {
  const all = getAll().filter((p) => p.id !== id);
  persist(all);
}
