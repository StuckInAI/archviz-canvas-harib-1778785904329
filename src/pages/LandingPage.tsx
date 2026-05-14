import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.iconWrap}>
          <Building2 size={48} />
        </div>
        <h1 className={styles.title}>EduArch3D</h1>
        <p className={styles.subtitle}>
          A web-based 3D architectural design tool for students and educators.
          Build rooms, houses, and buildings with predefined architectural elements.
        </p>
        <button className={styles.cta} onClick={() => navigate('/dashboard')}>
          Get Started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
