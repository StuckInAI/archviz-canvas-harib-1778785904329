import { Project, SceneObject } from '@/types';
import { v4 as uuidv4 } from 'uuid';

function makeObj(assetId: string, name: string, pos: [number, number, number], scale: [number, number, number], materialId: string): SceneObject {
  return {
    id: uuidv4(),
    assetId,
    name,
    position: pos,
    rotation: [0, 0, 0],
    scale,
    materialId,
    visible: true,
  };
}

export function getSampleProjects(): Project[] {
  return [
    {
      id: 'sample-simple-house',
      name: 'Simple House',
      description: 'A basic single-room house with walls, a door, a window, and a gabled roof. Great starting point for learning.',
      objects: [
        makeObj('floor-slab', 'Floor', [0, 0, 0], [6, 0.15, 6], 'wood-oak'),
        makeObj('wall-straight', 'Back Wall', [0, 1.5, -3], [6, 3, 0.2], 'drywall-white'),
        makeObj('wall-straight', 'Left Wall', [-3, 1.5, 0], [0.2, 3, 6], 'drywall-white'),
        makeObj('wall-straight', 'Right Wall', [3, 1.5, 0], [0.2, 3, 6], 'drywall-white'),
        makeObj('wall-straight', 'Front Wall Left', [-1.75, 1.5, 3], [1.5, 3, 0.2], 'drywall-white'),
        makeObj('wall-straight', 'Front Wall Right', [1.75, 1.5, 3], [1.5, 3, 0.2], 'drywall-white'),
        makeObj('door-single', 'Front Door', [0, 1.1, 3], [1, 2.2, 0.1], 'wood-walnut'),
        makeObj('window-standard', 'Side Window', [3, 1.8, 0], [0.08, 1.2, 1.2], 'glass'),
        makeObj('roof-gabled', 'Roof', [0, 3.8, 0], [7, 2, 7], 'tile-terracotta'),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-classroom',
      name: 'Classroom',
      description: 'A typical classroom layout with desks, chairs, a bookshelf, and ceiling lights. Perfect for educational architecture study.',
      objects: [
        makeObj('floor-slab', 'Floor', [0, 0, 0], [10, 0.15, 8], 'tile-white'),
        makeObj('wall-straight', 'Front Wall', [0, 1.5, -4], [10, 3, 0.2], 'drywall-cream'),
        makeObj('wall-straight', 'Back Wall', [0, 1.5, 4], [10, 3, 0.2], 'drywall-cream'),
        makeObj('wall-straight', 'Left Wall', [-5, 1.5, 0], [0.2, 3, 8], 'drywall-cream'),
        makeObj('wall-straight', 'Right Wall', [5, 1.5, 0], [0.2, 3, 8], 'drywall-cream'),
        makeObj('desk', 'Teacher Desk', [0, 0.375, -3], [1.6, 0.75, 0.8], 'wood-oak'),
        makeObj('chair', 'Teacher Chair', [0, 0.45, -2.3], [0.5, 0.9, 0.5], 'wood-walnut'),
        makeObj('desk', 'Student Desk 1', [-2, 0.375, 0], [1.2, 0.75, 0.6], 'wood-oak'),
        makeObj('desk', 'Student Desk 2', [0, 0.375, 0], [1.2, 0.75, 0.6], 'wood-oak'),
        makeObj('desk', 'Student Desk 3', [2, 0.375, 0], [1.2, 0.75, 0.6], 'wood-oak'),
        makeObj('desk', 'Student Desk 4', [-2, 0.375, 2], [1.2, 0.75, 0.6], 'wood-oak'),
        makeObj('desk', 'Student Desk 5', [0, 0.375, 2], [1.2, 0.75, 0.6], 'wood-oak'),
        makeObj('desk', 'Student Desk 6', [2, 0.375, 2], [1.2, 0.75, 0.6], 'wood-oak'),
        makeObj('bookshelf', 'Bookshelf', [-4.5, 1, -3.5], [0.8, 2, 0.35], 'wood-walnut'),
        makeObj('ceiling-light', 'Light 1', [-2, 2.9, 0], [0.5, 0.15, 0.5], 'metal'),
        makeObj('ceiling-light', 'Light 2', [2, 2.9, 0], [0.5, 0.15, 0.5], 'metal'),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-studio-apartment',
      name: 'Studio Apartment',
      description: 'A compact open-plan studio apartment with living, sleeping, kitchen, and bathroom zones.',
      objects: [
        makeObj('floor-slab', 'Floor', [0, 0, 0], [8, 0.15, 6], 'wood-oak'),
        makeObj('wall-straight', 'North Wall', [0, 1.5, -3], [8, 3, 0.2], 'drywall-white'),
        makeObj('wall-straight', 'South Wall', [0, 1.5, 3], [8, 3, 0.2], 'drywall-white'),
        makeObj('wall-straight', 'West Wall', [-4, 1.5, 0], [0.2, 3, 6], 'drywall-white'),
        makeObj('wall-straight', 'East Wall', [4, 1.5, 0], [0.2, 3, 6], 'drywall-white'),
        makeObj('bed', 'Bed', [-2.5, 0.3, -1.5], [1.6, 0.6, 2.1], 'drywall-cream'),
        makeObj('sofa', 'Sofa', [1.5, 0.425, 1], [2, 0.85, 0.9], 'drywall-blue'),
        makeObj('table', 'Coffee Table', [1.5, 0.375, 0], [1, 0.45, 0.6], 'wood-oak'),
        makeObj('kitchen-cabinet', 'Kitchen Counter', [3.3, 0.45, -2], [0.6, 0.9, 2], 'drywall-white'),
        makeObj('sink', 'Kitchen Sink', [3.3, 0.425, -1], [0.5, 0.85, 0.5], 'metal'),
        makeObj('toilet', 'Toilet', [-3.3, 0.35, 2], [0.4, 0.7, 0.65], 'tile-white'),
        makeObj('sink', 'Bathroom Sink', [-3.3, 0.425, 1], [0.5, 0.85, 0.4], 'tile-white'),
        makeObj('ceiling-light', 'Main Light', [0, 2.9, 0], [0.6, 0.15, 0.6], 'metal'),
        makeObj('floor-lamp', 'Floor Lamp', [-1, 0.8, 1.5], [0.25, 1.6, 0.25], 'metal'),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}
