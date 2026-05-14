import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type AssetCategory = 'structural' | 'openings' | 'furniture' | 'decor' | 'landscape';
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

interface HistoryEntry {
  objects: SceneObject[];
}

interface EditorState {
  projectId: string;
  projectName: string;
  objects: SceneObject[];
  selectedObjectId: string | null;
  transformMode: TransformMode;
  viewMode: ViewMode;
  gridVisible: boolean;
  snapEnabled: boolean;
  snapValue: number;
  sidebarOpen: boolean;
  propertiesPanelOpen: boolean;
  history: HistoryEntry[];
  historyIndex: number;
  isDirty: boolean;

  setProjectId: (id: string) => void;
  setProjectName: (name: string) => void;
  setObjects: (objects: SceneObject[]) => void;
  addObject: (obj: SceneObject) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  removeObject: (id: string) => void;
  duplicateObject: (id: string) => void;
  selectObject: (id: string | null) => void;
  setTransformMode: (mode: TransformMode) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  setSnapValue: (val: number) => void;
  toggleSidebar: () => void;
  togglePropertiesPanel: () => void;
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
  markClean: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  projectId: '',
  projectName: 'Untitled Project',
  objects: [],
  selectedObjectId: null,
  transformMode: 'translate',
  viewMode: 'perspective',
  gridVisible: true,
  snapEnabled: true,
  snapValue: 0.5,
  sidebarOpen: true,
  propertiesPanelOpen: true,
  history: [{ objects: [] }],
  historyIndex: 0,
  isDirty: false,

  setProjectId: (id) => set({ projectId: id }),
  setProjectName: (name) => set({ projectName: name, isDirty: true }),

  setObjects: (objects) => set({
    objects,
    history: [{ objects: JSON.parse(JSON.stringify(objects)) }],
    historyIndex: 0,
    isDirty: false,
  }),

  addObject: (obj) => {
    const state = get();
    const newObjects = [...state.objects, obj];
    set({ objects: newObjects, isDirty: true });
    // Push history after state update
    setTimeout(() => get().pushHistory(), 0);
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
      isDirty: true,
    }));
  },

  removeObject: (id) => {
    const state = get();
    const newObjects = state.objects.filter((o) => o.id !== id);
    const newSelected = state.selectedObjectId === id ? null : state.selectedObjectId;
    set({ objects: newObjects, selectedObjectId: newSelected, isDirty: true });
    setTimeout(() => get().pushHistory(), 0);
  },

  duplicateObject: (id) => {
    const state = get();
    const obj = state.objects.find((o) => o.id === id);
    if (!obj) return;
    const newObj: SceneObject = {
      ...obj,
      id: uuidv4(),
      name: obj.name + ' (Copy)',
      position: [obj.position[0] + 1, obj.position[1], obj.position[2] + 1],
    };
    const newObjects = [...state.objects, newObj];
    set({ objects: newObjects, selectedObjectId: newObj.id, isDirty: true });
    setTimeout(() => get().pushHistory(), 0);
  },

  selectObject: (id) => set({ selectedObjectId: id }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),
  toggleSnap: () => set((s) => ({ snapEnabled: !s.snapEnabled })),
  setSnapValue: (val) => set({ snapValue: val }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  togglePropertiesPanel: () => set((s) => ({ propertiesPanelOpen: !s.propertiesPanelOpen })),

  pushHistory: () => {
    const state = get();
    const newEntry: HistoryEntry = { objects: JSON.parse(JSON.stringify(state.objects)) };
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newEntry);
    if (newHistory.length > 50) newHistory.shift();
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex <= 0) return;
    const newIndex = state.historyIndex - 1;
    const entry = state.history[newIndex];
    set({
      objects: JSON.parse(JSON.stringify(entry.objects)),
      historyIndex: newIndex,
      isDirty: true,
      selectedObjectId: null,
    });
  },

  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;
    const newIndex = state.historyIndex + 1;
    const entry = state.history[newIndex];
    set({
      objects: JSON.parse(JSON.stringify(entry.objects)),
      historyIndex: newIndex,
      isDirty: true,
      selectedObjectId: null,
    });
  },

  markClean: () => set({ isDirty: false }),
}));
