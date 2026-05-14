export type AssetCategory = 'structural' | 'openings' | 'furniture' | 'lighting' | 'outdoor' | 'decorative';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export type ViewMode = 'perspective' | 'top' | 'front' | 'side';

export type Vector3Tuple = [number, number, number];

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
