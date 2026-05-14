import { v4 as uuidv4 } from 'uuid';
import { SceneObject } from '@/types';

export interface SampleProject {
  name: string;
  description: string;
  objects: SceneObject[];
}

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    name: 'Simple Room',
    description: 'A basic room with four walls and a floor',
    objects: [
      { id: uuidv4(), assetId: 'floor', name: 'Floor', position: [0, 0.075, 0], rotation: [0, 0, 0], scale: [6, 0.15, 6], materialId: 'concrete', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Back Wall', position: [0, 1.5, -3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Left Wall', position: [-3, 1.5, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Right Wall', position: [3, 1.5, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Front Wall', position: [0, 1.5, 3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
    ],
  },
  {
    name: 'Furnished Office',
    description: 'A small office with desk, chair, and bookshelf',
    objects: [
      { id: uuidv4(), assetId: 'floor', name: 'Floor', position: [0, 0.075, 0], rotation: [0, 0, 0], scale: [8, 0.15, 6], materialId: 'wood', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Back Wall', position: [0, 1.5, -3], rotation: [0, 0, 0], scale: [8, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'table', name: 'Desk', position: [0, 0.375, -2], rotation: [0, 0, 0], scale: [1.5, 0.75, 0.8], materialId: 'wood', visible: true },
      { id: uuidv4(), assetId: 'chair', name: 'Office Chair', position: [0, 0.45, -1], rotation: [0, 0, 0], scale: [0.5, 0.9, 0.5], materialId: 'metal', visible: true },
      { id: uuidv4(), assetId: 'bookshelf', name: 'Bookshelf', position: [-3.5, 1, -2.5], rotation: [0, 0, 0], scale: [1.2, 2, 0.35], materialId: 'wood', visible: true },
    ],
  },
];
