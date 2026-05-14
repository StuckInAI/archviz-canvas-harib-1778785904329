import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>EduArch3D</h1>
        <p className={styles.subtitle}>
          A 3D architectural design tool for education. Build rooms, houses, and
          buildings using predefined architectural elements.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate('/dashboard')}
          >
            Open Dashboard
          </button>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>🏗️ Build</h3>
          <p>Place walls, floors, columns, doors, windows, and furniture.</p>
        </div>
        <div className={styles.feature}>
          <h3>🎨 Customize</h3>
          <p>Apply materials like brick, wood, marble, glass, and steel.</p>
        </div>
        <div className={styles.feature}>
          <h3>💾 Save</h3>
          <p>Auto-save projects locally. Manage multiple designs from the dashboard.</p>
        </div>
      </div>
    </div>
  );
}
