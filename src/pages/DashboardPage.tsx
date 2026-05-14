import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Building2, FolderOpen, ArrowLeft } from 'lucide-react';
import { listProjects, deleteProject, createProject, saveProject, ProjectData } from '@/lib/storage';
import { createSampleObjects } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setProjects(listProjects());
  }, []);

  function handleCreate() {
    const name = newName.trim() || 'Untitled Project';
    const project = createProject(name);
    setShowNewDialog(false);
    setNewName('');
    navigate(`/editor/${project.id}`);
  }

  function handleCreateSample() {
    const project = createProject('Sample Building');
    const objects = createSampleObjects();
    saveProject({ ...project, objects });
    setProjects(listProjects());
  }

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(listProjects());
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Home
        </button>
        <h1 className={styles.heading}>
          <Building2 size={24} /> My Projects
        </h1>
        <div className={styles.topActions}>
          <button className={styles.sampleBtn} onClick={handleCreateSample}>
            <FolderOpen size={16} /> Add Sample
          </button>
          <button className={styles.newBtn} onClick={() => setShowNewDialog(true)}>
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {showNewDialog && (
        <div className={styles.dialog}>
          <div className={styles.dialogCard}>
            <h2>New Project</h2>
            <input
              className={styles.dialogInput}
              placeholder="Project name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
            <div className={styles.dialogActions}>
              <button className={styles.cancelBtn} onClick={() => setShowNewDialog(false)}>Cancel</button>
              <button className={styles.confirmBtn} onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {projects.length === 0 && (
          <div className={styles.empty}>
            <Building2 size={48} />
            <p>No projects yet. Create one or add a sample!</p>
          </div>
        )}
        {projects.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            onClick={() => navigate(`/editor/${p.id}`)}
          >
            <div className={styles.cardPreview}>
              <Building2 size={32} />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{p.name}</h3>
              <p className={styles.cardMeta}>
                {p.objects.length} objects • {new Date(p.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              className={styles.cardDelete}
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
    </div>
  );
}
