import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listProjects, deleteProject, createProject, ProjectData } from '@/lib/storage';

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
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '2rem',
      overflowY: 'auto',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f2937' }}>My Projects</h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: '0.9rem',
                outline: 'none',
                width: 200,
              }}
              placeholder="Project name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <button
              style={{
                padding: '0.5rem 1rem',
                background: '#2563eb',
                color: 'white',
                borderRadius: 6,
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onClick={handleCreate}
            >
              + New Project
            </button>
          </div>
        </div>

        {projects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#9ca3af',
            fontSize: '1rem',
          }}>
            <p>No projects yet. Create your first project above!</p>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}>
          {projects.map((project) => (
            <div key={project.id} style={{
              background: 'white',
              borderRadius: 10,
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                  {project.objects.length} objects • Updated{' '}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    background: '#2563eb',
                    color: 'white',
                    borderRadius: 6,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleOpen(project.id)}
                >
                  Open
                </button>
                <button
                  style={{
                    padding: '0.4rem 0.6rem',
                    background: '#fee2e2',
                    color: '#ef4444',
                    borderRadius: 6,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleDelete(project.id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
