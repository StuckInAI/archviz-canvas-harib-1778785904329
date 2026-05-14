import { useEffect } from 'react';
import { useEditorStore } from '@/hooks/useEditorStore';

export function useKeyboardShortcuts() {
  const {
    selectedObjectId,
    setTransformMode,
    removeObject,
    duplicateObject,
    undo,
    redo,
    toggleGrid,
    toggleSnap,
  } = useEditorStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'g' || e.key === 'G') {
        if (!e.ctrlKey && !e.metaKey) {
          setTransformMode('translate');
        }
      }
      if (e.key === 'r' || e.key === 'R') {
        if (!e.ctrlKey && !e.metaKey) {
          setTransformMode('rotate');
        }
      }
      if (e.key === 's' || e.key === 'S') {
        if (!e.ctrlKey && !e.metaKey) {
          setTransformMode('scale');
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedObjectId) {
          removeObject(selectedObjectId);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (selectedObjectId) {
          duplicateObject(selectedObjectId);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      if (e.key === 'F1') {
        e.preventDefault();
        toggleGrid();
      }
      if (e.key === 'F2') {
        e.preventDefault();
        toggleSnap();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObjectId, setTransformMode, removeObject, duplicateObject, undo, redo, toggleGrid, toggleSnap]);
}
