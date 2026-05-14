import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/hooks/useEditorStore';
import { saveProject } from '@/lib/storage';

export function useAutoSave() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectId = useEditorStore((s) => s.projectId);
  const projectName = useEditorStore((s) => s.projectName);
  const objects = useEditorStore((s) => s.objects);
  const isDirty = useEditorStore((s) => s.isDirty);
  const markClean = useEditorStore((s) => s.markClean);

  useEffect(() => {
    if (!isDirty || !projectId) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveProject({
        id: projectId,
        name: projectName,
        description: '',
        objects: objects,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      markClean();
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDirty, projectId, projectName, objects, markClean]);
}
