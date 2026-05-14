import { useEditorStore } from '../../hooks/useEditorStore';
import { MATERIAL_PRESETS } from '../../lib/assets';
import type { SceneObject, Vector3Tuple } from '../../hooks/useEditorStore';

export default function PropertiesPanel() {
  const selectedObjectId = useEditorStore((s) => s.selectedObjectId);
  const objects = useEditorStore((s) => s.objects);
  const updateObject = useEditorStore((s) => s.updateObject);
  const removeObject = useEditorStore((s) => s.removeObject);
  const duplicateObject = useEditorStore((s) => s.duplicateObject);
  const pushHistory = useEditorStore((s) => s.pushHistory);

  const obj = objects.find((o) => o.id === selectedObjectId);
  if (!obj) return null;

  function handleVectorChange(
    field: 'position' | 'rotation' | 'scale',
    index: number,
    value: string
  ) {
    if (!obj) return;
    const current = [...obj[field]] as Vector3Tuple;
    current[index] = parseFloat(value) || 0;
    updateObject(obj.id, { [field]: current });
  }

  function handleBlur() {
    pushHistory();
  }

  const inputStyle: React.CSSProperties = {
    width: 60,
    padding: '4px 6px',
    background: '#16162a',
    border: '1px solid #2d2d44',
    borderRadius: 3,
    color: 'white',
    fontSize: '0.78rem',
    textAlign: 'center',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    color: '#9ca3af',
    fontSize: '0.72rem',
    fontWeight: 500,
    marginBottom: 4,
    display: 'block',
  };

  return (
    <div style={{
      width: 220,
      background: '#1a1a2e',
      borderLeft: '1px solid #2d2d44',
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <h3 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>Properties</h3>

      <div>
        <label style={labelStyle}>Name</label>
        <input
          style={{ ...inputStyle, width: '100%', textAlign: 'left' }}
          value={obj.name}
          onChange={(e) => updateObject(obj.id, { name: e.target.value })}
        />
      </div>

      {/* Position */}
      <div>
        <label style={labelStyle}>Position (X, Y, Z)</label>
        <div style={{ display: 'flex', gap: 4 }}>
          {obj.position.map((v, i) => (
            <input
              key={`pos-${i}`}
              style={inputStyle}
              type="number"
              step={0.1}
              value={v.toFixed(2)}
              onChange={(e) => handleVectorChange('position', i, e.target.value)}
              onBlur={handleBlur}
            />
          ))}
        </div>
      </div>

      {/* Rotation */}
      <div>
        <label style={labelStyle}>Rotation (X, Y, Z)</label>
        <div style={{ display: 'flex', gap: 4 }}>
          {obj.rotation.map((v, i) => (
            <input
              key={`rot-${i}`}
              style={inputStyle}
              type="number"
              step={0.1}
              value={v.toFixed(2)}
              onChange={(e) => handleVectorChange('rotation', i, e.target.value)}
              onBlur={handleBlur}
            />
          ))}
        </div>
      </div>

      {/* Scale */}
      <div>
        <label style={labelStyle}>Scale (X, Y, Z)</label>
        <div style={{ display: 'flex', gap: 4 }}>
          {obj.scale.map((v, i) => (
            <input
              key={`scl-${i}`}
              style={inputStyle}
              type="number"
              step={0.1}
              value={v.toFixed(2)}
              onChange={(e) => handleVectorChange('scale', i, e.target.value)}
              onBlur={handleBlur}
            />
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <label style={labelStyle}>Material</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <button
            onClick={() => { updateObject(obj.id, { materialId: '' }); pushHistory(); }}
            style={{
              width: 28, height: 28,
              borderRadius: 4,
              border: obj.materialId === '' ? '2px solid #2563eb' : '1px solid #2d2d44',
              background: '#888',
              cursor: 'pointer',
              fontSize: '0.6rem',
              color: 'white',
            }}
            title="Default"
          >
            Def
          </button>
          {MATERIAL_PRESETS.map((mat) => (
            <button
              key={mat.id}
              onClick={() => { updateObject(obj.id, { materialId: mat.id }); pushHistory(); }}
              style={{
                width: 28, height: 28,
                borderRadius: 4,
                border: obj.materialId === mat.id ? '2px solid #2563eb' : '1px solid #2d2d44',
                background: mat.color,
                cursor: 'pointer',
              }}
              title={mat.name}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
        <button
          onClick={() => duplicateObject(obj.id)}
          style={{
            flex: 1, padding: '6px',
            background: '#1f2937',
            border: '1px solid #374151',
            borderRadius: 4,
            color: '#d1d5db',
            fontSize: '0.78rem',
            cursor: 'pointer',
          }}
        >
          Duplicate
        </button>
        <button
          onClick={() => removeObject(obj.id)}
          style={{
            flex: 1, padding: '6px',
            background: '#7f1d1d',
            border: '1px solid #991b1b',
            borderRadius: 4,
            color: '#fecaca',
            fontSize: '0.78rem',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
