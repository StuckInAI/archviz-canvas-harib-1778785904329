import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { SceneObject } from '@/types';
import { getAssetById, getMaterialById } from '@/lib/assets';

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
    switch (asset.geometry) {
      case 'box':
        return new THREE.BoxGeometry(...(asset.geometryArgs as [number, number, number]));
      case 'cylinder':
        return new THREE.CylinderGeometry(...(asset.geometryArgs as [number, number, number, number]));
      case 'sphere':
        return new THREE.SphereGeometry(...(asset.geometryArgs as [number, number, number]));
      case 'cone':
        return new THREE.ConeGeometry(...(asset.geometryArgs as [number, number, number]));
      case 'plane':
        return new THREE.PlaneGeometry(...(asset.geometryArgs as [number, number]));
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
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <meshStandardMaterial
          color={matColor}
          roughness={roughness}
          metalness={metalness}
          transparent={asset?.geometry === 'plane'}
          opacity={asset?.geometry === 'plane' ? 0.9 : 1}
          side={asset?.geometry === 'plane' ? THREE.DoubleSide : THREE.FrontSide}
        />
      </mesh>
      {isSelected && (
        <lineSegments geometry={edgesGeo} renderOrder={999}>
          <lineBasicMaterial color="#2563eb" linewidth={2} />
        </lineSegments>
      )}
    </group>
  );
}
