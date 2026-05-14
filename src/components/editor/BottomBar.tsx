import { useEditorStore } from '@/hooks/useEditorStore';

export default function BottomBar() {
  const { gridVisible, toggleGrid, snapEnabled, toggleSnap, snapValue, setSnapValue } = useEditorStore();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.4rem 1rem',
      background: '#2d2d44',
      borderTop: '1px solid #3d3d5c',
      color: '#ccc',
      fontSize: '0.75rem',
      flexShrink: 0,
      minHeight: 36,
    }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
        <input type="checkbox" checked={gridVisible} onChange={toggleGrid} />
        Grid
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
        <input type="checkbox" checked={snapEnabled} onChange={toggleSnap} />
        Snap
      </label>
      {snapEnabled && (
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          Snap:
          <select
            value={snapValue}
            onChange={(e) => setSnapValue(parseFloat(e.target.value))}
            style={{
              background: '#4a4a6a',
              color: 'white',
              border: 'none',
              borderRadius: 3,
              padding: '0.15rem 0.3rem',
              fontSize: '0.75rem',
            }}
          >
            <option value={0.25}>0.25</option>
            <option value={0.5}>0.5</option>
            <option value={1}>1.0</option>
          </select>
        </label>
      )}
      <div style={{ flex: 1 }} />
      <span style={{ color: '#888' }}>G=Move R=Rotate S=Scale Del=Delete Ctrl+D=Duplicate Ctrl+Z=Undo</span>
    </div>
  );
}
