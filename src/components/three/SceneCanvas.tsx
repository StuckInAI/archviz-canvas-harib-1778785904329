import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useEditorStore } from '@/hooks/useEditorStore';
import SceneContent from '@/components/three/SceneContent';
import styles from './SceneCanvas.module.css';

export default function SceneCanvas() {
  const viewMode = useEditorStore((s) => s.viewMode);

  const isOrtho = viewMode !== 'perspective';

  let cameraPosition: [number, number, number] = [10, 10, 10];
  let cameraUp: [number, number, number] = [0, 1, 0];

  if (viewMode === 'top') {
    cameraPosition = [0, 20, 0.001];
  } else if (viewMode === 'front') {
    cameraPosition = [0, 5, 20];
  } else if (viewMode === 'side') {
    cameraPosition = [20, 5, 0];
  }

  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        shadows
        camera={{
          position: cameraPosition,
          up: cameraUp,
          fov: 50,
          near: 0.1,
          far: 500,
        }}
        orthographic={isOrtho}
        gl={{ antialias: true, toneMapping: 3 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
