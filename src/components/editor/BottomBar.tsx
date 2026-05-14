import { useEditorStore } from '../../hooks/useEditorStore';

export default function BottomBar() {
  const gridVisible = useEditorStore((s) => s.gridVisible);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const toggleGrid = useEditorStore((s) => s.toggleGrid);
  const toggleSnap = useEditorStore((s) => s.toggleSnap);
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar);
  const togglePropertiesPanel = useEditorStore((s) => s.togglePropertiesPanel);
  const objects = useEditorStore((s) => s.objects);

  const tagStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 10px',
    borderRadius: 4,
    fontSize: '0.75rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    color: active ? 'white' : '#6b7280',
    background: active ? '#374151' : 'transparent',
    transition: 'all 0.15s',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 32,
      background: '#111827',
      borderTop: '1px solid #1f2937',
      padding: '0 12px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <button onClick={toggleGrid} style={tagStyle(gridVisible)}>Grid</button>
        <button onClick={toggleSnap} style={tagStyle(snapEnabled)}>Snap</button>
        <button onClick={toggleSidebar} style={tagStyle(true)}>Assets</button>
        <button onClick={togglePropertiesPanel} style={tagStyle(true)}>Props</button>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ color: '#6b7280', fontSize: '0.7rem' }}>
          {objects.length} object{objects.length !== 1 ? 's' : ''}
        </span>
        <span style={{ color: '#4b5563', fontSize: '0.65rem' }}>
          G=Move R=Rotate S=Scale Del=Delete Ctrl+D=Dup Ctrl+Z/Y=Undo/Redo
        </span>
      </div>
    </div>
  );
}
