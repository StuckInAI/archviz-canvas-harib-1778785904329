import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { getAssetById, getMaterialById } from '../../lib/assets';
import type { SceneObject } from '../../hooks/useEditorStore';

type SceneObjectMeshProps = {
  obj: SceneObject;
  isSelected: boolean;
  onSelect: () => void;
};

export default function SceneObjectMesh({ obj, isSelected, onSelect }: SceneObjectMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const asset = getAssetById(obj.assetId);
  const material = getMaterialById(obj.materialId);

  const geometry = useMemo(() => {
    if (!asset) return new THREE.BoxGeometry(1, 1, 1);
    const args = asset.geometryArgs;
    switch (asset.geometry) {
      case 'box':
        return new THREE.BoxGeometry(args[0] || 1, args[1] || 1, args[2] || 1);
      case 'cylinder':
        return new THREE.CylinderGeometry(args[0] || 0.5, args[1] || 0.5, args[2] || 1, args[3] || 16);
      case 'sphere':
        return new THREE.SphereGeometry(args[0] || 0.5, args[1] || 32, args[2] || 32);
      case 'cone':
        return new THREE.ConeGeometry(args[0] || 0.5, args[1] || 1, args[2] || 16);
      case 'plane':
        return new THREE.PlaneGeometry(args[0] || 1, args[1] || 1);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [asset]);

  const edgesGeo = useMemo(() => {
    return new THREE.EdgesGeometry(geometry);
  }, [geometry]);

  const matColor = material ? material.color : (asset ? asset.defaultColor : '#cccccc');
  const roughness = material ? material.roughness : 0.5;
  const metalness = material ? material.metalness : 0.0;

  if (!obj.visible) return null;

  // When selected, render without group transform (TransformableObject will handle it)
  if (isSelected) {
    return (
      <>
        <mesh
          ref={meshRef}
          name={obj.id}
          geometry={geometry}
          castShadow
          receiveShadow
          onClick={(e: any) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <meshStandardMaterial
            color={matColor}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
        <lineSegments geometry={edgesGeo} renderOrder={999}>
          <lineBasicMaterial color="#2563eb" linewidth={2} />
        </lineSegments>
      </>
    );
  }

  return (
    <group
      position={obj.position}
      rotation={obj.rotation}
      scale={obj.scale}
    >
      <mesh
        ref={meshRef}
        name={obj.id}
        geometry={geometry}
        castShadow
        receiveShadow
        onClick={(e: any) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <meshStandardMaterial
          color={matColor}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
    </group>
  );
}
