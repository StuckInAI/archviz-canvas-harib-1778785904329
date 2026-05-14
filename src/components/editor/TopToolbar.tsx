import { useEditorStore } from '@/hooks/useEditorStore';

interface TopToolbarProps {
  onSave: () => void;
  onBack: () => void;
}

export default function TopToolbar({ onSave, onBack }: TopToolbarProps) {
  const {
    projectName,
    setProjectName,
    transformMode,
    setTransformMode,
    viewMode,
    setViewMode,
    undo,
    redo,
    isDirty,
  } = useEditorStore();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.5rem 1rem',
      background: '#2d2d44',
      borderBottom: '1px solid #3d3d5c',
      color: 'white',
      flexShrink: 0,
      flexWrap: 'wrap',
      minHeight: 48,
    }}>
      <button onClick={onBack} style={{
        padding: '0.3rem 0.6rem',
        background: '#4a4a6a',
        color: 'white',
        borderRadius: 4,
        fontSize: '0.8rem',
        cursor: 'pointer',
        border: 'none',
      }}>← Back</button>

      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        style={{
          background: 'transparent',
          border: '1px solid #4a4a6a',
          color: 'white',
          padding: '0.3rem 0.5rem',
          borderRadius: 4,
          fontSize: '0.9rem',
          width: 180,
        }}
      />

      <div style={{ width: 1, height: 24, background: '#4a4a6a' }} />

      <button onClick={onSave} style={{
        padding: '0.3rem 0.8rem',
        background: isDirty ? '#2563eb' : '#4a4a6a',
        color: 'white',
        borderRadius: 4,
        fontSize: '0.8rem',
        cursor: 'pointer',
        border: 'none',
      }}>💾 Save</button>

      <button onClick={undo} style={{
        padding: '0.3rem 0.5rem',
        background: '#4a4a6a',
        color: 'white',
        borderRadius: 4,
        fontSize: '0.8rem',
        cursor: 'pointer',
        border: 'none',
      }}>↩ Undo</button>

      <button onClick={redo} style={{
        padding: '0.3rem 0.5rem',
        background: '#4a4a6a',
        color: 'white',
        borderRadius: 4,
        fontSize: '0.8rem',
        cursor: 'pointer',
        border: 'none',
      }}>↪ Redo</button>

      <div style={{ width: 1, height: 24, background: '#4a4a6a' }} />

      {(['translate', 'rotate', 'scale'] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => setTransformMode(mode)}
          style={{
            padding: '0.3rem 0.6rem',
            background: transformMode === mode ? '#2563eb' : '#4a4a6a',
            color: 'white',
            borderRadius: 4,
            fontSize: '0.75rem',
            cursor: 'pointer',
            border: 'none',
            textTransform: 'capitalize',
          }}
        >{mode === 'translate' ? '↔ Move' : mode === 'rotate' ? '🔄 Rotate' : '⤡ Scale'}</button>
      ))}

      <div style={{ flex: 1 }} />

      {(['perspective', 'top', 'front', 'side'] as const).map((v) => (
        <button
          key={v}
          onClick={() => setViewMode(v)}
          style={{
            padding: '0.3rem 0.5rem',
            background: viewMode === v ? '#2563eb' : '#4a4a6a',
            color: 'white',
            borderRadius: 4,
            fontSize: '0.7rem',
            cursor: 'pointer',
            border: 'none',
            textTransform: 'capitalize',
          }}
        >{v}</button>
      ))}
    </div>
  );
}
