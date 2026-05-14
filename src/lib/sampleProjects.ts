import { SceneObject } from '@/types';

export const SAMPLE_OBJECTS: SceneObject[] = [
  { id: 'sample-wall-1', assetId: 'wall', name: 'Back Wall', position: [0, 1.5, -3], rotation: [0, 0, 0], scale: [6, 3, 0.2], materialId: 'concrete', visible: true },
  { id: 'sample-floor-1', assetId: 'floor', name: 'Ground Floor', position: [0, 0, 0], rotation: [0, 0, 0], scale: [6, 0.15, 6], materialId: 'tile', visible: true },
  { id: 'sample-column-1', assetId: 'column', name: 'Front Column', position: [3, 1.5, 3], rotation: [0, 0, 0], scale: [0.3, 3, 0.3], materialId: 'marble', visible: true },
];
