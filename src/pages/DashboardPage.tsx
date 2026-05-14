import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, FolderOpen, Copy } from 'lucide-react';
import { listProjects, deleteProject, saveProject, ProjectData } from '@/lib/storage';
import { SAMPLE_PROJECTS } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(listProjects());
  }, []);

  function handleNewProject() {
    const id = uuidv4();
    saveProject({
      id,
      name: 'Untitled Project',
      description: '',
      objects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    navigate(`/editor/${id}`);
  }

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(listProjects());
  }

  function handleLoadSample(sampleIndex: number) {
    const sample = SAMPLE_PROJECTS[sampleIndex];
    if (!sample) return;
    const id = uuidv4();
    saveProject({
      id,
      name: sample.name,
      description: sample.description,
      objects: sample.objects,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    navigate(`/editor/${id}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏗️ EduArch3D Dashboard</h1>
          <button className={styles.newBtn} onClick={handleNewProject}>
            <Plus size={18} /> New Project
          </button>
        </div>

        {SAMPLE_PROJECTS.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Sample Projects</h2>
            <div className={styles.grid}>
              {SAMPLE_PROJECTS.map((sample, i) => (
                <div key={i} className={styles.card} onClick={() => handleLoadSample(i)}>
                  <div className={styles.cardBody}>
                    <Copy size={24} className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>{sample.name}</h3>
                    <p className={styles.cardDesc}>{sample.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Projects</h2>
          {projects.length === 0 ? (
            <p className={styles.empty}>No projects yet. Create one or try a sample!</p>
          ) : (
            <div className={styles.grid}>
              {projects.map((p) => (
                <div key={p.id} className={styles.card}>
                  <div className={styles.cardBody} onClick={() => navigate(`/editor/${p.id}`)}>
                    <FolderOpen size={24} className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>{p.name}</h3>
                    <p className={styles.cardDesc}>
                      {p.objects.length} objects • Updated {new Date(p.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
