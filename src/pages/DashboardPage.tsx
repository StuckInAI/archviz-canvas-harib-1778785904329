import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, FolderOpen, Building2 } from 'lucide-react';
import { loadAllProjects, saveProject, deleteProject, ProjectData } from '@/lib/storage';
import { SAMPLE_PROJECTS } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(loadAllProjects());
  }, []);

  function handleCreate() {
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

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(loadAllProjects());
  }

  function handleLoadSample(sampleIndex: number) {
    const sample = SAMPLE_PROJECTS[sampleIndex];
    if (!sample) return;
    const id = uuidv4();
    const project: ProjectData = {
      id,
      name: sample.name,
      description: sample.description,
      objects: sample.objects,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
    navigate(`/editor/${id}`);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Building2 size={28} />
          <h1 className={styles.headerTitle}>EduArch3D Dashboard</h1>
        </div>
        <button className={styles.createBtn} onClick={handleCreate}>
          <Plus size={18} /> New Project
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Projects</h2>
          {projects.length === 0 ? (
            <p className={styles.empty}>No projects yet. Create one or load a sample!</p>
          ) : (
            <div className={styles.grid}>
              {projects.map((p) => (
                <div key={p.id} className={styles.card}>
                  <div className={styles.cardBody} onClick={() => navigate(`/editor/${p.id}`)}>
                    <FolderOpen size={24} className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>{p.name}</h3>
                    <p className={styles.cardMeta}>
                      {p.objects.length} objects • {new Date(p.updatedAt).toLocaleDateString()}
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
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sample Projects</h2>
          <div className={styles.grid}>
            {SAMPLE_PROJECTS.map((sample, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardBody} onClick={() => handleLoadSample(i)}>
                  <Building2 size={24} className={styles.cardIcon} />
                  <h3 className={styles.cardTitle}>{sample.name}</h3>
                  <p className={styles.cardMeta}>{sample.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
