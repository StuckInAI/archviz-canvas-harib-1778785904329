import { Object3DNode, BufferGeometryNode, MaterialNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
    edgesGeometry: BufferGeometryNode<THREE.EdgesGeometry, typeof THREE.EdgesGeometry>;
    lineBasicMaterial: MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
  }
}
