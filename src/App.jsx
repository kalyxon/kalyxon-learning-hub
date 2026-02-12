import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, BarChart3, Home, AlertCircle, Moon, Sun, BookOpen } from 'lucide-react';
import Sidebar from './components/Sidebar';
import CourseSelection from './components/CourseSelection';
import TutorialView from './components/TutorialView';
import Dashboard from './components/Dashboard';
import ProgressPage from './components/ProgressPage';
import LoginModal from './components/LoginModal';
import { tutorialData } from './data/tutorials';
import { authService, firestoreService } from './services/firebase';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Get unique categories from tutorials
  const getCategories = () => {
    const categories = {};
    tutorialData.forEach(tutorial => {
      if (!categories[tutorial.category]) {
        categories[tutorial.category] = {
          id: tutorial.category.toLowerCase().replace(/\s+/g, '-'),
          name: tutorial.category,
          description: getSubcategoryDescription(tutorial.category),
          count: 0
        };
      }
      categories[tutorial.category].count += 1;
    });
    return Object.values(categories);
  };

  const getSubcategoryDescription = (category) => {
    const descriptions = {
      'DSA': 'Data Structures & Algorithms - Master the fundamentals of efficient coding',
      'C++': 'C++ Programming - Learn powerful systems programming language',
      'JavaScript': 'JavaScript & Web - Build interactive web applications',
      'OOP': 'Object-Oriented Programming - Design scalable applications',
      'Python': 'Python Programming - Master versatile programming language',
      'Java': 'Java Development - Enterprise-level programming',
      'Web': 'Web Development - Create modern web experiences',
      'System': 'System Design - Build scalable systems'
    };
    return descriptions[category] || `Learn ${category} programming`;
  };

  // Apply dark mode preference
  useEffect(() => {
    localStorage.setItem('dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Initialize Firebase auth state
  useEffect(() => {
    setLoading(true);
    let authCheckTimeout;

    const unsubscribe = authService.onAuthStateChanged(async (authUser) => {
      // Clear timeout if auth is found
      if (authCheckTimeout) {
        clearTimeout(authCheckTimeout);
      }

      if (authUser) {
        try {
          console.log('👤 User authenticated:', authUser.email);
          const progress = await firestoreService.getUserProgress(authUser.uid);
          setUser({
            id: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || 'User',
            loginDate: authUser.metadata?.creationTime
          });
          setUserProgress(progress || {});
        } catch (error) {
          console.error('Error loading user data:', error);
          setFirebaseError('Error loading your data. Some features may not work.');
        }
      } else {
        console.log('👤 No user authenticated');
        setUser(null);
        setUserProgress({});
        setCurrentPage('dashboard');
        setSelectedCategory(null);
      }
      setLoading(false);
    });

    // Timeout after 8 seconds - show content even if Firebase is slow
    authCheckTimeout = setTimeout(() => {
      console.warn('⚠️ Auth check timeout - showing content');
      setLoading(false);
    }, 8000);

    return () => {
      unsubscribe();
      if (authCheckTimeout) clearTimeout(authCheckTimeout);
    };
  }, []);

  const handleLogin = (firebaseUser) => {
    setShowLoginModal(false);
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setUserProgress({});
      setCurrentPage('dashboard');
      setSelectedCategory(null);
    } catch (error) {
      setFirebaseError('Error signing out: ' + error.message);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentTutorial(null);
    setCurrentPage('tutorial');
    setSidebarOpen(true);
  };

  const handleBackToCourses = () => {
    setSelectedCategory(null);
    setCurrentTutorial(null);
    setCurrentPage('dashboard');
  };

  const handleSelectTutorial = (tutorial) => {
    setCurrentTutorial(tutorial);
    setCurrentPage('tutorial');
    setSidebarOpen(false);
  };

  const handleCompleteTutorial = async () => {
    if (!user || !currentTutorial) {
      setFirebaseError('Please sign in and select a tutorial first');
      return;
    }

    try {
      const timeSpent = Math.floor(Math.random() * 120) + 10;
      
      console.log('💾 Saving progress to Firebase...');

      // Add timeout to prevent hanging
      const savePromise = firestoreService.completeTutorial(
        user.id,
        currentTutorial.id,
        timeSpent
      );

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Save timeout')), 10000)
      );

      await Promise.race([savePromise, timeoutPromise]);

      // Update local state
      setUserProgress(prev => ({
        ...prev,
        [currentTutorial.id]: {
          completed: true,
          completedAt: new Date().toISOString(),
          timeSpent: timeSpent
        }
      }));

      console.log('✅ Progress saved successfully!');
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      
      if (error.message === 'Save timeout') {
        setFirebaseError('Saving took too long. Please check your connection.');
      } else {
        setFirebaseError('Error saving progress: ' + error.message);
      }

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setFirebaseError('');
      }, 5000);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Kalyxon...</p>
        </div>
      );
    }

    if (!user) {
      return <Dashboard onGetStarted={() => setShowLoginModal(true)} />;
    }

    // Show course selection if no category selected
    if (selectedCategory === null && currentPage !== 'progress' && currentPage !== 'dashboard') {
      return <CourseSelection 
        categories={getCategories()} 
        onSelectCategory={handleSelectCategory} 
      />;
    }

    switch (currentPage) {
      case 'tutorial':
        if (selectedCategory && currentTutorial) {
          return (
            <TutorialView 
              tutorial={currentTutorial}
              onComplete={handleCompleteTutorial}
              userProgress={userProgress[currentTutorial.id]}
            />
          );
        }
        // If no category selected, show course selection
        if (selectedCategory === null) {
          return <CourseSelection 
            categories={getCategories()} 
            onSelectCategory={handleSelectCategory} 
          />;
        }
        return null;
      case 'progress':
        return <ProgressPage user={user} tutorials={tutorialData} userProgress={userProgress} />;
      case 'dashboard':
      default:
        return <Dashboard user={user} onSelectTutorial={handleSelectCategory} courses={getCategories()} />;
    }
  };

  return (
    <div className="app">
      {/* Firebase Error Alert */}
      {firebaseError && (
        <div className="firebase-error-banner">
          <div className="error-content">
            <AlertCircle size={20} />
            <span>{firebaseError}</span>
          </div>
          <button 
            className="error-close"
            onClick={() => setFirebaseError(null)}
          >
            ×
          </button>
        </div>
      )}

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
            <BookOpen size={32} className="logo-icon" />
            <h1 className="logo">kalyxon</h1>
            <span className="tagline">Learn DSA, C++, JavaScript & More</span>
          </div>
        </div>

        <nav className="header-nav">
          <button 
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage('dashboard');
              setSelectedCategory(null);
            }}
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
                <div className="user-info">
                  <span className="username">{user.displayName}</span>
                  <span className="user-email">{user.email}</span>
                </div>
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
        {/* Sidebar - Show only when category is selected */}
        {user && selectedCategory && currentPage === 'tutorial' && (
          <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <Sidebar 
              tutorials={tutorialData}
              currentTutorial={currentTutorial}
              onSelectTutorial={handleSelectTutorial}
              userProgress={userProgress}
              selectedCategory={selectedCategory}
              onBackToCourses={handleBackToCourses}
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
