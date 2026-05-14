export type Vector3Tuple = [number, number, number];

export type TransformMode = 'translate' | 'rotate' | 'scale';

export type ViewMode = 'perspective' | 'top' | 'front' | 'side';

export type AssetCategory = 'structural' | 'openings' | 'roof' | 'stairs' | 'furniture' | 'lighting' | 'landscaping';

export interface MaterialPreset {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export interface AssetDefinition {
  id: string;
  name: string;
  category: AssetCategory;
  description: string;
  icon: string;
  defaultScale: Vector3Tuple;
  defaultColor: string;
  geometry: 'box' | 'cylinder' | 'sphere' | 'cone' | 'plane';
  geometryArgs: number[];
}

export interface SceneObject {
  id: string;
  assetId: string;
  name: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: Vector3Tuple;
  materialId: string;
  visible: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  objects: SceneObject[];
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  selectedObjectId: string | null;
  transformMode: TransformMode;
  viewMode: ViewMode;
  gridVisible: boolean;
  snapEnabled: boolean;
  snapValue: number;
  sidebarOpen: boolean;
  propertiesPanelOpen: boolean;
}
