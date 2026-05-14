import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { loadProjects, deleteProject, saveProject } from '@/lib/storage';
import { SAMPLE_OBJECTS } from '@/lib/sampleProjects';
import { Project } from '@/types';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  function handleNew() {
    const id = uuidv4();
    const project: Project = {
      id,
      name: 'New Project',
      description: '',
      objects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
    navigate(`/editor/${id}`);
  }

  function handleLoadSample() {
    const id = uuidv4();
    const project: Project = {
      id,
      name: 'Sample House',
      description: 'A sample project with walls and floor',
      objects: [...SAMPLE_OBJECTS],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
    setProjects(loadProjects());
    navigate(`/editor/${id}`);
  }

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(loadProjects());
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          <span>Home</span>
        </button>
        <h1 className={styles.title}>My Projects</h1>
        <div className={styles.headerActions}>
          <button className={styles.sampleBtn} onClick={handleLoadSample}>
            Load Sample
          </button>
          <button className={styles.newBtn} onClick={handleNew}>
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.length === 0 && (
          <div className={styles.empty}>
            <p>No projects yet. Create a new one or load a sample!</p>
          </div>
        )}
        {projects.map((p) => (
          <div key={p.id} className={styles.card}>
            <div
              className={styles.cardBody}
              onClick={() => navigate(`/editor/${p.id}`)}
            >
              <h3 className={styles.cardTitle}>{p.name}</h3>
              <p className={styles.cardMeta}>
                {p.objects.length} objects · Updated{' '}
                {new Date(p.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.cardActions}>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(p.id)}
                title="Delete project"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
