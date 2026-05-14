import { useNavigate } from 'react-router-dom';
import { Box, BookOpen, Layers, Lightbulb, ArrowRight } from 'lucide-react';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Box size={28} color="var(--color-primary)" />
          <span className={styles.logoText}>EduArch3D</span>
        </div>
        <button
          className={styles.ctaSmall}
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </button>
      </header>

      <main className={styles.hero}>
        <h1 className={styles.heroTitle}>
          3D Architectural Design<br />
          <span className={styles.heroAccent}>for Students & Educators</span>
        </h1>
        <p className={styles.heroSub}>
          Place walls, doors, windows, furniture, and more on an interactive 3D canvas.
          Learn architectural concepts through hands-on design with realistic PBR materials,
          shadows, and lighting.
        </p>
        <button
          className={styles.ctaLarge}
          onClick={() => navigate('/dashboard')}
        >
          Start Designing <ArrowRight size={20} />
        </button>
      </main>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <Layers size={36} color="var(--color-primary)" />
          <h3>Predefined Asset Library</h3>
          <p>Walls, doors, windows, roofs, stairs, furniture, lights, and landscaping — all ready to place.</p>
        </div>
        <div className={styles.featureCard}>
          <Lightbulb size={36} color="var(--color-warning)" />
          <h3>Realistic Rendering</h3>
          <p>PBR materials, dynamic shadows, and environment lighting for lifelike visualization.</p>
        </div>
        <div className={styles.featureCard}>
          <BookOpen size={36} color="var(--color-success)" />
          <h3>Educational Focus</h3>
          <p>Guided tutorials, sample projects, and architectural tooltips to support learning.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>EduArch3D — Built for learning. Projects saved locally in your browser.</p>
      </footer>
    </div>
  );
}
