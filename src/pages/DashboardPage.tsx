import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Building2, Plus, Trash2, FolderOpen, Clock,
  ArrowLeft, Download,
} from 'lucide-react';
import { getAllProjects, deleteProject, createProject, ProjectData } from '@/lib/storage';
import { SAMPLE_PROJECTS } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  function handleNewProject() {
    const project = createProject('Untitled Project', '');
    navigate(`/editor/${project.id}`);
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    deleteProject(id);
    setProjects(getAllProjects());
  }

  function handleLoadSample(index: number) {
    const sample = SAMPLE_PROJECTS[index];
    if (!sample) return;
    const project = createProject(sample.name, sample.description, sample.objects);
    navigate(`/editor/${project.id}`);
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
          </button>
          <Building2 size={24} />
          <h1 className={styles.title}>My Projects</h1>
        </div>
        <button className={styles.newBtn} onClick={handleNewProject}>
          <Plus size={16} /> New Project
        </button>
      </header>

      <main className={styles.main}>
        {projects.length === 0 && (
          <div className={styles.empty}>
            <FolderOpen size={48} className={styles.emptyIcon} />
            <h2>No projects yet</h2>
            <p>Create a new project or load a sample to get started.</p>
          </div>
        )}

        {projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Projects</h2>
            <div className={styles.grid}>
              {projects.map((p) => (
                <div key={p.id} className={styles.card}>
                  <div
                    className={styles.cardBody}
                    onClick={() => navigate(`/editor/${p.id}`)}
                  >
                    <h3 className={styles.cardTitle}>{p.name}</h3>
                    <p className={styles.cardInfo}>
                      {p.objects.length} objects
                    </p>
                    <div className={styles.cardMeta}>
                      <Clock size={12} />
                      <span>{formatDate(p.updatedAt)}</span>
                    </div>
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
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sample Projects</h2>
          <div className={styles.grid}>
            {SAMPLE_PROJECTS.map((sample, i) => (
              <div key={i} className={styles.card}>
                <div
                  className={styles.cardBody}
                  onClick={() => handleLoadSample(i)}
                >
                  <h3 className={styles.cardTitle}>{sample.name}</h3>
                  <p className={styles.cardInfo}>{sample.description}</p>
                  <div className={styles.cardMeta}>
                    <Download size={12} />
                    <span>{sample.objects.length} objects</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
