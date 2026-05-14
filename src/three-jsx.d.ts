import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      hemisphereLight: any;
      pointLight: any;
      spotLight: any;
      mesh: any;
      group: any;
      planeGeometry: any;
      boxGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      coneGeometry: any;
      shadowMaterial: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      lineSegments: any;
      lineBasicMaterial: any;
      primitive: any;
    }
  }
}

export {};
