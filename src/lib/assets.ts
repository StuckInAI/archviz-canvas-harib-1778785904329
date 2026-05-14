import { AssetDefinition, MaterialPreset } from '@/types';

export const ASSET_LIBRARY: AssetDefinition[] = [
  // Structural
  { id: 'wall-straight', name: 'Wall (Straight)', category: 'structural', description: 'A standard straight wall section used as the primary building block for room partitions and building exteriors.', icon: '🧱', defaultScale: [4, 3, 0.2], defaultColor: '#d4c5a9', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'wall-corner', name: 'Wall (Corner)', category: 'structural', description: 'An L-shaped corner wall piece for creating room corners efficiently.', icon: '🔲', defaultScale: [2, 3, 0.2], defaultColor: '#d4c5a9', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'floor-slab', name: 'Floor Slab', category: 'structural', description: 'A flat horizontal slab serving as the floor or ceiling of a room.', icon: '⬜', defaultScale: [6, 0.15, 6], defaultColor: '#c2b280', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'column', name: 'Column', category: 'structural', description: 'A vertical cylindrical support structure transferring loads from beams to foundations.', icon: '🏛️', defaultScale: [0.3, 3, 0.3], defaultColor: '#b0b0b0', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16] },
  { id: 'beam', name: 'Beam', category: 'structural', description: 'A horizontal structural member that supports vertical loads across a span.', icon: '➖', defaultScale: [4, 0.3, 0.3], defaultColor: '#808080', geometry: 'box', geometryArgs: [1, 1, 1] },
  // Openings
  { id: 'door-single', name: 'Door (Single)', category: 'openings', description: 'A standard single-panel door for interior or exterior passage.', icon: '🚪', defaultScale: [1, 2.2, 0.1], defaultColor: '#8B4513', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'door-double', name: 'Door (Double)', category: 'openings', description: 'A double-panel door providing a wider entrance, commonly used for living rooms and main entries.', icon: '🚪', defaultScale: [2, 2.2, 0.1], defaultColor: '#8B4513', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'window-standard', name: 'Window (Standard)', category: 'openings', description: 'A rectangular window allowing natural light and ventilation into a room.', icon: '🪟', defaultScale: [1.2, 1.2, 0.08], defaultColor: '#87CEEB', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'window-arched', name: 'Window (Arched)', category: 'openings', description: 'An elegantly arched window adding architectural character, common in classical design.', icon: '🏠', defaultScale: [1.2, 1.5, 0.08], defaultColor: '#87CEEB', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'garage-door', name: 'Garage Door', category: 'openings', description: 'A large roll-up or sectional door designed for vehicle access.', icon: '🏗️', defaultScale: [3, 2.5, 0.12], defaultColor: '#A0A0A0', geometry: 'box', geometryArgs: [1, 1, 1] },
  // Roof
  { id: 'roof-flat', name: 'Roof (Flat)', category: 'roof', description: 'A flat roof section, commonly used in modern architectural designs.', icon: '🏢', defaultScale: [6, 0.1, 6], defaultColor: '#555555', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'roof-gabled', name: 'Roof (Gabled)', category: 'roof', description: 'A triangular gabled roof that sheds water and snow efficiently.', icon: '🏠', defaultScale: [6, 2, 6], defaultColor: '#8B0000', geometry: 'cone', geometryArgs: [0.7, 1, 4] },
  { id: 'roof-hip', name: 'Roof (Hip)', category: 'roof', description: 'A hip roof with slopes on all four sides, offering stability in high winds.', icon: '⛺', defaultScale: [6, 2, 6], defaultColor: '#A0522D', geometry: 'cone', geometryArgs: [0.7, 1, 4] },
  // Stairs
  { id: 'stairs-straight', name: 'Stairs (Straight)', category: 'stairs', description: 'A straight-run staircase connecting two floor levels.', icon: '🪜', defaultScale: [1.2, 3, 4], defaultColor: '#c2b280', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'stairs-l-shaped', name: 'Stairs (L-Shaped)', category: 'stairs', description: 'An L-shaped staircase with a landing, saving floor space.', icon: '📐', defaultScale: [2, 3, 3], defaultColor: '#c2b280', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'stairs-spiral', name: 'Stairs (Spiral)', category: 'stairs', description: 'A compact spiral staircase, ideal for tight spaces and dramatic design.', icon: '🌀', defaultScale: [1.5, 3, 1.5], defaultColor: '#808080', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16] },
  // Furniture
  { id: 'table', name: 'Table', category: 'furniture', description: 'A standard dining or work table.', icon: '🪑', defaultScale: [1.5, 0.75, 0.9], defaultColor: '#A0522D', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'chair', name: 'Chair', category: 'furniture', description: 'A simple chair for seating at tables and desks.', icon: '💺', defaultScale: [0.5, 0.9, 0.5], defaultColor: '#8B4513', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'sofa', name: 'Sofa', category: 'furniture', description: 'A comfortable multi-seat sofa for living rooms.', icon: '🛋️', defaultScale: [2, 0.85, 0.9], defaultColor: '#4A6FA5', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'bed', name: 'Bed', category: 'furniture', description: 'A standard double bed for bedrooms.', icon: '🛏️', defaultScale: [1.6, 0.6, 2.1], defaultColor: '#F5F5DC', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'desk', name: 'Desk', category: 'furniture', description: 'A work desk with surface for a computer or writing.', icon: '🖥️', defaultScale: [1.4, 0.75, 0.7], defaultColor: '#D2691E', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'bookshelf', name: 'Bookshelf', category: 'furniture', description: 'A tall bookshelf for storing books and display items.', icon: '📚', defaultScale: [1, 2, 0.35], defaultColor: '#8B4513', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'kitchen-cabinet', name: 'Kitchen Cabinet', category: 'furniture', description: 'A base kitchen cabinet with countertop.', icon: '🍳', defaultScale: [0.6, 0.9, 0.6], defaultColor: '#F5F5F5', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'toilet', name: 'Toilet', category: 'furniture', description: 'A standard toilet fixture for bathrooms.', icon: '🚽', defaultScale: [0.4, 0.7, 0.65], defaultColor: '#FFFFFF', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'sink', name: 'Sink', category: 'furniture', description: 'A bathroom or kitchen sink with basin.', icon: '🚰', defaultScale: [0.6, 0.85, 0.5], defaultColor: '#FFFFFF', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'bathtub', name: 'Bathtub', category: 'furniture', description: 'A standard bathtub for bathrooms.', icon: '🛁', defaultScale: [0.8, 0.6, 1.7], defaultColor: '#FFFFFF', geometry: 'box', geometryArgs: [1, 1, 1] },
  // Lighting
  { id: 'ceiling-light', name: 'Ceiling Light', category: 'lighting', description: 'A ceiling-mounted light fixture illuminating rooms from above.', icon: '💡', defaultScale: [0.5, 0.15, 0.5], defaultColor: '#FFD700', geometry: 'cylinder', geometryArgs: [0.5, 0.5, 1, 16] },
  { id: 'floor-lamp', name: 'Floor Lamp', category: 'lighting', description: 'A standalone floor lamp providing ambient or task lighting.', icon: '🔦', defaultScale: [0.3, 1.6, 0.3], defaultColor: '#333333', geometry: 'cylinder', geometryArgs: [0.3, 0.5, 1, 8] },
  { id: 'wall-sconce', name: 'Wall Sconce', category: 'lighting', description: 'A wall-mounted light sconce for accent and ambient lighting.', icon: '🕯️', defaultScale: [0.2, 0.3, 0.15], defaultColor: '#C0C0C0', geometry: 'box', geometryArgs: [1, 1, 1] },
  // Landscaping
  { id: 'tree', name: 'Tree', category: 'landscaping', description: 'A deciduous tree providing shade and greenery to outdoor spaces.', icon: '🌳', defaultScale: [1, 3, 1], defaultColor: '#228B22', geometry: 'sphere', geometryArgs: [0.5, 16, 16] },
  { id: 'bush', name: 'Bush', category: 'landscaping', description: 'A low ornamental bush for gardens and property borders.', icon: '🌿', defaultScale: [0.8, 0.6, 0.8], defaultColor: '#2E8B57', geometry: 'sphere', geometryArgs: [0.5, 12, 12] },
  { id: 'fence', name: 'Fence', category: 'landscaping', description: 'A fence panel for defining property boundaries and privacy.', icon: '🏗️', defaultScale: [3, 1.2, 0.08], defaultColor: '#D2691E', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'pathway', name: 'Pathway', category: 'landscaping', description: 'A ground-level walkway connecting areas of a landscape.', icon: '🛤️', defaultScale: [1, 0.05, 4], defaultColor: '#A9A9A9', geometry: 'box', geometryArgs: [1, 1, 1] },
  { id: 'grass-patch', name: 'Grass Patch', category: 'landscaping', description: 'A patch of grass for lawn and garden areas.', icon: '🟩', defaultScale: [4, 0.05, 4], defaultColor: '#4CAF50', geometry: 'plane', geometryArgs: [1, 1] },
];

