import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Simulation from './pages/Simulation';

function App() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const elementId = location.hash.slice(1);
    window.setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-dark text-text-cream">
      <Navbar />
      <div className="pt-[73px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Navigate to="/#education" replace />} />
          <Route path="/peta-rasa" element={<Navigate to="/#peta-kopi" replace />} />
          <Route path="/peta-kopi" element={<Navigate to="/#peta-kopi" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/simulation" element={<Navigate to={user ? '/#simulation' : '/#simulation-login'} replace />} />
          <Route
            path="/lab"
            element={
              <ProtectedRoute>
                <Simulation />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
