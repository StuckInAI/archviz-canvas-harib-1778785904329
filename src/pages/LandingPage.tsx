import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>EduArch3D</h1>
        <p className={styles.subtitle}>
          An interactive 3D architectural design tool for education. Build rooms,
          houses, and structures with drag-and-drop simplicity.
        </p>
        <button
          className={styles.cta}
          onClick={() => navigate('/dashboard')}
        >
          Open Dashboard
        </button>
      </div>
    </div>
  );
}
