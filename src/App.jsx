import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Simulation from './pages/Simulation';
import SupabaseData from './pages/SupabaseData';

function App() {
  const location = useLocation();

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
          <Route path="/login" element={<Login />} />
          <Route path="/simulation" element={<Navigate to="/#simulation-login" replace />} />
          <Route
            path="/backend"
            element={
              <ProtectedRoute>
                <SupabaseData />
              </ProtectedRoute>
            }
          />
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
