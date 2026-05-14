import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Layers } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Building2 size={48} color="#3b82f6" />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>EduArch3D</h1>
      </div>
      <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.6 }}>
        An educational 3D architectural design tool. Build rooms, houses, and buildings
        using predefined elements in an intuitive drag-and-drop interface.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Get Started <ArrowRight size={18} />
        </button>
      </div>
      <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { icon: '🏗️', title: 'Structural Elements', desc: 'Walls, floors, roofs, columns' },
          { icon: '🚪', title: 'Openings', desc: 'Doors, windows, arches' },
          { icon: '🪑', title: 'Furniture', desc: 'Tables, chairs, shelves' },
        ].map((f) => (
          <div key={f.title} style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            width: '200px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{f.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
