import { Object3DNode, MaterialNode, BufferGeometryNode, LightNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    ambientLight: LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    directionalLight: LightNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    hemisphereLight: LightNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>;
    pointLight: LightNode<THREE.PointLight, typeof THREE.PointLight>;
    spotLight: LightNode<THREE.SpotLight, typeof THREE.SpotLight>;
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
    line: Object3DNode<THREE.Line, typeof THREE.Line>;
    planeGeometry: BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
    boxGeometry: BufferGeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
    sphereGeometry: BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
    cylinderGeometry: BufferGeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>;
    coneGeometry: BufferGeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>;
    meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    meshBasicMaterial: MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
    lineBasicMaterial: MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
    shadowMaterial: MaterialNode<THREE.ShadowMaterial, typeof THREE.ShadowMaterial>;
  }
}
