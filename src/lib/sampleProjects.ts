import { SceneObject } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function createSampleObjects(): SceneObject[] {
  return [
    {
      id: uuidv4(),
      assetId: 'floor',
      name: 'Ground Floor',
      position: [0, 0.075, 0],
      rotation: [0, 0, 0],
      scale: [8, 0.15, 8],
      materialId: 'concrete',
      visible: true,
    },
    {
      id: uuidv4(),
      assetId: 'wall',
      name: 'Back Wall',
      position: [0, 1.5, -4],
      rotation: [0, 0, 0],
      scale: [8, 3, 0.2],
      materialId: 'plaster',
      visible: true,
    },
    {
      id: uuidv4(),
      assetId: 'wall',
      name: 'Left Wall',
      position: [-4, 1.5, 0],
      rotation: [0, Math.PI / 2, 0],
      scale: [8, 3, 0.2],
      materialId: 'brick',
      visible: true,
    },
    {
      id: uuidv4(),
      assetId: 'column',
      name: 'Corner Column',
      position: [4, 1.5, -4],
      rotation: [0, 0, 0],
      scale: [0.3, 3, 0.3],
      materialId: 'marble',
      visible: true,
    },
    {
      id: uuidv4(),
      assetId: 'table',
      name: 'Dining Table',
      position: [0, 0.375, 0],
      rotation: [0, 0, 0],
      scale: [1.5, 0.75, 0.8],
      materialId: 'wood',
      visible: true,
    },
  ];
}
