import { useCallback } from 'react';
import { OrbitControls, Grid, ContactShadows } from '@react-three/drei';
import { useEditorStore } from '../../hooks/useEditorStore';
import SceneObjectMesh from './SceneObjectMesh';
import TransformableObject from './TransformableObject';

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
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.0}
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
      <hemisphereLight args={['#b1e1ff', '#b97a20', 0.25]} />

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

      {/* Ground plane for click-to-deselect and shadows */}
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
      />
    </>
  );
}
