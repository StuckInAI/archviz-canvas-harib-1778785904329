import { useEditorStore } from '@/hooks/useEditorStore';
import { Grid3x3, Magnet, Keyboard } from 'lucide-react';
import clsx from 'clsx';
import styles from './BottomBar.module.css';

export default function BottomBar() {
  const {
    gridVisible,
    snapEnabled,
    toggleGrid,
    toggleSnap,
    objects,
    selectedObjectId,
  } = useEditorStore();

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <button
          className={clsx(styles.toggle, gridVisible && styles.active)}
          onClick={toggleGrid}
          title="Toggle Grid (F1)"
        >
          <Grid3x3 size={14} />
          <span>Grid</span>
        </button>
        <button
          className={clsx(styles.toggle, snapEnabled && styles.active)}
          onClick={toggleSnap}
          title="Toggle Snap (F2)"
        >
          <Magnet size={14} />
          <span>Snap</span>
        </button>
      </div>

      <div className={styles.center}>
        <span className={styles.info}>
          {objects.length} objects{selectedObjectId ? ' • 1 selected' : ''}
        </span>
      </div>

      <div className={styles.right}>
        <Keyboard size={12} />
        <span className={styles.shortcuts}>
          G Move • R Rotate • S Scale • Del Delete • Ctrl+D Duplicate • Ctrl+Z Undo
        </span>
      </div>
    </div>
  );
}
