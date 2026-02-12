import { CheckCircle, Clock, BookOpen, Flame } from 'lucide-react';
import '../styles/ProgressPage.css';

function ProgressPage({ user, tutorials, userProgress = {} }) {
  const completedCount = Object.values(userProgress).filter(p => p.completed).length;
  const totalCount = tutorials.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const totalTimeSpent = Object.values(userProgress).reduce((sum, p) => {
    return sum + (p.timeSpent || 0);
  }, 0);

  const categoryProgress = {};
  tutorials.forEach(tutorial => {
    const category = tutorial.category;
    if (!categoryProgress[category]) {
      categoryProgress[category] = { total: 0, completed: 0 };
    }
    categoryProgress[category].total += 1;
    if (userProgress[tutorial.id]?.completed) {
      categoryProgress[category].completed += 1;
    }
  });

  const streak = calculateStreak(userProgress);

  return (
    <div className="progress-page">
      <h1 className="page-title">Your Learning Progress</h1>

      {/* Overview Cards */}
      <section className="progress-overview">
        <div className="progress-card primary">
          <div className="card-content">
            <div className="card-icon">
              <CheckCircle size={32} />
            </div>
            <div className="card-info">
              <p className="card-label">Overall Progress</p>
              <p className="card-value">{completionPercentage}%</p>
              <p className="card-detail">{completedCount} of {totalCount} courses</p>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>

        <div className="progress-card secondary">
          <div className="card-icon">
            <Clock size={32} />
          </div>
          <div className="card-info">
            <p className="card-label">Time Invested</p>
            <p className="card-value">{totalTimeSpent}</p>
            <p className="card-detail">minutes of learning</p>
          </div>
        </div>

        <div className="progress-card secondary">
          <div className="card-icon">
            <Flame size={32} />
          </div>
          <div className="card-info">
            <p className="card-label">Current Streak</p>
            <p className="card-value">{streak}</p>
            <p className="card-detail">days</p>
          </div>
        </div>

        <div className="progress-card secondary">
          <div className="card-icon">
            <BookOpen size={32} />
          </div>
          <div className="card-info">
            <p className="card-label">Completed</p>
            <p className="card-value">{completedCount}</p>
            <p className="card-detail">courses</p>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="category-section">
        <h2 className="section-title">Progress by Category</h2>
        <div className="category-grid">
          {Object.entries(categoryProgress).map(([category, progress]) => {
            const percentage = Math.round((progress.completed / progress.total) * 100);
            return (
              <div key={category} className="category-item">
                <div className="category-header">
                  <h3 className="category-name">{category}</h3>
                  <span className="category-percentage">{percentage}%</span>
                </div>
                <div className="category-progress-bar">
                  <div 
                    className="category-progress-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="category-detail">
                  {progress.completed} of {progress.total} completed
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Course List */}
      <section className="courses-section">
        <h2 className="section-title">Course Details</h2>
        <div className="courses-table">
          <div className="table-header">
            <div className="col-title">Course</div>
            <div className="col-category">Category</div>
            <div className="col-status">Status</div>
            <div className="col-time">Time Spent</div>
          </div>
          <div className="table-body">
            {tutorials.map(tutorial => {
              const progress = userProgress[tutorial.id];
              const isCompleted = progress?.completed;
              const timeSpent = progress?.timeSpent || 0;

              return (
                <div key={tutorial.id} className="table-row">
                  <div className="col-title">
                    <span className="course-title">{tutorial.title}</span>
                  </div>
                  <div className="col-category">
                    <span className="category-badge">{tutorial.category}</span>
                  </div>
                  <div className="col-status">
                    {isCompleted ? (
                      <span className="status-badge completed">
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    ) : (
                      <span className="status-badge pending">In Progress</span>
                    )}
                  </div>
                  <div className="col-time">
                    {timeSpent > 0 ? `${timeSpent} min` : '-'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          {completionPercentage >= 25 && (
            <div className="achievement-badge unlocked">
              <div className="badge-icon">🚀</div>
              <p className="badge-name">Quick Starter</p>
              <p className="badge-desc">25% progress</p>
            </div>
          )}
          {completionPercentage >= 50 && (
            <div className="achievement-badge unlocked">
              <div className="badge-icon">⭐</div>
              <p className="badge-name">Halfway There</p>
              <p className="badge-desc">50% progress</p>
            </div>
          )}
          {completionPercentage >= 75 && (
            <div className="achievement-badge unlocked">
              <div className="badge-icon">🏆</div>
              <p className="badge-name">Almost Master</p>
              <p className="badge-desc">75% progress</p>
            </div>
          )}
          {completionPercentage === 100 && (
            <div className="achievement-badge unlocked">
              <div className="badge-icon">👑</div>
              <p className="badge-name">Master</p>
              <p className="badge-desc">100% complete</p>
            </div>
          )}
          {totalTimeSpent >= 300 && (
            <div className="achievement-badge unlocked">
              <div className="badge-icon">⏰</div>
              <p className="badge-name">Time Warrior</p>
              <p className="badge-desc">5+ hours</p>
            </div>
          )}
          {streak >= 7 && (
            <div className="achievement-badge unlocked">
              <div className="badge-icon">🔥</div>
              <p className="badge-name">Week Warrior</p>
              <p className="badge-desc">7-day streak</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function calculateStreak(userProgress) {
  // Simplified streak calculation
  // In a real app, you'd track daily login/activity
  const completedDates = Object.values(userProgress)
    .filter(p => p.completedAt)
    .map(p => new Date(p.completedAt).toDateString());
  
  return completedDates.length > 0 ? Math.min(completedDates.length, 30) : 0;
}

export default ProgressPage;
