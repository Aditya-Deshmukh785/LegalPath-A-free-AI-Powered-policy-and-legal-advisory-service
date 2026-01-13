import React, { useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import HeroSection, { HeroSectionHandle } from './components/HeroSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import LogoutConfirmModal from './components/LogoutConfirmModal';

interface User {
  name: string;
  email: string;
  photoUrl?: string;
}

const App: React.FC = () => {
  const heroRef = useRef<HeroSectionHandle>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    // Check for token in URL (from Google OAuth callback)
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('authToken', token);

      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);

        // Extract user details from the payload
        const { name, email, profilePicture } = payload;

        setUser({
          name: name || '(Unknown User)',
          email: email || '',
          photoUrl: profilePicture || ''
        });

        // Clean URL
        window.history.replaceState({}, document.title, "/");
      } catch (e) {
        console.error("Invalid token", e);
      }
    } else {
      // Check if token exists in localStorage (for page refresh)
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        try {
          const base64Url = storedToken.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          const payload = JSON.parse(jsonPayload);

          // Extract user details from the payload
          const { name, email, profilePicture } = payload;

          setUser({
            name: name || '(Unknown User)',
            email: email || '',
            photoUrl: profilePicture || ''
          });
        } catch (e) {
          console.error("Invalid stored token", e);
          localStorage.removeItem('authToken');
        }
      }
    }
  }, []);

  const handleNavigate = (type: 'policy' | 'law') => {
    heroRef.current?.highlightCard(type);
  };

  const handleLogin = (userData: User, token?: string) => {
    setUser(userData);
    // Store token if provided (from email/password login)
    if (token) {
      localStorage.setItem('authToken', token);
    }
  };

  const handleLogoutConfirm = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    setIsLogoutConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar for Desktop */}
      <Sidebar
        onNavigate={handleNavigate}
        onLoginClick={() => setIsLoginModalOpen(true)}
        user={user}
        onLogout={() => setIsLogoutConfirmOpen(true)}
      />

      {/* Bottom Nav for Mobile */}
      <MobileNav
        onLoginClick={() => setIsLoginModalOpen(true)}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen relative pb-20 md:pb-0">
        <HeroSection ref={heroRef} user={user} onLoginClick={() => setIsLoginModalOpen(true)} />
        <Footer />
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <LogoutConfirmModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default App;