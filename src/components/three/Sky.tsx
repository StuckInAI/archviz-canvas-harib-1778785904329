import { useMemo } from 'react';
import * as THREE from 'three';

export default function SkyDome() {
  const skyGeo = useMemo(() => new THREE.SphereGeometry(200, 32, 32), []);

  const skyMat = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0a1628');    // deep blue top
    gradient.addColorStop(0.15, '#1a3a5c'); // dark blue
    gradient.addColorStop(0.35, '#4a90c4'); // medium blue
    gradient.addColorStop(0.55, '#87ceeb'); // sky blue
    gradient.addColorStop(0.7, '#b8dff0');  // light blue
    gradient.addColorStop(0.82, '#f0e68c'); // warm horizon glow
    gradient.addColorStop(0.88, '#ffd699'); // golden horizon
    gradient.addColorStop(0.93, '#ffb347'); // warm orange
    gradient.addColorStop(1.0, '#ff8c42');  // deep orange at bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Add some subtle cloud-like wisps
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = 180 + Math.random() * 120;
      const w = 40 + Math.random() * 100;
      const h = 5 + Math.random() * 15;
      ctx.beginPath();
      ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
  }, []);

  return (
    <mesh geometry={skyGeo} material={skyMat} renderOrder={-1} />
  );
}
