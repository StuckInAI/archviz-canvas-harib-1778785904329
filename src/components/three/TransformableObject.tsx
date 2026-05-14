import { useRef, useEffect, useState } from 'react';
import { TransformControls } from '@react-three/drei';
import { useEditorStore } from '../../hooks/useEditorStore';
import type { SceneObject } from '../../hooks/useEditorStore';
import * as THREE from 'three';

interface Props {
  children: React.ReactNode;
  obj: SceneObject;
}

export default function TransformableObject({ children, obj }: Props) {
  const transformRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null!);
  const [attached, setAttached] = useState(false);
  const transformMode = useEditorStore((s) => s.transformMode);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const snapValue = useEditorStore((s) => s.snapValue);

  // We need stable references to avoid re-render loops
  const objIdRef = useRef(obj.id);
  objIdRef.current = obj.id;

  // Wait for group to mount before attaching
  useEffect(() => {
    // Small delay to ensure the group ref is ready
    const timer = requestAnimationFrame(() => {
      if (groupRef.current) {
        setAttached(true);
      }
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Handle transform events - use mouseUp only to batch update
  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    let isDragging = false;

    const onDraggingChanged = (event: any) => {
      isDragging = event.value;
    };

    const onMouseUp = () => {
      if (!groupRef.current) return;
      const target = groupRef.current;

      const position: [number, number, number] = [
        target.position.x,
        target.position.y,
        target.position.z,
      ];
      const rotation: [number, number, number] = [
        target.rotation.x,
        target.rotation.y,
        target.rotation.z,
      ];
      const scale: [number, number, number] = [
        target.scale.x,
        target.scale.y,
        target.scale.z,
      ];

      // Use getState to avoid triggering re-renders during transform
      const store = useEditorStore.getState();
      store.updateObject(objIdRef.current, { position, rotation, scale });
      store.pushHistory();
    };

    controls.addEventListener('dragging-changed', onDraggingChanged);
    controls.addEventListener('mouseUp', onMouseUp);

    return () => {
      controls.removeEventListener('dragging-changed', onDraggingChanged);
      controls.removeEventListener('mouseUp', onMouseUp);
    };
  }, [attached]);

  return (
    <>
      <group
        ref={groupRef}
        position={obj.position}
        rotation={obj.rotation}
        scale={obj.scale}
      >
        {children}
      </group>
      {attached && groupRef.current && (
        <TransformControls
          ref={transformRef}
          object={groupRef.current}
          mode={transformMode as 'translate' | 'rotate' | 'scale'}
          translationSnap={snapEnabled ? snapValue : undefined}
          rotationSnap={snapEnabled ? Math.PI / 12 : undefined}
          scaleSnap={snapEnabled ? 0.1 : undefined}
          size={0.7}
        />
      )}
    </>
  );
}
