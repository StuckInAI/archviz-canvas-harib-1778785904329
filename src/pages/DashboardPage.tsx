import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, FolderOpen, ArrowLeft } from 'lucide-react';
import { getProjects, saveProject, deleteProject, ProjectData } from '@/lib/storage';
import { createSampleObjects } from '@/lib/sampleProjects';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  function handleNewProject() {
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

  function handleNewSampleProject() {
    const id = uuidv4();
    const now = new Date().toISOString();
    saveProject({
      id,
      name: 'Sample Room',
      description: 'A sample room with walls and furniture',
      objects: createSampleObjects(),
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
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className={styles.title}>My Projects</h1>
      </div>

      <div className={styles.actions}>
        <button className={styles.newBtn} onClick={handleNewProject}>
          <Plus size={18} /> New Project
        </button>
        <button className={styles.sampleBtn} onClick={handleNewSampleProject}>
          <FolderOpen size={18} /> Sample Project
        </button>
      </div>

      <div className={styles.grid}>
        {projects.length === 0 && (
          <p className={styles.empty}>
            No projects yet. Create a new one or try a sample project!
          </p>
        )}
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardBody} onClick={() => navigate(`/editor/${project.id}`)}>
              <h3 className={styles.cardTitle}>{project.name}</h3>
              <p className={styles.cardMeta}>
                {project.objects.length} objects • Updated {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(project.id)}
              title="Delete project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
