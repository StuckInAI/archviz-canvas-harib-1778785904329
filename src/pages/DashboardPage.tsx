import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, FolderOpen, Building2 } from 'lucide-react';
import { getProjects, deleteProject, saveProject, ProjectData } from '@/lib/storage';
import { SAMPLE_OBJECTS } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  function handleNew() {
    const id = uuidv4();
    const now = new Date().toISOString();
    saveProject({
      id,
      name: 'Untitled Project',
      description: '',
      objects: [],
      createdAt: now,
      updatedAt: now,
    });
    navigate(`/editor/${id}`);
  }

  function handleSample() {
    const id = uuidv4();
    const now = new Date().toISOString();
    saveProject({
      id,
      name: 'Sample Project',
      description: 'A sample project with basic elements',
      objects: SAMPLE_OBJECTS,
      createdAt: now,
      updatedAt: now,
    });
    setProjects(getProjects());
    navigate(`/editor/${id}`);
  }

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(getProjects());
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Building2 size={24} />
          <span className={styles.brandName}>EduArch3D</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.actions}>
          <button className={styles.newBtn} onClick={handleNew}>
            <Plus size={18} /> New Project
          </button>
          <button className={styles.sampleBtn} onClick={handleSample}>
            <FolderOpen size={18} /> Sample Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className={styles.empty}>
            <p>No projects yet. Create a new one or load a sample!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((p) => (
              <div key={p.id} className={styles.card}>
                <div
                  className={styles.cardBody}
                  onClick={() => navigate(`/editor/${p.id}`)}
                >
                  <h3 className={styles.cardTitle}>{p.name}</h3>
                  <p className={styles.cardMeta}>
                    {p.objects.length} objects •{' '}
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(p.id)}
                  title="Delete project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
