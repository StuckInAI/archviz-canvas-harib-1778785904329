import { useEffect, useState, useCallback } from 'react';
import { useEditorStore } from '../hooks/useEditorStore';
import { getProject, saveProject } from '../lib/storage';
import AssetSidebar from '../components/editor/AssetSidebar';
import TopToolbar from '../components/editor/TopToolbar';
import BottomBar from '../components/editor/BottomBar';
import PropertiesPanel from '../components/editor/PropertiesPanel';
import TutorialOverlay from '../components/editor/TutorialOverlay';
import SceneCanvas from '../components/three/SceneCanvas';

interface Props {
  projectId: string;
  navigate: (path: string) => void;
}

export default function EditorPage({ projectId, navigate }: Props) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const store = useEditorStore();

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
    store.setProjectId(project.id);
    store.setProjectName(project.name);
    store.setObjects(project.objects || []);
    setLoaded(true);

    const tutorialSeen = localStorage.getItem('eduarch3d_tutorial_seen');
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
  }, [projectId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
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
    return () => clearInterval(interval);
  }, [loaded]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const s = useEditorStore.getState();
      if (e.key === 'g' || e.key === 'G') {
        s.setTransformMode('translate');
      } else if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
        s.setTransformMode('rotate');
      } else if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        s.setTransformMode('scale');
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (s.selectedObjectId) {
          s.removeObject(s.selectedObjectId);
        }
      } else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (s.selectedObjectId) {
          s.duplicateObject(s.selectedObjectId);
        }
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        s.undo();
      } else if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        s.redo();
      } else if (e.key === 'Escape') {
        s.selectObject(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSave = useCallback(() => {
    const s = useEditorStore.getState();
    if (!s.projectId) return;
    saveProject({
      id: s.projectId,
      name: s.projectName,
      description: '',
      objects: s.objects,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    s.markClean();
  }, []);

  function handleDismissTutorial() {
    setShowTutorial(false);
    localStorage.setItem('eduarch3d_tutorial_seen', 'true');
  }

  if (!loaded) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1e1e2e',
        color: 'white',
        fontSize: '1.1rem',
      }}>
        Loading project...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#1e1e2e',
    }}>
      <TopToolbar onSave={handleSave} onBack={() => navigate('/dashboard')} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {store.sidebarOpen && <AssetSidebar />}
        <div style={{ flex: 1, position: 'relative' }}>
          <SceneCanvas />
        </div>
        {store.propertiesPanelOpen && store.selectedObjectId && <PropertiesPanel />}
      </div>
      <BottomBar />
      {showTutorial && <TutorialOverlay onDismiss={handleDismissTutorial} />}
    </div>
  );
}
