import { ChevronRight, CheckCircle } from 'lucide-react';
import '../styles/Sidebar.css';

function Sidebar({ tutorials, currentTutorial, onSelectTutorial, userProgress }) {
  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h2>Curriculum</h2>
      </div>

      <div className="tutorials-list">
        {tutorials.map((tutorial) => {
          const isActive = currentTutorial?.id === tutorial.id;
          const isCompleted = userProgress?.[tutorial.id]?.completed;

          return (
            <button
              key={tutorial.id}
              className={`tutorial-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectTutorial(tutorial)}
            >
              <div className="tutorial-item-content">
                <span className="tutorial-category">{tutorial.category}</span>
                <span className="tutorial-title">{tutorial.title}</span>
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
        })}
      </div>

      <div className="sidebar-footer">
        <div className="progress-stat">
          <span className="stat-label">Completed</span>
          <span className="stat-value">
            {Object.values(userProgress || {}).filter(p => p.completed).length} / {tutorials.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
