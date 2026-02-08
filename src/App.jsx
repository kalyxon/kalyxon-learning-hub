import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, BarChart3, Home } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TutorialView from './components/TutorialView';
import Dashboard from './components/Dashboard';
import ProgressPage from './components/ProgressPage';
import LoginModal from './components/LoginModal';
import { tutorialData } from './data/tutorials';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('kalyxon_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Load first tutorial on mount
  useEffect(() => {
    if (tutorialData.length > 0 && !currentTutorial) {
      setCurrentTutorial(tutorialData[0]);
      setCurrentPage('tutorial');
    }
  }, []);

  const handleLogin = (username) => {
    const newUser = {
      id: Date.now(),
      username,
      loginDate: new Date().toISOString(),
      progress: {}
    };
    localStorage.setItem('kalyxon_user', JSON.stringify(newUser));
    setUser(newUser);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('kalyxon_user');
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handleSelectTutorial = (tutorial) => {
    setCurrentTutorial(tutorial);
    setCurrentPage('tutorial');
    setSidebarOpen(false);
  };

  const handleCompleteTutorial = () => {
    if (user && currentTutorial) {
      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          [currentTutorial.id]: {
            completed: true,
            completedAt: new Date().toISOString(),
            timeSpent: calculateTimeSpent(currentTutorial.id)
          }
        }
      };
      localStorage.setItem('kalyxon_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const calculateTimeSpent = (tutorialId) => {
    // This would track actual time in a real app
    return Math.floor(Math.random() * 120) + 10; // Random for demo
  };

  const renderContent = () => {
    if (!user) {
      return <Dashboard onGetStarted={() => setShowLoginModal(true)} />;
    }

    switch (currentPage) {
      case 'tutorial':
        return currentTutorial ? (
          <TutorialView 
            tutorial={currentTutorial}
            onComplete={handleCompleteTutorial}
            userProgress={user.progress[currentTutorial.id]}
          />
        ) : null;
      case 'progress':
        return <ProgressPage user={user} tutorials={tutorialData} />;
      case 'dashboard':
      default:
        return <Dashboard user={user} onSelectTutorial={handleSelectTutorial} />;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo-section">
            <h1 className="logo">kalyxon</h1>
            <span className="tagline">Learn DSA, C++, JavaScript & More</span>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          {user && (
            <>
              <button
                className={`nav-btn ${currentPage === 'progress' ? 'active' : ''}`}
                onClick={() => setCurrentPage('progress')}
              >
                <BarChart3 size={20} />
                <span>Progress</span>
              </button>
              <div className="user-section">
                <span className="username">{user.username}</span>
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          )}
          {!user && (
            <button 
              className="login-btn"
              onClick={() => setShowLoginModal(true)}
            >
              <User size={20} />
              <span>Sign In</span>
            </button>
          )}
        </nav>
      </header>

      <div className="app-container">
        {/* Sidebar */}
        {user && (
          <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <Sidebar 
              tutorials={tutorialData}
              currentTutorial={currentTutorial}
              onSelectTutorial={handleSelectTutorial}
              userProgress={user.progress}
            />
          </aside>
        )}

        {/* Main Content */}
        <main className="main-content">
          {renderContent()}
        </main>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default App;
