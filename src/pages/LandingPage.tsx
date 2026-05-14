import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 600 }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '1rem',
        }}>EduArch3D</h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          An interactive 3D architectural design tool for education. Build rooms,
          houses, and structures with drag-and-drop simplicity.
        </p>
        <button
          style={{
            padding: '0.75rem 2rem',
            background: '#2563eb',
            color: 'white',
            borderRadius: 8,
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
          }}
          onClick={() => navigate('/dashboard')}
        >
          Open Dashboard
        </button>
      </div>
    </div>
  );
}
