import { BookOpen, Code, Zap, Users } from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard({ user, onSelectTutorial, onGetStarted }) {
  const stats = [
    { icon: <BookOpen size={24} />, label: 'Tutorials', value: '12+' },
    { icon: <Code size={24} />, label: 'Languages', value: 'C++, JS, More' },
    { icon: <Zap size={24} />, label: 'Topics', value: 'DSA, OOP, Basics' },
    { icon: <Users size={24} />, label: 'Learners', value: 'Growing' }
  ];

  const features = [
    {
      title: 'Comprehensive Tutorials',
      description: 'In-depth guides on DSA, C++, JavaScript, OOP, and more. Written by a passionate developer.'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey. Track completion percentage, time spent, and course progress.'
    },
    {
      title: 'Clean Design',
      description: 'Minimal, distraction-free interface inspired by W3Schools. Focus on learning, not clutter.'
    },
    {
      title: 'Markdown-Based',
      description: 'All content written in Markdown. Easy to update, maintain, and extend your courses.'
    }
  ];

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Kalyxon</h1>
          <p className="hero-subtitle">
            A sophisticated learning platform for Data Structures, Algorithms, C++, JavaScript, OOP, and more
          </p>
          {!user && (
            <button className="cta-button" onClick={onGetStarted}>
              Get Started →
            </button>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Kalyxon?</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      {!user && (
        <section className="cta-section">
          <h2>Start Learning Today</h2>
          <p>Sign in to begin your learning journey and track your progress</p>
          <button className="cta-button large" onClick={onGetStarted}>
            Sign In Now →
          </button>
        </section>
      )}

      {/* User Dashboard */}
      {user && (
        <section className="user-dashboard">
          <h2>Welcome, {user.username}! 👋</h2>
          <p className="subtitle">Choose a tutorial to start learning</p>
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="label">Total Courses</span>
              <span className="value">12</span>
            </div>
            <div className="quick-stat">
              <span className="label">In Progress</span>
              <span className="value">
                {Object.values(user.progress || {}).length || 0}
              </span>
            </div>
            <div className="quick-stat">
              <span className="label">Completed</span>
              <span className="value">
                {Object.values(user.progress || {}).filter(p => p.completed).length || 0}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2024 Kalyxon. Made by a passionate developer.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
