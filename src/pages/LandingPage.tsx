interface Props {
  navigate: (path: string) => void;
}

export default function LandingPage({ navigate }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 650 }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏗️</div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}>EduArch3D</h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.65)',
          marginBottom: '2.5rem',
          lineHeight: 1.7,
        }}>
          An interactive 3D architectural design tool built for students and educators.
          Create rooms, houses, and structures with intuitive drag-and-drop controls.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '14px 40px',
            background: '#2563eb',
            color: 'white',
            borderRadius: 10,
            fontSize: '1.05rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#1d4ed8')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#2563eb')}
        >
          Get Started →
        </button>
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🧱', label: 'Walls & Floors' },
            { icon: '🚪', label: 'Doors & Windows' },
            { icon: '🪑', label: 'Furniture' },
            { icon: '🌲', label: 'Landscaping' },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 24px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
            }}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 4 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
