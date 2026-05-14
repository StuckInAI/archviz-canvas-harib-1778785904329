export type AssetCategory = 'structural' | 'openings' | 'furniture' | 'decor' | 'landscape';

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
  decor: 'Decor',
  landscape: 'Landscape',
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
  { id: 'wood', name: 'Wood', color: '#8B4513', roughness: 0.7, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f0ead6', roughness: 0.3, metalness: 0.1 },
  { id: 'glass', name: 'Glass', color: '#add8e6', roughness: 0.1, metalness: 0.2 },
  { id: 'steel', name: 'Steel', color: '#808080', roughness: 0.3, metalness: 0.8 },
  { id: 'plaster', name: 'Plaster', color: '#f5f5dc', roughness: 0.95, metalness: 0.0 },
  { id: 'tile', name: 'Tile', color: '#dcd0c0', roughness: 0.4, metalness: 0.05 },
];

export const ASSET_LIBRARY: AssetDefinition[] = [
  { id: 'wall', name: 'Wall', category: 'structural', description: 'A standard wall segment', icon: '🧱', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 3, 0.2], defaultColor: '#b0b0b0' },
  { id: 'floor', name: 'Floor Slab', category: 'structural', description: 'A flat floor slab', icon: '⬜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.15, 6], defaultColor: '#999999' },
  { id: 'column', name: 'Column', category: 'structural', description: 'A cylindrical column', icon: '🏛️', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16], defaultScale: [0.3, 3, 0.3], defaultColor: '#cccccc' },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A horizontal beam', icon: '📏', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [4, 0.3, 0.2], defaultColor: '#aaaaaa' },
  { id: 'roof', name: 'Roof Panel', category: 'structural', description: 'An angled roof panel', icon: '🏠', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [6, 0.1, 4], defaultColor: '#8B4513' },
  { id: 'stair', name: 'Stair Block', category: 'structural', description: 'A stair step block', icon: '🪜', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 0.2, 0.3], defaultColor: '#999999' },
  { id: 'door', name: 'Door', category: 'openings', description: 'A standard door opening', icon: '🚪', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.9, 2.1, 0.08], defaultColor: '#8B4513' },
  { id: 'window', name: 'Window', category: 'openings', description: 'A window opening with glass', icon: '🪟', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 1.0, 0.06], defaultColor: '#add8e6' },
  { id: 'table', name: 'Table', category: 'furniture', description: 'A simple table', icon: '🪑', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [1.2, 0.75, 0.8], defaultColor: '#8B4513' },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A simple chair', icon: '💺', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [0.5, 0.9, 0.5], defaultColor: '#8B4513' },
  { id: 'sofa', name: 'Sofa', category: 'furniture', description: 'A cozy sofa', icon: '🛋️', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [2, 0.8, 0.9], defaultColor: '#4a5568' },
  { id: 'bed', name: 'Bed', category: 'furniture', description: 'A double bed', icon: '🛏️', geometry: 'box', geometryArgs: [1, 1, 1], defaultScale: [2, 0.5, 1.6], defaultColor: '#e2e8f0' },
  { id: 'sphere-decor', name: 'Sphere Decor', category: 'decor', description: 'A decorative sphere', icon: '🔮', geometry: 'sphere', geometryArgs: [0.5, 32, 32], defaultScale: [1, 1, 1], defaultColor: '#e0e0e0' },
  { id: 'lamp', name: 'Floor Lamp', category: 'decor', description: 'A floor lamp', icon: '💡', geometry: 'cylinder', geometryArgs: [0.1, 0.1, 1.5, 8], defaultScale: [1, 1, 1], defaultColor: '#ffd700' },
  { id: 'tree', name: 'Tree', category: 'landscape', description: 'A simple cone-shaped tree', icon: '🌲', geometry: 'cone', geometryArgs: [0.5, 1, 16], defaultScale: [1.5, 3, 1.5], defaultColor: '#228B22' },
  { id: 'bush', name: 'Bush', category: 'landscape', description: 'A round bush', icon: '🌳', geometry: 'sphere', geometryArgs: [0.5, 16, 16], defaultScale: [1.2, 0.8, 1.2], defaultColor: '#2d8f2d' },
];

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
