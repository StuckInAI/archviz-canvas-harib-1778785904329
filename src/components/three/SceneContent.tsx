import { useCallback } from 'react';
import { OrbitControls, Grid, ContactShadows } from '@react-three/drei';
import { useEditorStore } from '../../hooks/useEditorStore';
import SceneObjectMesh from './SceneObjectMesh';
import TransformableObject from './TransformableObject';
import SkyDome from './Sky';
import Ground from './Ground';

export default function SceneContent() {
  const objects = useEditorStore((s) => s.objects);
  const selectedObjectId = useEditorStore((s) => s.selectedObjectId);
  const selectObject = useEditorStore((s) => s.selectObject);
  const gridVisible = useEditorStore((s) => s.gridVisible);
  const viewMode = useEditorStore((s) => s.viewMode);

  const handleMissedClick = useCallback(() => {
    selectObject(null);
  }, [selectObject]);

  const selectedObj = objects.find((o) => o.id === selectedObjectId);

  return (
    <>
      {/* Sky dome */}
      <SkyDome />

      {/* Fog for depth */}
      <fog attach="fog" args={['#87ceeb', 80, 220]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} color="#b8d4e8" />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.001}
        color="#fff5e6"
      />
      <directionalLight position={[-8, 12, -8]} intensity={0.25} color="#c4d4ff" />
      <hemisphereLight args={['#87ceeb', '#4a7c3f', 0.35]} />

      {/* Sun glow (a simple point light to simulate warm sun) */}
      <pointLight position={[50, 40, 30]} intensity={0.3} color="#ffd699" distance={150} />

      {/* Grid */}
      {gridVisible && (
        <Grid
          args={[50, 50]}
          position={[0, 0.01, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#5a7a50"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#7a9a6a"
          fadeDistance={40}
          fadeStrength={1.5}
          infiniteGrid
        />
      )}

      {/* Realistic ground terrain */}
      <Ground onClick={handleMissedClick} />

      {/* Contact shadows for grounded feel */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.35}
        scale={50}
        blur={2.5}
        far={12}
        color="#1a3a1a"
      />

      {/* Non-selected scene objects */}
      {objects
        .filter((obj) => obj.id !== selectedObjectId)
        .map((obj) => (
          <SceneObjectMesh
            key={obj.id}
            obj={obj}
            isSelected={false}
            onSelect={() => selectObject(obj.id)}
          />
        ))}

      {/* Selected object with transform controls */}
      {selectedObj && (
        <TransformableObject key={selectedObj.id + '-transform'} obj={selectedObj}>
          <SceneObjectMesh
            obj={selectedObj}
            isSelected={true}
            onSelect={() => selectObject(selectedObj.id)}
          />
        </TransformableObject>
      )}

      {/* Orbit Controls */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.1}
        maxPolarAngle={viewMode === 'top' ? 0.01 : Math.PI / 2 + 0.3}
        maxDistance={150}
        minDistance={2}
      />
    </>
  );
}
