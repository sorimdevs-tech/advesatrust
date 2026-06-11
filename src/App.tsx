import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Mission from './components/Mission';
import About from './components/About';
import Team from './components/Team';
import Vision from './components/Vision';
import Gallery from './components/Gallery';
import Activities from './components/Activities';
import Impact from './components/Impact';
import Blog from './components/Blog';
import Donate from './components/Donate';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(window.location.pathname === '/admin');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#68B581]"></div>
      </div>
    );
  }

  if (isAdminRoute) {
    return user ? <AdminDashboard /> : <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navigation />
      <Hero />
      <Mission />
      <About />
      <Gallery />
      <Team />
      <Vision />
      <Activities />
      <Impact />
      <Blog />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
