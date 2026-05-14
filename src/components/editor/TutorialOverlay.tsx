interface Props {
  onDismiss: () => void;
}

export default function TutorialOverlay({ onDismiss }: Props) {
  const steps = [
    { icon: '🖱️', title: 'Navigate', desc: 'Left-click drag to orbit. Right-click drag to pan. Scroll to zoom.' },
    { icon: '📦', title: 'Add Objects', desc: 'Click assets in the left sidebar to place them in the scene.' },
    { icon: '✋', title: 'Select', desc: 'Click any object to select it. Click empty space to deselect.' },
    { icon: '↔️', title: 'Transform', desc: 'Use G (Move), R (Rotate), S (Scale) to switch transform modes.' },
    { icon: '📋', title: 'Properties', desc: 'Adjust position, rotation, scale and materials in the right panel.' },
    { icon: '💾', title: 'Save', desc: 'Click Save or wait for auto-save. Projects persist in your browser.' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#1a1a2e',
        borderRadius: 16,
        padding: '32px',
        maxWidth: 520,
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        border: '1px solid #2d2d44',
      }}>
        <h2 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>
          Welcome to EduArch3D! 🏗️
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: 20, textAlign: 'center' }}>
          Here's how to get started:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              padding: '10px 12px',
              background: '#16162a',
              borderRadius: 8,
              border: '1px solid #2d2d44',
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{step.icon}</span>
              <div>
                <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 2 }}>
                  {step.title}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.78rem', lineHeight: 1.4 }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onDismiss}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 20,
            padding: '10px',
            background: '#2563eb',
            color: 'white',
            borderRadius: 8,
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Got it, let's build!
        </button>
      </div>
    </div>
  );
}
