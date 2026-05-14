import { useCallback } from 'react';
import { OrbitControls, Grid, ContactShadows, Environment } from '@react-three/drei';
import { useEditorStore } from '@/hooks/useEditorStore';
import SceneObjectMesh from '@/components/three/SceneObjectMesh';

export default function SceneContent() {
  const objects = useEditorStore((s) => s.objects);
  const selectedObjectId = useEditorStore((s) => s.selectedObjectId);
  const selectObject = useEditorStore((s) => s.selectObject);
  const gridVisible = useEditorStore((s) => s.gridVisible);
  const viewMode = useEditorStore((s) => s.viewMode);

  const handleMissedClick = useCallback(() => {
    selectObject(null);
  }, [selectObject]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} />
      <hemisphereLight args={['#b1e1ff', '#b97a20', 0.3]} />

      {/* Environment for PBR reflections */}
      <Environment preset="city" />

      {/* Grid */}
      {gridVisible && (
        <Grid
          args={[50, 50]}
          position={[0, -0.01, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6e6e6e"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9d9d9d"
          fadeDistance={40}
          fadeStrength={1}
          infiniteGrid
        />
      )}

      {/* Ground plane for shadows and click-to-deselect */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
        onClick={handleMissedClick}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>

      {/* Contact shadows */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={40}
        blur={2}
        far={10}
      />

      {/* Scene Objects */}
      {objects.map((obj) => (
        <SceneObjectMesh
          key={obj.id}
          obj={obj}
          isSelected={obj.id === selectedObjectId}
          onSelect={() => selectObject(obj.id)}
        />
      ))}

      {/* Orbit Controls */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.1}
        maxPolarAngle={viewMode === 'top' ? 0.01 : Math.PI / 2 + 0.3}
      />
    </>
  );
}
