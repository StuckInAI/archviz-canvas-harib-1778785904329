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
  decoration: 'Decoration',
  exterior: 'Exterior',
};

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', description: 'A standard wall segment', icon: '🧱', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#cccccc' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A flat floor slab', icon: '⬜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#b0b0b0' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A cylindrical column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#d4d4d4' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', description: 'Angled roof panel', icon: '🏠', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 4], defaultColor: '#8B4513' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A standard door opening', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1, 2.2, 0.1], defaultColor: '#8B6914' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A window pane', icon: '🪟', geometry: 'plane', geometryArgs: [1, 1], defaultScale: [1.2, 1.2, 1], defaultColor: '#87CEEB' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A simple table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.5, 0.75, 0.8], defaultColor: '#DEB887' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A basic chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#CD853F' },
  { id: 'bookshelf', name: 'Bookshelf', category: 'furniture', description: 'A tall bookshelf', icon: '📚', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 2, 0.35], defaultColor: '#A0522D' },
  { id: 'sphere_deco', name: 'Sphere', category: 'decoration', description: 'A decorative sphere', icon: '🔵', geometry: 'sphere', geometryArgs: [0.5, 32, 32], defaultScale: [1, 1, 1], defaultColor: '#4682B4' },
  { id: 'cone_deco', name: 'Cone', category: 'decoration', description: 'A decorative cone', icon: '🔺', geometry: 'cone', geometryArgs: [0.5, 1, 16], defaultScale: [1, 1, 1], defaultColor: '#DAA520' },
  { id: 'tree', name: 'Tree', category: 'exterior', description: 'A simple tree (cone on cylinder)', icon: '🌲', geometry: 'cone', geometryArgs: [0.5, 1.5, 8], defaultScale: [2, 3, 2], defaultColor: '#228B22' },
  { id: 'bush', name: 'Bush', category: 'exterior', description: 'A round bush', icon: '🌳', geometry: 'sphere', geometryArgs: [0.5, 16, 16], defaultScale: [1.5, 1, 1.5], defaultColor: '#2E8B57' },
];

export const MATERIAL_PRESETS: MaterialPreset[] = [
  { id: 'concrete', name: 'Concrete', color: '#b0b0b0', roughness: 0.9, metalness: 0.0 },
  { id: 'brick', name: 'Brick', color: '#A0522D', roughness: 0.85, metalness: 0.0 },
  { id: 'wood', name: 'Wood', color: '#DEB887', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#F5F5F5', roughness: 0.2, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#87CEEB', roughness: 0.1, metalness: 0.2 },
  { id: 'metal', name: 'Metal', color: '#A9A9A9', roughness: 0.3, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#FFFDD0', roughness: 0.95, metalness: 0.0 },
  { id: 'stone', name: 'Stone', color: '#808080', roughness: 0.8, metalness: 0.0 },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
