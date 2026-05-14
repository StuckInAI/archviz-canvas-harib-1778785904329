import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Building2, FolderOpen, Clock } from 'lucide-react';
import { listProjects, deleteProject, saveProject } from '@/lib/storage';
import { SAMPLE_PROJECTS } from '@/lib/sampleProjects';
import { Project } from '@/types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(listProjects());
  }, []);

  function handleNewProject() {
    const id = uuidv4();
    const project: Project = {
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

  function handleDeleteProject(id: string) {
    deleteProject(id);
    setProjects(listProjects());
  }

  function handleLoadSample(sample: typeof SAMPLE_PROJECTS[number]) {
    const id = uuidv4();
    const project: Project = {
      id,
      name: sample.name,
      description: sample.description,
      objects: JSON.parse(JSON.stringify(sample.objects)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
    navigate(`/editor/${id}`);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: 'white',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Building2 size={32} color="#3b82f6" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>EduArch3D Dashboard</h1>
          </div>
          <button
            onClick={handleNewProject}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Plus size={18} /> New Project
          </button>
        </div>

        {/* My Projects */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderOpen size={18} /> My Projects
          </h2>
          {projects.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No projects yet. Create one or try a sample!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {projects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'border-color 0.2s',
                  }}
                  onClick={() => navigate(`/editor/${p.id}`)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <h3 style={{ fontWeight: 600 }}>{p.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(p.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Clock size={12} />
                    <span>{new Date(p.updatedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{p.objects.length} objects</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sample Projects */}
        <section>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Sample Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {SAMPLE_PROJECTS.map((s) => (
              <div
                key={s.name}
                style={{
                  background: 'rgba(59,130,246,0.1)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(59,130,246,0.2)',
                  transition: 'border-color 0.2s',
                }}
                onClick={() => handleLoadSample(s)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)')}
              >
                <h3 style={{ fontWeight: 600 }}>{s.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>{s.description}</p>
                <span style={{ display: 'inline-block', marginTop: '0.5rem', color: '#60a5fa', fontSize: '0.8rem' }}>
                  {s.objects.length} objects
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
