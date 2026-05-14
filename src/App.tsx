import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';

type Route =
  | { page: 'landing' }
  | { page: 'dashboard' }
  | { page: 'editor'; projectId: string };

export default function App() {
  const [route, setRoute] = useState<Route>({ page: 'landing' });

  // Simple hash-based routing
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash || '#/';
      if (hash.startsWith('#/editor/')) {
        const projectId = hash.replace('#/editor/', '');
        if (projectId) {
          setRoute({ page: 'editor', projectId });
          return;
        }
      }
      if (hash === '#/dashboard') {
        setRoute({ page: 'dashboard' });
        return;
      }
      setRoute({ page: 'landing' });
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  function navigate(path: string) {
    window.location.hash = path;
  }

  switch (route.page) {
    case 'dashboard':
      return <DashboardPage navigate={navigate} />;
    case 'editor':
      return <EditorPage projectId={route.projectId} navigate={navigate} />;
    default:
      return <LandingPage navigate={navigate} />;
  }
}
