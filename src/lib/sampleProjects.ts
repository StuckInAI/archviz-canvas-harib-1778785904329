import { SceneObject } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export interface SampleProject {
  name: string;
  description: string;
  objects: SceneObject[];
}

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    name: 'Simple Room',
    description: 'A basic four-wall room with a floor',
    objects: [
      { id: uuidv4(), assetId: 'floor', name: 'Floor', position: [0, 0.075, 0], rotation: [0, 0, 0], scale: [6, 0.15, 6], materialId: 'concrete', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Back Wall', position: [0, 1.5, -3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Left Wall', position: [-3, 1.5, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Right Wall', position: [3, 1.5, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'Front Wall', position: [0, 1.5, 3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
    ],
  },
];
