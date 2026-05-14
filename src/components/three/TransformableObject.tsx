import { useRef, useEffect } from 'react';
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
  const groupRef = useRef<THREE.Group>(null);
  const transformMode = useEditorStore((s) => s.transformMode);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const snapValue = useEditorStore((s) => s.snapValue);
  const updateObject = useEditorStore((s) => s.updateObject);
  const pushHistory = useEditorStore((s) => s.pushHistory);

  // Map transform mode names
  const modeMap: Record<string, string> = {
    translate: 'translate',
    rotate: 'rotate',
    scale: 'scale',
  };

  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    const callback = () => {
      const target = controls.object;
      if (!target) return;

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

      updateObject(obj.id, { position, rotation, scale });
    };

    const mouseUp = () => {
      pushHistory();
    };

    controls.addEventListener('change', callback);
    controls.addEventListener('mouseUp', mouseUp);

    return () => {
      controls.removeEventListener('change', callback);
      controls.removeEventListener('mouseUp', mouseUp);
    };
  }, [obj.id, updateObject, pushHistory]);

  // Detach transform controls from orbit controls
  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    const onDraggingChanged = (event: any) => {
      // Find orbit controls and disable/enable them
      const orbitControls = (controls as any)?.parent?.parent;
      // We handle this via the event system instead
    };

    controls.addEventListener('dragging-changed', onDraggingChanged);
    return () => {
      controls.removeEventListener('dragging-changed', onDraggingChanged);
    };
  }, []);

  return (
    <TransformControls
      ref={transformRef}
      object={groupRef.current || undefined}
      mode={modeMap[transformMode] as 'translate' | 'rotate' | 'scale'}
      translationSnap={snapEnabled ? snapValue : undefined}
      rotationSnap={snapEnabled ? Math.PI / 12 : undefined}
      scaleSnap={snapEnabled ? 0.1 : undefined}
      size={0.7}
    >
      <group ref={groupRef} position={obj.position} rotation={obj.rotation} scale={obj.scale}>
        {children}
      </group>
    </TransformControls>
  );
}
