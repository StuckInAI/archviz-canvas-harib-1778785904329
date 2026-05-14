import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, FolderOpen, BookOpen } from 'lucide-react';
import { listProjects, deleteProject, saveProject, ProjectData } from '@/lib/storage';
import { SAMPLE_OBJECTS } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(listProjects());
  }, []);

  function handleNew() {
    const id = uuidv4();
    const project: ProjectData = {
      id,
      name: 'Untitled Project',
      description: '',
      objects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
    navigate(`/editor/${id}`);
  }

  function handleSample() {
    const id = uuidv4();
    const project: ProjectData = {
      id,
      name: 'Sample Building',
      description: 'A sample project with basic elements',
      objects: SAMPLE_OBJECTS,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
    setProjects(listProjects());
    navigate(`/editor/${id}`);
  }

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(listProjects());
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏗️ EduArch3D</h1>
          <p className={styles.subtitle}>Your architectural design projects</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.newBtn} onClick={handleNew}>
            <Plus size={18} /> New Project
          </button>
          <button className={styles.sampleBtn} onClick={handleSample}>
            <BookOpen size={18} /> Sample Project
          </button>
        </div>

        <div className={styles.grid}>
          {projects.length === 0 && (
            <div className={styles.empty}>
              <p>No projects yet. Create one to get started!</p>
            </div>
          )}
          {projects.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.name}</h3>
                <p className={styles.cardMeta}>
                  {p.objects.length} objects •{' '}
                  {new Date(p.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.openBtn}
                  onClick={() => navigate(`/editor/${p.id}`)}
                >
                  <FolderOpen size={14} /> Open
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
