import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import { listProjects, deleteProject, createProject, ProjectData } from '@/lib/storage';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setProjects(listProjects());
  }, []);

  function handleCreate() {
    const name = newName.trim() || 'New Project';
    const project = createProject(name);
    setNewName('');
    setProjects(listProjects());
    navigate(`/editor/${project.id}`);
  }

  function handleDelete(id: string) {
    deleteProject(id);
    setProjects(listProjects());
  }

  function handleOpen(id: string) {
    navigate(`/editor/${id}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <div className={styles.createGroup}>
          <input
            className={styles.nameInput}
            placeholder="Project name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <button className={styles.createBtn} onClick={handleCreate}>
            <Plus size={16} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.length === 0 && (
          <div className={styles.empty}>
            <p>No projects yet. Create your first project above!</p>
          </div>
        )}
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{project.name}</h3>
              <p className={styles.cardMeta}>
                {project.objects.length} objects • Updated{' '}
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.cardActions}>
              <button
                className={styles.openBtn}
                onClick={() => handleOpen(project.id)}
              >
                <FolderOpen size={14} />
                Open
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(project.id)}
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
