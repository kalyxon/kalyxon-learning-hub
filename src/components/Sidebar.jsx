import { ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';
import '../styles/Sidebar.css';

function Sidebar({ 
  tutorials, 
  currentTutorial, 
  onSelectTutorial, 
  userProgress, 
  selectedCategory,
  onBackToCourses 
}) {
  // Filter tutorials by selected category
  const categoryTutorials = tutorials.filter(
    tutorial => tutorial.category === selectedCategory?.name
  );

  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <button className="back-button" onClick={onBackToCourses}>
          <ArrowLeft size={20} />
          <span>Back to Courses</span>
        </button>
        <h2 className="sidebar-category-title">{selectedCategory?.name}</h2>
        <p className="sidebar-category-subtitle">
          {categoryTutorials.length} tutorials
        </p>
      </div>

      <div className="tutorials-list">
        {categoryTutorials.length > 0 ? (
          categoryTutorials.map((tutorial) => {
            const isActive = currentTutorial?.id === tutorial.id;
            const isCompleted = userProgress?.[tutorial.id]?.completed;

            return (
              <button
                key={tutorial.id}
                className={`tutorial-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => onSelectTutorial(tutorial)}
              >
                <div className="tutorial-item-content">
                  <span className="tutorial-number">
                    {categoryTutorials.indexOf(tutorial) + 1}
                  </span>
                  <div className="tutorial-text">
                    <span className="tutorial-title">{tutorial.title}</span>
                    <span className="tutorial-difficulty" data-level={tutorial.difficulty}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>
                <div className="tutorial-item-icon">
                  {isCompleted ? (
                    <CheckCircle size={18} className="check-icon" />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div className="no-tutorials">
            <p>No tutorials available</p>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="progress-stat">
          <span className="stat-label">Progress</span>
          <span className="stat-value">
            {categoryTutorials.filter(t => userProgress?.[t.id]?.completed).length} / {categoryTutorials.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
