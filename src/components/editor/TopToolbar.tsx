import { useEditorStore } from '../../hooks/useEditorStore';

interface Props {
  onSave: () => void;
  onBack: () => void;
}

export default function TopToolbar({ onSave, onBack }: Props) {
  const projectName = useEditorStore((s) => s.projectName);
  const transformMode = useEditorStore((s) => s.transformMode);
  const viewMode = useEditorStore((s) => s.viewMode);
  const setTransformMode = useEditorStore((s) => s.setTransformMode);
  const setViewMode = useEditorStore((s) => s.setViewMode);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const isDirty = useEditorStore((s) => s.isDirty);

  const btnBase: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: 5,
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #374151',
    color: '#d1d5db',
    background: '#1f2937',
    transition: 'all 0.15s',
  };

  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: '#2563eb',
    borderColor: '#2563eb',
    color: 'white',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 48,
      background: '#111827',
      borderBottom: '1px solid #1f2937',
      padding: '0 12px',
      gap: 8,
      flexShrink: 0,
      zIndex: 10,
    }}>
      {/* Left section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onBack} style={btnBase}>← Back</button>
        <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>|</span>
        <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
          {projectName}
        </span>
        {isDirty && <span style={{ color: '#f59e0b', fontSize: '0.7rem' }}>● unsaved</span>}
      </div>

      {/* Center section - transform controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          onClick={() => setTransformMode('translate')}
          style={transformMode === 'translate' ? btnActive : btnBase}
        >
          Move (G)
        </button>
        <button
          onClick={() => setTransformMode('rotate')}
          style={transformMode === 'rotate' ? btnActive : btnBase}
        >
          Rotate (R)
        </button>
        <button
          onClick={() => setTransformMode('scale')}
          style={transformMode === 'scale' ? btnActive : btnBase}
        >
          Scale (S)
        </button>
        <span style={{ color: '#4b5563', margin: '0 4px' }}>|</span>
        {(['perspective', 'top', 'front', 'side'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setViewMode(v)}
            style={viewMode === v ? btnActive : btnBase}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={undo} style={btnBase}>↶ Undo</button>
        <button onClick={redo} style={btnBase}>↷ Redo</button>
        <button
          onClick={onSave}
          style={{
            ...btnBase,
            background: '#059669',
            borderColor: '#059669',
            color: 'white',
          }}
        >
          💾 Save
        </button>
      </div>
    </div>
  );
}
