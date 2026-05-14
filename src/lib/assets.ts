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
  { id: 'brick', name: 'Brick', color: '#c1440e', roughness: 0.85, metalness: 0.0 },
  { id: 'wood', name: 'Wood', color: '#8B6914', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f0ead6', roughness: 0.3, metalness: 0.05 },
  { id: 'glass', name: 'Glass', color: '#87ceeb', roughness: 0.1, metalness: 0.1 },
  { id: 'steel', name: 'Steel', color: '#71797E', roughness: 0.4, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#f5f5dc', roughness: 0.95, metalness: 0.0 },
  { id: 'tile', name: 'Tile', color: '#d2b48c', roughness: 0.5, metalness: 0.0 },
];

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', description: 'A standard wall segment', icon: '🧱', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#b0b0b0' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A flat floor slab', icon: '⬜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#999999' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A cylindrical support column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#b0b0b0' },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A horizontal beam', icon: '📏', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.2], defaultColor: '#888888' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', description: 'An angled roof panel', icon: '🏠', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 4], defaultColor: '#8B4513' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A standard door opening', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.1, 0.1], defaultColor: '#8B6914' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A glass window panel', icon: '🪟', geometry: 'plane', geometryArgs: [1, 1], defaultScale: [1.2, 1.2, 1], defaultColor: '#87ceeb' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A rectangular table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.75, 0.8], defaultColor: '#8B6914' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A simple chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#654321' },
  { id: 'sphere-deco', name: 'Sphere', category: 'decoration', description: 'A decorative sphere', icon: '🔵', geometry: 'sphere', geometryArgs: [0.5, 32, 32], defaultScale: [1, 1, 1], defaultColor: '#4a90d9' },
  { id: 'cone-deco', name: 'Cone', category: 'decoration', description: 'A decorative cone', icon: '🔺', geometry: 'cone', geometryArgs: [0.5, 1, 16], defaultScale: [1, 1.5, 1], defaultColor: '#d94a4a' },
  { id: 'tree', name: 'Tree', category: 'outdoor', description: 'A simple tree shape', icon: '🌲', geometry: 'cone', geometryArgs: [0.5, 1, 8], defaultScale: [2, 4, 2], defaultColor: '#228B22' },
  { id: 'bench', name: 'Bench', category: 'outdoor', description: 'An outdoor bench', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [2, 0.5, 0.5], defaultColor: '#8B6914' },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
