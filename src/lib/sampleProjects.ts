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
      { id: uuidv4(), assetId: 'wall', name: 'North Wall', position: [0, 1.5, -3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'South Wall', position: [0, 1.5, 3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'West Wall', position: [-3, 1.5, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
      { id: uuidv4(), assetId: 'wall', name: 'East Wall', position: [3, 1.5, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 3, 0.2], materialId: 'plaster', visible: true },
    ],
  },
  {
    name: 'Garden Scene',
    description: 'An outdoor garden with trees and furniture',
    objects: [
      { id: uuidv4(), assetId: 'floor', name: 'Ground', position: [0, 0.075, 0], rotation: [0, 0, 0], scale: [12, 0.15, 12], materialId: 'terracotta', visible: true },
      { id: uuidv4(), assetId: 'tree', name: 'Tree 1', position: [-3, 1.5, -3], rotation: [0, 0, 0], scale: [2, 3, 2], materialId: 'wood_dark', visible: true },
      { id: uuidv4(), assetId: 'tree', name: 'Tree 2', position: [4, 1.5, -2], rotation: [0, 0.5, 0], scale: [2, 3, 2], materialId: 'wood_dark', visible: true },
      { id: uuidv4(), assetId: 'bush', name: 'Bush', position: [1, 0.4, 2], rotation: [0, 0, 0], scale: [1, 0.8, 1], materialId: 'wood_light', visible: true },
      { id: uuidv4(), assetId: 'table', name: 'Garden Table', position: [0, 0.4, 0], rotation: [0, 0, 0], scale: [1.5, 0.8, 0.8], materialId: 'wood_light', visible: true },
      { id: uuidv4(), assetId: 'fence', name: 'Fence', position: [0, 0.6, -5.5], rotation: [0, 0, 0], scale: [12, 1.2, 0.08], materialId: 'wood_light', visible: true },
    ],
  },
  {
    name: 'Classical Pavilion',
    description: 'A small pavilion with columns and a roof',
    objects: [
      { id: uuidv4(), assetId: 'floor', name: 'Base', position: [0, 0.075, 0], rotation: [0, 0, 0], scale: [5, 0.3, 5], materialId: 'marble', visible: true },
      { id: uuidv4(), assetId: 'column', name: 'Column FL', position: [-2, 1.5, 2], rotation: [0, 0, 0], scale: [0.3, 3, 0.3], materialId: 'marble', visible: true },
      { id: uuidv4(), assetId: 'column', name: 'Column FR', position: [2, 1.5, 2], rotation: [0, 0, 0], scale: [0.3, 3, 0.3], materialId: 'marble', visible: true },
      { id: uuidv4(), assetId: 'column', name: 'Column BL', position: [-2, 1.5, -2], rotation: [0, 0, 0], scale: [0.3, 3, 0.3], materialId: 'marble', visible: true },
      { id: uuidv4(), assetId: 'column', name: 'Column BR', position: [2, 1.5, -2], rotation: [0, 0, 0], scale: [0.3, 3, 0.3], materialId: 'marble', visible: true },
      { id: uuidv4(), assetId: 'roof', name: 'Roof', position: [0, 3.1, 0], rotation: [0, 0, 0], scale: [5.5, 0.15, 5.5], materialId: 'terracotta', visible: true },
    ],
  },
];
