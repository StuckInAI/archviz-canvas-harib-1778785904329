import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useEditorStore } from '@/hooks/useEditorStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAutoSave } from '@/hooks/useAutoSave';
import { loadProject, saveProject as saveProjectStorage } from '@/lib/storage';
import { hasTutorialBeenSeen, markTutorialSeen } from '@/lib/storage';
import TopToolbar from '@/components/editor/TopToolbar';
import AssetSidebar from '@/components/editor/AssetSidebar';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import BottomBar from '@/components/editor/BottomBar';
import TutorialOverlay from '@/components/editor/TutorialOverlay';
import SceneCanvas from '@/components/three/SceneCanvas';
import styles from './EditorPage.module.css';

export default function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const {
    setProjectId,
    setProjectName,
    setObjects,
    objects,
    projectName,
    sidebarOpen,
    propertiesPanelOpen,
    selectedObjectId,
    isDirty,
    markClean,
  } = useEditorStore();

  const [showTutorial, setShowTutorial] = useState(false);

  useKeyboardShortcuts();
  useAutoSave();

  useEffect(() => {
    if (!projectId) {
      navigate('/dashboard');
      return;
    }
    const project = loadProject(projectId);
    if (project) {
      setProjectId(project.id);
      setProjectName(project.name);
      setObjects(project.objects);
    } else {
      setProjectId(projectId);
      setProjectName('Untitled Project');
      setObjects([]);
    }

    if (!hasTutorialBeenSeen()) {
      setShowTutorial(true);
    }
  }, [projectId, navigate, setProjectId, setProjectName, setObjects]);

  function handleSave() {
    if (!projectId) return;
    saveProjectStorage({
      id: projectId,
      name: projectName,
      description: '',
      objects: objects,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    markClean();
  }

  function handleDismissTutorial() {
    markTutorialSeen();
    setShowTutorial(false);
  }

  return (
    <div className={styles.wrapper}>
      <TopToolbar onSave={handleSave} onBack={() => navigate('/dashboard')} />
      <div className={styles.middle}>
        {sidebarOpen && <AssetSidebar />}
        <div className={styles.canvasArea}>
          <SceneCanvas />
        </div>
        {propertiesPanelOpen && selectedObjectId && <PropertiesPanel />}
      </div>
      <BottomBar />
      {showTutorial && <TutorialOverlay onDismiss={handleDismissTutorial} />}
    </div>
  );
}
