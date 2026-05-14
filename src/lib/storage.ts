export interface ProjectData {
  id: string;
  name: string;
  description: string;
  objects: any[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'eduarch3d_projects';

function getProjects(): ProjectData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ProjectData[];
  } catch {
    return [];
  }
}

function setProjects(projects: ProjectData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function listProjects(): ProjectData[] {
  return getProjects();
}

export function getProject(id: string): ProjectData | undefined {
  return getProjects().find((p) => p.id === id);
}

export function saveProject(project: ProjectData) {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  setProjects(projects);
}

export function deleteProject(id: string) {
  const projects = getProjects().filter((p) => p.id !== id);
  setProjects(projects);
}

export function createProject(name: string, description: string = ''): ProjectData {
  const project: ProjectData = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
    name,
    description,
    objects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveProject(project);
  return project;
}
