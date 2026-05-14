import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import EditorPage from '@/pages/EditorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/editor/:projectId" element={<EditorPage />} />
    </Routes>
  );
}
