import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Layers, Palette, Box } from 'lucide-react';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.icon}>
          <Building2 size={48} />
        </div>
        <h1 className={styles.title}>EduArch3D</h1>
        <p className={styles.subtitle}>
          A browser-based 3D architectural design tool for learning and
          experimentation. Build rooms, houses, and buildings with drag-and-drop
          elements.
        </p>
        <button className={styles.cta} onClick={() => navigate('/dashboard')}>
          Open Dashboard <ArrowRight size={18} />
        </button>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <Box size={24} />
          <h3>3D Building Blocks</h3>
          <p>Walls, floors, columns, roofs, doors, windows and more</p>
        </div>
        <div className={styles.feature}>
          <Layers size={24} />
          <h3>Scene Management</h3>
          <p>Multiple views, undo/redo, grid snapping, keyboard shortcuts</p>
        </div>
        <div className={styles.feature}>
          <Palette size={24} />
          <h3>Material Library</h3>
          <p>Concrete, brick, wood, marble, glass, steel and more</p>
        </div>
      </div>
    </div>
  );
}
