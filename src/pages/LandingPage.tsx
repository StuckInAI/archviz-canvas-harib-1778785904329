import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Blocks, Layers, Lightbulb, BookOpen } from 'lucide-react';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Building2 size={28} />
          <span>EduArch3D</span>
        </div>
        <button className={styles.ctaBtn} onClick={() => navigate('/dashboard')}>
          Open Dashboard <ArrowRight size={16} />
        </button>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Learn Architecture in 3D</h1>
        <p className={styles.heroSub}>
          Build, explore, and understand architectural concepts with an interactive 3D design canvas.
          Place walls, columns, roofs, and furniture to create buildings from scratch.
        </p>
        <button className={styles.heroBtn} onClick={() => navigate('/dashboard')}>
          Start Building <ArrowRight size={18} />
        </button>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <Blocks size={32} className={styles.featureIcon} />
          <h3>Drag & Place Assets</h3>
          <p>Choose from structural elements, furniture, exterior objects, and decorations.</p>
        </div>
        <div className={styles.feature}>
          <Layers size={32} className={styles.featureIcon} />
          <h3>Transform & Style</h3>
          <p>Move, rotate, scale objects. Apply materials like brick, wood, marble, and glass.</p>
        </div>
        <div className={styles.feature}>
          <Lightbulb size={32} className={styles.featureIcon} />
          <h3>Multiple Views</h3>
          <p>Switch between perspective, top, front, and side views for precise placement.</p>
        </div>
        <div className={styles.feature}>
          <BookOpen size={32} className={styles.featureIcon} />
          <h3>Educational Focus</h3>
          <p>Perfect for students learning architectural design fundamentals.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>EduArch3D — Educational 3D Architecture Tool</p>
      </footer>
    </div>
  );
}
