import { Object3DNode, MaterialNode, BufferGeometryNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    hemisphereLight: Object3DNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>;
    pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
    spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
    line: Object3DNode<THREE.Line, typeof THREE.Line>;
    primitive: { object: any; [key: string]: any };
    planeGeometry: BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
    boxGeometry: BufferGeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
    sphereGeometry: BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
    cylinderGeometry: BufferGeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>;
    coneGeometry: BufferGeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>;
    meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    meshBasicMaterial: MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
    meshPhongMaterial: MaterialNode<THREE.MeshPhongMaterial, typeof THREE.MeshPhongMaterial>;
    lineBasicMaterial: MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
    shadowMaterial: MaterialNode<THREE.ShadowMaterial, typeof THREE.ShadowMaterial>;
    color: any;
    fog: any;
  }
}

export {};
