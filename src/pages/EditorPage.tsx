import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/hooks/useEditorStore';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { getProject, saveProject } from '@/lib/storage';
import AssetSidebar from '@/components/editor/AssetSidebar';
import TopToolbar from '@/components/editor/TopToolbar';
import BottomBar from '@/components/editor/BottomBar';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import SceneCanvas from '@/components/three/SceneCanvas';
import TutorialOverlay from '@/components/editor/TutorialOverlay';

export default function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);

  const {
    setProjectId,
    setProjectName,
    setObjects,
    projectName,
    objects,
    selectedObjectId,
    markClean,
  } = useEditorStore();

  useAutoSave();
  useKeyboardShortcuts();

  useEffect(() => {
    if (!projectId) {
      navigate('/dashboard');
      return;
    }
    const project = getProject(projectId);
    if (!project) {
      navigate('/dashboard');
      return;
    }
    setProjectId(project.id);
    setProjectName(project.name);
    setObjects(project.objects);

    const hasSeenTutorial = localStorage.getItem('eduarch3d_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [projectId, navigate, setProjectId, setProjectName, setObjects]);

  function handleSave() {
    if (!projectId) return;
    saveProject({
      id: projectId,
      name: projectName,
      description: '',
      objects,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    markClean();
  }

  function handleDismissTutorial() {
    setShowTutorial(false);
    localStorage.setItem('eduarch3d_tutorial_seen', 'true');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopToolbar onSave={handleSave} onBack={() => navigate('/dashboard')} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AssetSidebar />
        <div style={{ flex: 1, position: 'relative' }}>
          <SceneCanvas />
        </div>
        {selectedObjectId && <PropertiesPanel />}
      </div>
      <BottomBar />
      {showTutorial && <TutorialOverlay onDismiss={handleDismissTutorial} />}
    </div>
  );
}
