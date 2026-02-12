import { BookOpen, Code, Zap, Users, ChevronRight } from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard({ user, onSelectTutorial, onGetStarted, courses = [] }) {
  const stats = [
    { icon: <BookOpen size={24} />, label: 'Tutorials', value: '20+' },
    { icon: <Code size={24} />, label: 'Languages', value: 'C++, JS, More' },
    { icon: <Zap size={24} />, label: 'Topics', value: 'DSA, OOP, Basics' },
    { icon: <Users size={24} />, label: 'Learners', value: 'Growing' }
  ];

  const features = [
    {
      title: 'Organized Learning',
      description: 'Choose a course and focus on one subject at a time'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey within each course'
    },
    {
      title: 'Clean Design',
      description: 'Minimal, distraction-free interface focused on learning'
    },
    {
      title: 'Markdown-Based',
      description: 'All content written in Markdown for easy updates'
    }
  ];

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Kalyxon</h1>
          <p className="hero-subtitle">
            Choose a course below and start your learning journey
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

      {/* Courses Section */}
      {user && courses && courses.length > 0 && (
        <section className="courses-section">
          <h2 className="section-title">Choose Your Course</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <button
                key={course.id}
                className="course-card"
                onClick={() => onSelectTutorial(course)}
              >
                <div className="course-card-top">
                  <div className="course-icon">
                    <BookOpen size={40} />
                  </div>
                  <span className="course-badge">{course.count} tutorials</span>
                </div>
                <div className="course-card-content">
                  <h3 className="course-title">{course.name}</h3>
                  <p className="course-description">{course.description}</p>
                </div>
                <div className="course-card-footer">
                  <span className="start-link">
                    Start Learning
                    <ChevronRight size={18} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

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
          <h2>Welcome, {user.displayName}! 👋</h2>
          <p className="subtitle">Select a course above to begin or continue learning</p>
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
