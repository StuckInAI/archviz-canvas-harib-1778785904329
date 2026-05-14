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
  exterior: 'Exterior',
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
  { id: 'marble', name: 'Marble', color: '#f0ead6', roughness: 0.3, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#add8e6', roughness: 0.1, metalness: 0.2 },
  { id: 'metal', name: 'Metal', color: '#808080', roughness: 0.3, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#faf0e6', roughness: 0.95, metalness: 0.0 },
  { id: 'tile', name: 'Tile', color: '#e0d5c1', roughness: 0.4, metalness: 0.05 },
];

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', description: 'A basic wall segment', icon: '🧱', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#b0b0b0' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A floor or ceiling slab', icon: '⬛', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.2, 6], defaultColor: '#a0a0a0' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A cylindrical column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#c0c0c0' },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A structural beam', icon: '📏', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.3], defaultColor: '#909090' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A door opening', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.2, 0.1], defaultColor: '#8b4513' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A window pane', icon: '🪟', geometry: 'plane', geometryArgs: [1, 1], defaultScale: [1.2, 1.2, 1], defaultColor: '#add8e6' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A simple table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.8, 0.8], defaultColor: '#deb887' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#cd853f' },
  { id: 'tree', name: 'Tree', category: 'exterior', description: 'A simple tree', icon: '🌳', geometry: 'cone', geometryArgs: [0.5, 1, 8], defaultScale: [2, 4, 2], defaultColor: '#228b22' },
  { id: 'sphere_deco', name: 'Decorative Sphere', category: 'decorative', description: 'A decorative sphere', icon: '⚽', geometry: 'sphere', geometryArgs: [0.5, 16, 16], defaultScale: [1, 1, 1], defaultColor: '#daa520' },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
