import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.logoWrap}>
          <Building2 size={48} className={styles.logoIcon} />
        </div>
        <h1 className={styles.title}>EduArch3D</h1>
        <p className={styles.subtitle}>
          A visual 3D architectural design tool for learning building concepts.
          Place walls, floors, doors, furniture and more in an interactive 3D canvas.
        </p>
        <button
          className={styles.ctaBtn}
          onClick={() => navigate('/dashboard')}
        >
          Open Dashboard <ArrowRight size={18} />
        </button>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>🏗️ Drag & Place</h3>
          <p>Choose from a library of architectural elements and place them in 3D space.</p>
        </div>
        <div className={styles.feature}>
          <h3>🎨 Materials</h3>
          <p>Apply concrete, brick, wood, marble, glass and more to any element.</p>
        </div>
        <div className={styles.feature}>
          <h3>💾 Auto-Save</h3>
          <p>Projects are saved automatically to your browser's local storage.</p>
        </div>
      </div>
    </div>
  );
}
