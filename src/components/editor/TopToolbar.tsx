import {
  ArrowLeft, Save, Undo2, Redo2,
  Move, RotateCcw, Maximize,
  Eye, Grid3x3,
} from 'lucide-react';
import { useEditorStore } from '@/hooks/useEditorStore';
import { ViewMode, TransformMode } from '@/types';
import styles from './TopToolbar.module.css';
import clsx from 'clsx';

type TopToolbarProps = {
  onSave: () => void;
  onBack: () => void;
};

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
    historyIndex,
    history,
    isDirty,
  } = useEditorStore();

  const viewModes: { mode: ViewMode; label: string }[] = [
    { mode: 'perspective', label: 'Persp' },
    { mode: 'top', label: 'Top' },
    { mode: 'front', label: 'Front' },
    { mode: 'side', label: 'Side' },
  ];

  const transformModes: { mode: TransformMode; label: string; icon: typeof Move }[] = [
    { mode: 'translate', label: 'Move (G)', icon: Move },
    { mode: 'rotate', label: 'Rotate (R)', icon: RotateCcw },
    { mode: 'scale', label: 'Scale (S)', icon: Maximize },
  ];

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <button className={styles.iconBtn} onClick={onBack} title="Back to Dashboard">
          <ArrowLeft size={18} />
        </button>
        <input
          className={styles.nameInput}
          value={projectName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
        />
        <button
          className={clsx(styles.iconBtn, styles.saveBtn)}
          onClick={onSave}
          title="Save"
        >
          <Save size={16} />
          {isDirty && <span className={styles.dirtyDot} />}
        </button>
      </div>

      <div className={styles.center}>
        <div className={styles.group}>
          <button
            className={styles.iconBtn}
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={16} />
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          {transformModes.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.mode}
                className={clsx(styles.iconBtn, transformMode === t.mode && styles.active)}
                onClick={() => setTransformMode(t.mode)}
                title={t.label}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          {viewModes.map((v) => (
            <button
              key={v.mode}
              className={clsx(styles.viewBtn, viewMode === v.mode && styles.active)}
              onClick={() => setViewMode(v.mode)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.hint}>EduArch3D</span>
      </div>
    </div>
  );
}
