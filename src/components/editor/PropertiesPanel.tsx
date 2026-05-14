import { useEditorStore } from '@/hooks/useEditorStore';
import { MATERIAL_PRESETS } from '@/lib/assets';
import { Vector3Tuple } from '@/types';

export default function PropertiesPanel() {
  const { objects, selectedObjectId, updateObject } = useEditorStore();
  const obj = objects.find((o) => o.id === selectedObjectId);

  if (!obj) return null;

  function setPosition(axis: number, val: number) {
    const pos: Vector3Tuple = [...obj!.position];
    pos[axis] = val;
    updateObject(obj!.id, { position: pos });
  }

  function setScale(axis: number, val: number) {
    const s: Vector3Tuple = [...obj!.scale];
    s[axis] = val;
    updateObject(obj!.id, { scale: s });
  }

  function setRotation(axis: number, deg: number) {
    const r: Vector3Tuple = [...obj!.rotation];
    r[axis] = (deg * Math.PI) / 180;
    updateObject(obj!.id, { rotation: r });
  }

  const labels = ['X', 'Y', 'Z'];

  const inputStyle = {
    width: 55,
    padding: '0.2rem 0.3rem',
    background: '#3d3d5c',
    border: 'none',
    borderRadius: 3,
    color: 'white',
    fontSize: '0.8rem',
  } as const;

  return (
    <div style={{
      width: 240,
      background: '#25253a',
      borderLeft: '1px solid #3d3d5c',
      overflowY: 'auto',
      flexShrink: 0,
      padding: '0.75rem',
      color: 'white',
    }}>
      <h3 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 600 }}>{obj.name}</h3>

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', fontWeight: 600 }}>Position</label>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {labels.map((l, i) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: '0.65rem', color: '#888' }}>{l}</span>
              <input
                type="number"
                step={0.1}
                value={parseFloat(obj.position[i].toFixed(2))}
                onChange={(e) => setPosition(i, parseFloat(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', fontWeight: 600 }}>Rotation (deg)</label>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {labels.map((l, i) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: '0.65rem', color: '#888' }}>{l}</span>
              <input
                type="number"
                step={5}
                value={parseFloat(((obj.rotation[i] * 180) / Math.PI).toFixed(1))}
                onChange={(e) => setRotation(i, parseFloat(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', fontWeight: 600 }}>Scale</label>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {labels.map((l, i) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: '0.65rem', color: '#888' }}>{l}</span>
              <input
                type="number"
                step={0.1}
                value={parseFloat(obj.scale[i].toFixed(2))}
                onChange={(e) => setScale(i, parseFloat(e.target.value) || 0.1)}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4, display: 'block' }}>Material</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <button
            onClick={() => updateObject(obj.id, { materialId: '' })}
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              border: !obj.materialId ? '2px solid #2563eb' : '2px solid transparent',
              background: '#777',
              cursor: 'pointer',
              fontSize: '0.6rem',
              color: 'white',
            }}
            title="Default"
          >Def</button>
          {MATERIAL_PRESETS.map((mat) => (
            <button
              key={mat.id}
              onClick={() => updateObject(obj.id, { materialId: mat.id })}
              title={mat.name}
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                border: obj.materialId === mat.id ? '2px solid #2563eb' : '2px solid transparent',
                background: mat.color,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', cursor: 'pointer', color: '#ccc' }}>
        <input
          type="checkbox"
          checked={obj.visible}
          onChange={(e) => updateObject(obj.id, { visible: e.target.checked })}
        />
        Visible
      </label>
    </div>
  );
}
