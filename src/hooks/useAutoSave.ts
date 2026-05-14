import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/hooks/useEditorStore';
import { saveProject } from '@/lib/storage';

export function useAutoSave() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = useEditorStore.subscribe((state, prev) => {
      if (state.isDirty && state.projectId) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          const s = useEditorStore.getState();
          if (s.isDirty && s.projectId) {
            saveProject({
              id: s.projectId,
              name: s.projectName,
              description: '',
              objects: s.objects,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            s.markClean();
          }
        }, 30000);
      }
    });

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
}
