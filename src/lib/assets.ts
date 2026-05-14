import { AssetCategory } from '@/types';

export interface AssetDefinition {
  id: string;
  name: string;
  category: AssetCategory;
  description: string;
  icon: string;
  geometry: 'box' | 'cylinder' | 'sphere' | 'cone' | 'plane';
  geometryArgs: number[];
  defaultScale: [number, number, number];
  defaultColor: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  structural: 'Structural',
  openings: 'Openings',
  furniture: 'Furniture',
  decoration: 'Decoration',
  outdoor: 'Outdoor',
};

export interface MaterialPreset {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export const MATERIAL_PRESETS: MaterialPreset[] = [
  { id: 'concrete', name: 'Concrete', color: '#b0b0b0', roughness: 0.9, metalness: 0.0 },
  { id: 'brick', name: 'Brick', color: '#c0392b', roughness: 0.85, metalness: 0.0 },
  { id: 'wood', name: 'Wood', color: '#8B6914', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f0ead6', roughness: 0.3, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#a8d8ea', roughness: 0.1, metalness: 0.2 },
  { id: 'metal', name: 'Metal', color: '#7f8c8d', roughness: 0.4, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#fdf6e3', roughness: 0.95, metalness: 0.0 },
  { id: 'tile', name: 'Tile', color: '#dfe6e9', roughness: 0.5, metalness: 0.05 },
];

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', description: 'A standard wall segment', icon: '🧱', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#b0b0b0' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A flat floor slab', icon: '⬜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#9e9e9e' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A cylindrical support column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#bdbdbd' },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A horizontal support beam', icon: '📏', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.3], defaultColor: '#8d8d8d' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', description: 'An angled roof panel', icon: '🏠', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 4], defaultColor: '#c0392b' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A standard door', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.2, 0.1], defaultColor: '#8B6914' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A window pane', icon: '🪟', geometry: 'plane', geometryArgs: [1, 1], defaultScale: [1.2, 1.2, 1], defaultColor: '#a8d8ea' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A rectangular table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.75, 0.8], defaultColor: '#8B6914' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A simple chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#6d4c2a' },
  { id: 'bookshelf', name: 'Bookshelf', category: 'furniture', description: 'A tall bookshelf', icon: '📚', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 2, 0.35], defaultColor: '#5d3a1a' },
  { id: 'plant', name: 'Plant Pot', category: 'decoration', description: 'A decorative plant', icon: '🌱', geometry: 'cylinder', geometryArgs: [0.5, 0.4, 1, 12], defaultScale: [0.3, 0.5, 0.3], defaultColor: '#6b8e23' },
  { id: 'sphere-deco', name: 'Decorative Sphere', category: 'decoration', description: 'A decorative sphere', icon: '🔮', geometry: 'sphere', geometryArgs: [0.5, 24, 24], defaultScale: [0.5, 0.5, 0.5], defaultColor: '#e0e0e0' },
  { id: 'tree', name: 'Tree', category: 'outdoor', description: 'A simple tree shape', icon: '🌳', geometry: 'cone', geometryArgs: [0.5, 1, 8], defaultScale: [2, 4, 2], defaultColor: '#228B22' },
  { id: 'bench', name: 'Bench', category: 'outdoor', description: 'An outdoor bench', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.8, 0.5, 0.5], defaultColor: '#8B6914' },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
