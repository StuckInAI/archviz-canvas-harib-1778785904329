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

export interface MaterialPreset {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export const CATEGORY_LABELS: Record<string, string> = {
  structural: 'Structural',
  openings: 'Openings',
  furniture: 'Furniture',
  exterior: 'Exterior',
  decorative: 'Decorative',
};

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', description: 'A standard wall segment', icon: '🧱', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#d4c5a9' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A flat floor slab', icon: '⬜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#c0b49a' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A cylindrical column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#e0d8cc' },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A horizontal beam', icon: '📏', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.3], defaultColor: '#b0a890' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', description: 'An angled roof panel', icon: '🏠', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 4], defaultColor: '#8b4513' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A standard door', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.2, 0.08], defaultColor: '#8b6914' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A glass window pane', icon: '🪟', geometry: 'plane', geometryArgs: [1, 1], defaultScale: [1.2, 1.2, 1], defaultColor: '#87ceeb' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A simple table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.8, 0.8], defaultColor: '#deb887' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A basic chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#cd853f' },
  { id: 'tree', name: 'Tree', category: 'exterior', description: 'A cone-shaped tree', icon: '🌲', geometry: 'cone', geometryArgs: [0.5, 1, 8], defaultScale: [1.5, 3, 1.5], defaultColor: '#228b22' },
  { id: 'sphere_deco', name: 'Decorative Sphere', category: 'decorative', description: 'A smooth decorative sphere', icon: '🔮', geometry: 'sphere', geometryArgs: [0.5, 32, 32], defaultScale: [1, 1, 1], defaultColor: '#b0c4de' },
  { id: 'stairs', name: 'Stairs', category: 'structural', description: 'A staircase block', icon: '🪜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 1.5, 2.5], defaultColor: '#a9a9a9' },
];

export const MATERIAL_PRESETS: MaterialPreset[] = [
  { id: 'concrete', name: 'Concrete', color: '#b0a890', roughness: 0.9, metalness: 0.0 },
  { id: 'brick', name: 'Brick', color: '#a0522d', roughness: 0.85, metalness: 0.0 },
  { id: 'wood', name: 'Wood', color: '#deb887', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f5f5f5', roughness: 0.2, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#87ceeb', roughness: 0.1, metalness: 0.2 },
  { id: 'steel', name: 'Steel', color: '#708090', roughness: 0.3, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#fffaf0', roughness: 0.95, metalness: 0.0 },
  { id: 'terracotta', name: 'Terracotta', color: '#e2725b', roughness: 0.8, metalness: 0.0 },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
