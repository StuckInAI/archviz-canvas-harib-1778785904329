import { useEditorStore } from '@/hooks/useEditorStore';
import { MATERIAL_PRESETS, getAssetById } from '@/lib/assets';
import { Vector3Tuple } from '@/types';
import { Trash2, Copy } from 'lucide-react';
import styles from './PropertiesPanel.module.css';

export default function PropertiesPanel() {
  const {
    objects,
    selectedObjectId,
    updateObject,
    removeObject,
    duplicateObject,
    pushHistory,
  } = useEditorStore();

  const obj = objects.find((o) => o.id === selectedObjectId);
  if (!obj) return null;

  const asset = getAssetById(obj.assetId);

  function handleVec3Change(field: 'position' | 'rotation' | 'scale', index: number, value: string) {
    if (!obj) return;
    const num = parseFloat(value);
    if (isNaN(num)) return;
    const current = [...obj[field]] as Vector3Tuple;
    current[index] = num;
    updateObject(obj.id, { [field]: current });
  }

  function handleVec3Blur() {
    pushHistory();
  }

  function handleMaterialChange(materialId: string) {
    if (!obj) return;
    updateObject(obj.id, { materialId });
    pushHistory();
  }

  function handleNameChange(name: string) {
    if (!obj) return;
    updateObject(obj.id, { name });
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Properties</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            value={obj.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
          />
        </div>

        {asset && (
          <div className={styles.section}>
            <p className={styles.desc}>{asset.description}</p>
          </div>
        )}

        <div className={styles.section}>
          <label className={styles.label}>Position</label>
          <div className={styles.vec3}>
            {['X', 'Y', 'Z'].map((axis, i) => (
              <div key={axis} className={styles.vec3Field}>
                <span className={styles.axisLabel}>{axis}</span>
                <input
                  className={styles.numInput}
                  type="number"
                  step={0.1}
                  value={obj.position[i]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleVec3Change('position', i, e.target.value)
                  }
                  onBlur={handleVec3Blur}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Rotation (°)</label>
          <div className={styles.vec3}>
            {['X', 'Y', 'Z'].map((axis, i) => (
              <div key={axis} className={styles.vec3Field}>
                <span className={styles.axisLabel}>{axis}</span>
                <input
                  className={styles.numInput}
                  type="number"
                  step={15}
                  value={Math.round((obj.rotation[i] * 180) / Math.PI)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const deg = parseFloat(e.target.value);
                    if (isNaN(deg)) return;
                    const rad = (deg * Math.PI) / 180;
                    const current = [...obj.rotation] as Vector3Tuple;
                    current[i] = rad;
                    updateObject(obj.id, { rotation: current });
                  }}
                  onBlur={handleVec3Blur}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Scale</label>
          <div className={styles.vec3}>
            {['W', 'H', 'D'].map((axis, i) => (
              <div key={axis} className={styles.vec3Field}>
                <span className={styles.axisLabel}>{axis}</span>
                <input
                  className={styles.numInput}
                  type="number"
                  step={0.1}
                  min={0.01}
                  value={obj.scale[i]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleVec3Change('scale', i, e.target.value)
                  }
                  onBlur={handleVec3Blur}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Material</label>
          <div className={styles.materialGrid}>
            {MATERIAL_PRESETS.map((mat) => (
              <button
                key={mat.id}
                className={styles.materialItem}
                style={{
                  borderColor: obj.materialId === mat.id ? 'var(--color-primary)' : 'transparent',
                }}
                onClick={() => handleMaterialChange(mat.id)}
                title={mat.name}
              >
                <div
                  className={styles.materialSwatch}
                  style={{ backgroundColor: mat.color }}
                />
                <span className={styles.materialName}>{mat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            onClick={() => duplicateObject(obj.id)}
          >
            <Copy size={14} /> Duplicate
          </button>
          <button
            className={styles.deleteActionBtn}
            onClick={() => removeObject(obj.id)}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
