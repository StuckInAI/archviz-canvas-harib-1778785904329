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
          An interactive 3D architectural design tool for education.
          Build rooms, houses, and entire buildings using predefined elements.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </button>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🧱</span>
            <span>Structural Elements</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎨</span>
            <span>Material Library</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📐</span>
            <span>Precise Controls</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💾</span>
            <span>Auto-Save</span>
          </div>
        </div>
      </div>
    </div>
  );
}
