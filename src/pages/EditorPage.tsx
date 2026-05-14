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
import TutorialOverlay from '@/components/editor/TutorialOverlay';
import SceneCanvas from '@/components/three/SceneCanvas';
import styles from './EditorPage.module.css';

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
    setProjectId(projectId);
    setProjectName(project.name);
    setObjects(project.objects);

    // Show tutorial for first-time users
    const tutorialShown = localStorage.getItem('eduarch3d_tutorial_shown');
    if (!tutorialShown) {
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
    localStorage.setItem('eduarch3d_tutorial_shown', 'true');
  }

  return (
    <div className={styles.editorLayout}>
      <TopToolbar onSave={handleSave} onBack={() => navigate('/dashboard')} />
      <div className={styles.mainArea}>
        <AssetSidebar />
        <div className={styles.canvasArea}>
          <SceneCanvas />
        </div>
        {selectedObjectId && <PropertiesPanel />}
      </div>
      <BottomBar />
      {showTutorial && <TutorialOverlay onDismiss={handleDismissTutorial} />}
    </div>
  );
}
