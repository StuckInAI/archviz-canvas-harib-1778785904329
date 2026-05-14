import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>🏗️</span> EduArch3D
        </h1>
        <p className={styles.subtitle}>
          An educational 3D architectural design tool. Build rooms, houses, and
          buildings using predefined elements — right in your browser.
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
            <span>Drag & place walls, floors, roofs</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎨</span>
            <span>Apply materials & textures</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📐</span>
            <span>Move, rotate, scale with precision</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💾</span>
            <span>Auto-save to local storage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
