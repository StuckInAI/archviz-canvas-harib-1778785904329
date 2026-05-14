import { useEffect } from 'react';
import { useEditorStore } from '@/hooks/useEditorStore';

export function useKeyboardShortcuts() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const state = useEditorStore.getState();

      if (e.key === 'g' || e.key === 'G') {
        state.setTransformMode('translate');
      } else if (e.key === 'r' || e.key === 'R') {
        state.setTransformMode('rotate');
      } else if (e.key === 's' || e.key === 'S') {
        if (!e.ctrlKey && !e.metaKey) {
          state.setTransformMode('scale');
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedObjectId) {
          state.removeObject(state.selectedObjectId);
        }
      } else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (state.selectedObjectId) {
          state.duplicateObject(state.selectedObjectId);
        }
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) {
          state.redo();
        } else {
          state.undo();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
