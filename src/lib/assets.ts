import { AssetCategory } from '@/types';

export interface AssetDefinition {
  id: string;
  name: string;
  category: AssetCategory;
  icon: string;
  description: string;
  geometry: 'box' | 'cylinder' | 'sphere' | 'cone' | 'plane';
  geometryArgs: number[];
  defaultScale: [number, number, number];
  defaultColor: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  structural: 'Structural',
  openings: 'Openings',
  furniture: 'Furniture',
  lighting: 'Lighting',
  outdoor: 'Outdoor',
  decorative: 'Decorative',
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
  { id: 'brick', name: 'Brick', color: '#a0522d', roughness: 0.85, metalness: 0.0 },
  { id: 'wood', name: 'Wood', color: '#deb887', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f5f5f5', roughness: 0.3, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#87ceeb', roughness: 0.1, metalness: 0.2 },
  { id: 'steel', name: 'Steel', color: '#c0c0c0', roughness: 0.3, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#faf0e6', roughness: 0.95, metalness: 0.0 },
  { id: 'tile', name: 'Tile', color: '#f0e68c', roughness: 0.4, metalness: 0.05 },
];

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', icon: '🧱', description: 'A standard wall segment', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#b0b0b0' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', icon: '⬜', description: 'A flat floor slab', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#c8c8c8' },
  { id: 'column', name: 'Column', category: 'structural', icon: '🏛️', description: 'A structural column', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#d0d0d0' },
  { id: 'beam', name: 'Beam', category: 'structural', icon: '📏', description: 'A horizontal beam', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.3], defaultColor: '#a0a0a0' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', icon: '🏠', description: 'An angled roof panel', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 4], defaultColor: '#8b4513' },
  { id: 'door', name: 'Door Frame', category: 'openings', icon: '🚪', description: 'A door frame opening', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.1, 0.15], defaultColor: '#8b6914' },
  { id: 'window', name: 'Window', category: 'openings', icon: '🪟', description: 'A window frame', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 1.2, 0.1], defaultColor: '#87ceeb' },
  { id: 'table', name: 'Table', category: 'furniture', icon: '🪑', description: 'A simple table', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.75, 0.8], defaultColor: '#deb887' },
  { id: 'chair', name: 'Chair', category: 'furniture', icon: '💺', description: 'A simple chair', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#cd853f' },
  { id: 'lamp', name: 'Lamp Post', category: 'lighting', icon: '💡', description: 'A lamp post', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 8], defaultScale: [0.15, 2.5, 0.15], defaultColor: '#ffd700' },
  { id: 'tree', name: 'Tree', category: 'outdoor', icon: '🌳', description: 'A decorative tree', geometry: 'cone', geometryArgs: [0.5, 1, 8], defaultScale: [1.5, 3, 1.5], defaultColor: '#228b22' },
  { id: 'sphere_deco', name: 'Decorative Sphere', category: 'decorative', icon: '⚽', description: 'A decorative sphere', geometry: 'sphere', geometryArgs: [0.5, 16, 16], defaultScale: [1, 1, 1], defaultColor: '#ff6347' },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
