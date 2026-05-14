import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          🏗️ EduArch3D
        </h1>
        <p className={styles.subtitle}>
          A browser-based 3D architectural design tool for students and educators.
          Build rooms, houses, and buildings using predefined architectural elements.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate('/dashboard')}
          >
            Open Dashboard
          </button>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🧱</span>
            <span>Walls, Floors, Columns</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🪟</span>
            <span>Doors & Windows</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🪑</span>
            <span>Furniture & Décor</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💾</span>
            <span>Auto-save Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
