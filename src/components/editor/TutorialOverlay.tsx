interface TutorialOverlayProps {
  onDismiss: () => void;
}

export default function TutorialOverlay({ onDismiss }: TutorialOverlayProps) {
  const steps = [
    { title: 'Welcome to EduArch3D!', desc: 'A 3D architectural design tool built for students and educators.' },
    { title: 'Asset Library', desc: 'Use the left sidebar to browse and add architectural elements like walls, doors, furniture, and more.' },
    { title: 'Transform Objects', desc: 'Select an object and use G (Move), R (Rotate), S (Scale) to transform it. Or use the toolbar buttons.' },
    { title: 'Properties Panel', desc: 'When an object is selected, the right panel shows its position, rotation, scale, and material options.' },
    { title: 'Save Your Work', desc: 'Click Save or press Ctrl+S. Your project auto-saves every 30 seconds.' },
    { title: 'Keyboard Shortcuts', desc: 'Delete = Remove object, Ctrl+D = Duplicate, Ctrl+Z = Undo, Ctrl+Shift+Z = Redo' },
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
        background: '#2d2d44',
        borderRadius: 12,
        padding: '2rem',
        maxWidth: 500,
        width: '90%',
        color: 'white',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700 }}>Getting Started</h2>
        {steps.map((step, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#60a5fa', marginBottom: 4 }}>
              {i + 1}. {step.title}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.5 }}>{step.desc}</p>
          </div>
        ))}
        <button
          onClick={onDismiss}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            borderRadius: 6,
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            width: '100%',
          }}
        >Got it, let's build!</button>
      </div>
    </div>
  );
}
