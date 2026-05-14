export type Vector3Tuple = [number, number, number];

export type AssetCategory = 'structural' | 'openings' | 'furniture' | 'decoration' | 'outdoor';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export type ViewMode = 'perspective' | 'top' | 'front' | 'side';

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
