import { useMemo } from 'react';
import * as THREE from 'three';

export default function Ground({ onClick }: { onClick?: () => void }) {
  const groundTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base grass color
    ctx.fillStyle = '#4a7c3f';
    ctx.fillRect(0, 0, 1024, 1024);

    // Add variation for realism
    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const r = Math.random();
      if (r < 0.33) {
        ctx.fillStyle = '#3d6b34';
      } else if (r < 0.66) {
        ctx.fillStyle = '#5a8f4d';
      } else {
        ctx.fillStyle = '#68a55a';
      }
      const w = 1 + Math.random() * 4;
      const h = 1 + Math.random() * 4;
      ctx.fillRect(x, y, w, h);
    }

    // Add some darker patches
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const radius = 20 + Math.random() * 60;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, '#2d5a24');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    ctx.globalAlpha = 1.0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.02, 0]}
      receiveShadow
      onClick={onClick}
    >
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        map={groundTexture}
        roughness={0.95}
        metalness={0.0}
        color="#5a8f4d"
      />
    </mesh>
  );
}
