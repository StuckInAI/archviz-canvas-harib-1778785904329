import '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    ambientLight: any;
    directionalLight: any;
    hemisphereLight: any;
    mesh: any;
    group: any;
    lineSegments: any;
    planeGeometry: any;
    boxGeometry: any;
    cylinderGeometry: any;
    sphereGeometry: any;
    coneGeometry: any;
    meshStandardMaterial: any;
    shadowMaterial: any;
    lineBasicMaterial: any;
  }
}
