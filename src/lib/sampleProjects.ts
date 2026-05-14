import { SceneObject } from '@/types';

export const SAMPLE_OBJECTS: SceneObject[] = [
  {
    id: 'sample-floor',
    assetId: 'floor',
    name: 'Ground Floor',
    position: [0, 0.075, 0],
    rotation: [0, 0, 0],
    scale: [8, 0.15, 8],
    materialId: 'concrete',
    visible: true,
  },
  {
    id: 'sample-wall-1',
    assetId: 'wall',
    name: 'Back Wall',
    position: [0, 1.5, -4],
    rotation: [0, 0, 0],
    scale: [8, 3, 0.2],
    materialId: 'plaster',
    visible: true,
  },
  {
    id: 'sample-wall-2',
    assetId: 'wall',
    name: 'Left Wall',
    position: [-4, 1.5, 0],
    rotation: [0, Math.PI / 2, 0],
    scale: [8, 3, 0.2],
    materialId: 'brick',
    visible: true,
  },
];
