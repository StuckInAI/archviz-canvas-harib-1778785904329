import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useEditorStore } from '../../hooks/useEditorStore';
import SceneContent from './SceneContent';

export default function SceneCanvas() {
  const viewMode = useEditorStore((s) => s.viewMode);

  const isOrtho = viewMode !== 'perspective';

  let cameraPos: [number, number, number] = [12, 10, 12];
  if (viewMode === 'top') {
    cameraPos = [0, 25, 0.001];
  } else if (viewMode === 'front') {
    cameraPos = [0, 5, 25];
  } else if (viewMode === 'side') {
    cameraPos = [25, 5, 0];
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas
        shadows
        camera={{
          position: cameraPos,
          fov: 50,
          near: 0.1,
          far: 500,
        }}
        orthographic={isOrtho}
        gl={{
          antialias: true,
          toneMapping: 3,
          toneMappingExposure: 1.1,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
        onPointerMissed={() => {
          useEditorStore.getState().selectObject(null);
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
