import { Object3DNode, MaterialNode, BufferGeometryNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    hemisphereLight: Object3DNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>;
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
    planeGeometry: BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
    meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    shadowMaterial: MaterialNode<THREE.ShadowMaterial, typeof THREE.ShadowMaterial>;
    lineBasicMaterial: MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
  }
}
