import { create } from 'zustand';
import { SceneObject, TransformMode, ViewMode } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface HistoryEntry {
  objects: SceneObject[];
}

interface EditorStore {
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

export const useEditorStore = create<EditorStore>((set, get) => ({
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

  setProjectId: (id: string) => set({ projectId: id }),
  setProjectName: (name: string) => set({ projectName: name, isDirty: true }),

  setObjects: (objects: SceneObject[]) => set({
    objects,
    history: [{ objects: JSON.parse(JSON.stringify(objects)) }],
    historyIndex: 0,
    isDirty: false,
  }),

  addObject: (obj: SceneObject) => {
    const state = get();
    const newObjects = [...state.objects, obj];
    set({ objects: newObjects, isDirty: true });
    get().pushHistory();
  },

  updateObject: (id: string, updates: Partial<SceneObject>) => {
    const state = get();
    const newObjects = state.objects.map((o) =>
      o.id === id ? { ...o, ...updates } : o
    );
    set({ objects: newObjects, isDirty: true });
  },

  removeObject: (id: string) => {
    const state = get();
    const newObjects = state.objects.filter((o) => o.id !== id);
    const newSelected = state.selectedObjectId === id ? null : state.selectedObjectId;
    set({ objects: newObjects, selectedObjectId: newSelected, isDirty: true });
    get().pushHistory();
  },

  duplicateObject: (id: string) => {
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
    get().pushHistory();
  },

  selectObject: (id: string | null) => set({ selectedObjectId: id }),

  setTransformMode: (mode: TransformMode) => set({ transformMode: mode }),

  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),

  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),

  toggleSnap: () => set((s) => ({ snapEnabled: !s.snapEnabled })),

  setSnapValue: (val: number) => set({ snapValue: val }),

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
