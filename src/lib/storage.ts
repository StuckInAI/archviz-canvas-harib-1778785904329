import { Project } from '@/types';

const PROJECTS_KEY = 'eduarch3d_projects';
const TUTORIAL_KEY = 'eduarch3d_tutorial_seen';

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (raw) {
      return JSON.parse(raw) as Project[];
    }
  } catch (e) {
    console.error('Failed to load projects', e);
  }
  return [];
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
}

export function loadProject(id: string): Project | undefined {
  const all = loadProjects();
  return all.find((p) => p.id === id);
}

export function saveProject(project: Project): void {
  const all = loadProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    all[idx] = project;
  } else {
    all.push(project);
  }
  saveProjects(all);
}

export function deleteProject(id: string): void {
  const all = loadProjects();
  saveProjects(all.filter((p) => p.id !== id));
}

export function hasTutorialBeenSeen(): boolean {
  return localStorage.getItem(TUTORIAL_KEY) === 'true';
}

export function markTutorialSeen(): void {
  localStorage.setItem(TUTORIAL_KEY, 'true');
}