export const MATERIAL_PRESETS: MaterialPreset[] = [
  { id: 'brick', name: 'Brick', color: '#b5541a', roughness: 0.85, metalness: 0.0 },
  { id: 'concrete', name: 'Concrete', color: '#b0b0b0', roughness: 0.9, metalness: 0.0 },
  { id: 'wood-oak', name: 'Wood (Oak)', color: '#c19a6b', roughness: 0.7, metalness: 0.0 },
  { id: 'wood-walnut', name: 'Wood (Walnut)', color: '#5c4033', roughness: 0.65, metalness: 0.0 },
  { id: 'marble', name: 'Marble', color: '#f0ead6', roughness: 0.2, metalness: 0.05 },
  { id: 'glass', name: 'Glass', color: '#b0d4f1', roughness: 0.05, metalness: 0.1 },
  { id: 'metal', name: 'Metal', color: '#c0c0c0', roughness: 0.3, metalness: 0.9 },
  { id: 'drywall-white', name: 'Drywall (White)', color: '#f5f5f5', roughness: 0.95, metalness: 0.0 },
  { id: 'drywall-cream', name: 'Drywall (Cream)', color: '#fffdd0', roughness: 0.95, metalness: 0.0 },
  { id: 'drywall-grey', name: 'Drywall (Grey)', color: '#d3d3d3', roughness: 0.95, metalness: 0.0 },
  { id: 'drywall-blue', name: 'Drywall (Blue)', color: '#b0c4de', roughness: 0.95, metalness: 0.0 },
  { id: 'drywall-green', name: 'Drywall (Green)', color: '#98d8a0', roughness: 0.95, metalness: 0.0 },
  { id: 'tile-white', name: 'Tile (White)', color: '#ffffff', roughness: 0.3, metalness: 0.0 },
  { id: 'tile-terracotta', name: 'Tile (Terracotta)', color: '#cc5c33', roughness: 0.6, metalness: 0.0 },
  { id: 'asphalt', name: 'Asphalt', color: '#3a3a3a', roughness: 0.95, metalness: 0.0 },
];

export const CATEGORY_LABELS: Record<string, string> = {
  structural: 'Structural',
  openings: 'Openings',
  roof: 'Roof',
  stairs: 'Stairs',
  furniture: 'Furniture',
  lighting: 'Lighting',
  landscaping: 'Landscaping',
};

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_LIBRARY.find((a) => a.id === id);
}

export function getMaterialById(id: string): MaterialPreset | undefined {
  return MATERIAL_PRESETS.find((m) => m.id === id);
}
