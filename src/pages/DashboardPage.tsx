import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Box, Plus, Trash2, Copy, Edit3, FolderOpen, BookOpen,
} from 'lucide-react';
import { Project } from '@/types';
import { loadProjects, saveProject, deleteProject as deleteProjectStorage } from '@/lib/storage';
import { getSampleProjects } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [showSamples, setShowSamples] = useState(false);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  function createNew() {
    const newProject: Project = {
      id: uuidv4(),
      name: 'Untitled Project',
      description: '',
      objects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(newProject);
    navigate('/editor/' + newProject.id);
  }

  function handleDelete(id: string) {
    deleteProjectStorage(id);
    setProjects(loadProjects());
  }

  function handleDuplicate(p: Project) {
    const dup: Project = {
      ...p,
      id: uuidv4(),
      name: p.name + ' (Copy)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(dup);
    setProjects(loadProjects());
  }

  function startRename(p: Project) {
    setRenameId(p.id);
    setRenameValue(p.name);
  }

  function confirmRename(p: Project) {
    const updated = { ...p, name: renameValue, updatedAt: new Date().toISOString() };
    saveProject(updated);
    setRenameId(null);
    setProjects(loadProjects());
  }

  function loadSample(sample: Project) {
    const copy: Project = {
      ...sample,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(copy);
    navigate('/editor/' + copy.id);
  }

  const samples = getSampleProjects();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <Box size={24} color="var(--color-primary)" />
          <span className={styles.logoText}>EduArch3D</span>
        </div>
        <p className={styles.subtitle}>Your Projects — saved locally in your browser</p>
      </header>

      <main className={styles.main}>
        <div className={styles.actions}>
          <button className={styles.createBtn} onClick={createNew}>
            <Plus size={18} /> New Project
          </button>
          <button className={styles.sampleBtn} onClick={() => setShowSamples(!showSamples)}>
            <BookOpen size={18} /> {showSamples ? 'Hide' : 'Show'} Sample Projects
          </button>
        </div>

        {showSamples && (
          <section className={styles.samplesSection}>
            <h3>Sample Projects</h3>
            <div className={styles.grid}>
              {samples.map((s) => (
                <div key={s.id} className={styles.card} onClick={() => loadSample(s)}>
                  <div className={styles.cardThumb}>
                    <BookOpen size={32} color="var(--color-primary)" />
                  </div>
                  <div className={styles.cardInfo}>
                    <h4>{s.name}</h4>
                    <p className={styles.cardDesc}>{s.description}</p>
                    <span className={styles.cardMeta}>{s.objects.length} objects</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className={styles.sectionTitle}>My Projects ({projects.length})</h3>
          {projects.length === 0 ? (
            <div className={styles.empty}>
              <FolderOpen size={48} color="var(--color-text-secondary)" />
              <p>No projects yet. Create a new one or explore sample projects!</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {projects.map((p) => (
                <div key={p.id} className={styles.card}>
                  <div
                    className={styles.cardThumb}
                    onClick={() => navigate('/editor/' + p.id)}
                  >
                    <Box size={32} color="var(--color-primary)" />
                  </div>
                  <div className={styles.cardInfo}>
                    {renameId === p.id ? (
                      <input
                        className={styles.renameInput}
                        value={renameValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRenameValue(e.target.value)}
                        onBlur={() => confirmRename(p)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === 'Enter') confirmRename(p);
                        }}
                        autoFocus
                      />
                    ) : (
                      <h4
                        className={styles.cardTitle}
                        onClick={() => navigate('/editor/' + p.id)}
                      >
                        {p.name}
                      </h4>
                    )}
                    <span className={styles.cardMeta}>
                      {p.objects.length} objects &middot; {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
                    <div className={styles.cardActions}>
                      <button onClick={() => startRename(p)} title="Rename">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDuplicate(p)} title="Duplicate">
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        title="Delete"
                        className={styles.deleteBtn}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
