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

function getAll(): ProjectData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ProjectData[];
  } catch {
    return [];
  }
}

function saveAll(projects: ProjectData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function listProjects(): ProjectData[] {
  return getAll().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getProject(id: string): ProjectData | undefined {
  return getAll().find((p) => p.id === id);
}

export function saveProject(project: ProjectData) {
  const all = getAll();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    all[idx] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    all.push({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  saveAll(all);
}

export function deleteProject(id: string) {
  const all = getAll().filter((p) => p.id !== id);
  saveAll(all);
}
