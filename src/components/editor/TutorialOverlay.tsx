import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './TutorialOverlay.module.css';

type TutorialOverlayProps = {
  onDismiss: () => void;
};

const STEPS = [
  {
    title: 'Welcome to EduArch3D! 🏗️',
    text: 'This is your 3D architectural design canvas. You can build rooms, houses, and entire buildings using predefined architectural elements.',
  },
  {
    title: 'Asset Library (Left Sidebar)',
    text: 'Browse categories like Structural, Openings, Furniture, and more. Click any asset to place it on the canvas at the origin.',
  },
  {
    title: 'Transform Objects',
    text: 'Select an object by clicking it. Use G (Move), R (Rotate), S (Scale) to switch transform modes. Drag the colored arrows to transform.',
  },
  {
    title: 'Properties Panel (Right)',
    text: 'When an object is selected, see its position, rotation, scale, and material. Change materials to brick, wood, marble, glass, and more!',
  },
  {
    title: 'Camera Controls',
    text: 'Left-click + drag to orbit. Right-click + drag to pan. Scroll to zoom. Use the view buttons (Persp, Top, Front, Side) for preset views.',
  },
  {
    title: 'Save & Manage',
    text: 'Projects auto-save every few seconds. Use the Dashboard to manage multiple projects. Try the Sample Projects to get started!',
  },
];

export default function TutorialOverlay({ onDismiss }: TutorialOverlayProps) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onDismiss}>
          <X size={18} />
        </button>

        <div className={styles.stepIndicator}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={i === step ? styles.dotActive : styles.dot}
            />
          ))}
        </div>

        <h2 className={styles.title}>{current.title}</h2>
        <p className={styles.text}>{current.text}</p>

        <div className={styles.nav}>
          {step > 0 && (
            <button className={styles.navBtn} onClick={() => setStep(step - 1)}>
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <div className={styles.spacer} />
          {step < STEPS.length - 1 ? (
            <button className={styles.navBtnPrimary} onClick={() => setStep(step + 1)}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button className={styles.navBtnPrimary} onClick={onDismiss}>
              Start Building!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
