import { useState, useEffect } from 'react';
import { listProjects, deleteProject, createProject } from '../lib/storage';
import type { ProjectData } from '../lib/storage';

interface Props {
  navigate: (path: string) => void;
}

export default function DashboardPage({ navigate }: Props) {
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
    if (confirm('Delete this project?')) {
      deleteProject(id);
      setProjects(listProjects());
    }
  }

  function handleOpen(id: string) {
    navigate(`/editor/${id}`);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      overflow: 'auto',
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>🏗️</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1f2937' }}>EduArch3D</span>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '6px 14px',
            background: '#f3f4f6',
            borderRadius: 6,
            fontSize: '0.85rem',
            color: '#6b7280',
            cursor: 'pointer',
            border: '1px solid #e5e7eb',
          }}
        >
          ← Home
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1f2937' }}>My Projects</h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              style={{
                padding: '8px 12px',
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
              onClick={handleCreate}
              style={{
                padding: '8px 16px',
                background: '#2563eb',
                color: 'white',
                borderRadius: 6,
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              + New Project
            </button>
          </div>
        </div>

        {projects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#9ca3af',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📐</div>
            <p style={{ fontSize: '1rem' }}>No projects yet. Create your first project to get started!</p>
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
              border: '1px solid #f0f0f0',
            }}>
              <div style={{
                width: '100%',
                height: 100,
                background: 'linear-gradient(135deg, #e0e7ff, #dbeafe)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}>
                🏠
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                  {project.objects.length} object{project.objects.length !== 1 ? 's' : ''} • {new Date(project.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleOpen(project.id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#2563eb',
                    color: 'white',
                    borderRadius: 6,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  Open
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  style={{
                    padding: '8px 12px',
                    background: '#fee2e2',
                    color: '#ef4444',
                    borderRadius: 6,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
