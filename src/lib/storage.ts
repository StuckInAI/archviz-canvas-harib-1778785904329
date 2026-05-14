import { v4 as uuidv4 } from 'uuid';

export interface SceneObjectData {
  id: string;
  assetId: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  materialId: string;
  visible: boolean;
}

const STORAGE_KEY = 'eduarch3d_projects';

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  objects: SceneObjectData[];
  createdAt: string;
  updatedAt: string;
}

function loadAllProjects(): ProjectData[] {
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

export function listProjects(): ProjectData[] {
  return loadAllProjects().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getProject(id: string): ProjectData | undefined {
  return loadAllProjects().find((p) => p.id === id);
}

export function createProject(name: string): ProjectData {
  const projects = loadAllProjects();
  const newProject: ProjectData = {
    id: uuidv4(),
    name,
    description: '',
    objects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  saveAllProjects(projects);
  return newProject;
}

export function saveProject(project: ProjectData) {
  const projects = loadAllProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  saveAllProjects(projects);
}

export function deleteProject(id: string) {
  const projects = loadAllProjects().filter((p) => p.id !== id);
  saveAllProjects(projects);
}
