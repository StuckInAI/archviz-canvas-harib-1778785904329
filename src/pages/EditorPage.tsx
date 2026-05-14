import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/hooks/useEditorStore';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { getProject, saveProject } from '@/lib/storage';
import TopToolbar from '@/components/editor/TopToolbar';
import AssetSidebar from '@/components/editor/AssetSidebar';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import BottomBar from '@/components/editor/BottomBar';
import SceneCanvas from '@/components/three/SceneCanvas';
import TutorialOverlay from '@/components/editor/TutorialOverlay';
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
    sidebarOpen,
    propertiesPanelOpen,
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
    setObjects(project.objects || []);

    // Show tutorial on first visit
    const tutorialSeen = localStorage.getItem('eduarch3d_tutorial_seen');
    if (!tutorialSeen) {
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
    <div className={styles.editor}>
      <TopToolbar onSave={handleSave} onBack={() => navigate('/dashboard')} />
      <div className={styles.middle}>
        {sidebarOpen && <AssetSidebar />}
        <div className={styles.canvas}>
          <SceneCanvas />
        </div>
        {propertiesPanelOpen && selectedObjectId && <PropertiesPanel />}
      </div>
      <BottomBar />
      {showTutorial && <TutorialOverlay onDismiss={handleDismissTutorial} />}
    </div>
  );
}
