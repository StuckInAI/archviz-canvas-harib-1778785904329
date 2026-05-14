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
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A flat floor slab', icon: '⬜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#b0a898' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A structural column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#c0b8a8' },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A horizontal beam', icon: '📏', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.2], defaultColor: '#a89888' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', description: 'An angled roof panel', icon: '🏠', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 4], defaultColor: '#8b4513' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A standard door opening', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.2, 0.1], defaultColor: '#8b6914' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A window pane', icon: '🪟', geometry: 'plane', geometryArgs: [1, 1], defaultScale: [1.2, 1.2, 1], defaultColor: '#87ceeb' },
  { id: 'arch', name: 'Arch', category: 'openings', description: 'A decorative arch', icon: '🌉', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16, 1, false, 0, Math.PI], defaultScale: [1.5, 1.5, 0.3], defaultColor: '#c0b8a8' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A simple table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.8, 0.8], defaultColor: '#deb887' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A simple chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#cd853f' },
  { id: 'shelf', name: 'Shelf', category: 'furniture', description: 'A wall shelf', icon: '📚', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.05, 0.3], defaultColor: '#a0522d' },
  { id: 'tree', name: 'Tree', category: 'exterior', description: 'A simple tree', icon: '🌳', geometry: 'cone', geometryArgs: [0.5, 1, 8], defaultScale: [2, 3, 2], defaultColor: '#228b22' },
  { id: 'bush', name: 'Bush', category: 'exterior', description: 'A round bush', icon: '🌿', geometry: 'sphere', geometryArgs: [0.5, 16, 16], defaultScale: [1, 0.8, 1], defaultColor: '#2e8b57' },
  { id: 'fence', name: 'Fence', category: 'exterior', description: 'A fence segment', icon: '🏗️', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [3, 1.2, 0.08], defaultColor: '#deb887' },
  { id: 'sphere_deco', name: 'Decorative Sphere', category: 'decorative', description: 'A decorative sphere', icon: '🔮', geometry: 'sphere', geometryArgs: [0.5, 32, 32], defaultScale: [0.5, 0.5, 0.5], defaultColor: '#ffd700' },
  { id: 'pedestal', name: 'Pedestal', category: 'decorative', description: 'A display pedestal', icon: '🗿', geometry: 'cylinder', geometryArgs: [0.5, 0.4, 1, 8], defaultScale: [0.6, 1, 0.6], defaultColor: '#808080' },
];

export const MATERIAL_PRESETS: MaterialPreset[] = [
  { id: 'concrete', name: 'Concrete', color: '#b0a898', roughness: 0.9, metalness: 0.0 },
  { id: 'brick', name: 'Brick', color: '#c1440e', roughness: 0.85, metalness: 0.0 },
  { id: 'wood_light', name: 'Light Wood', color: '#deb887', roughness: 0.7, metalness: 0.0 },
  { id: 'wood_dark', name: 'Dark Wood', color: '#8b4513', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f0ead6', roughness: 0.3, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#87ceeb', roughness: 0.1, metalness: 0.2 },
  { id: 'steel', name: 'Steel', color: '#808080', roughness: 0.3, metalness: 0.8 },
  { id: 'gold', name: 'Gold', color: '#ffd700', roughness: 0.3, metalness: 0.9 },
  { id: 'plaster', name: 'Plaster', color: '#f5f5dc', roughness: 0.95, metalness: 0.0 },
  { id: 'terracotta', name: 'Terracotta', color: '#e2725b', roughness: 0.8, metalness: 0.0 },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
