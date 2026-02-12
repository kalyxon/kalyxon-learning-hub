import { ChevronRight, BookOpen } from 'lucide-react';
import '../styles/CourseSelection.css';

function CourseSelection({ categories, onSelectCategory }) {
  return (
    <div className="course-selection">
      <div className="course-selection-header">
        <h1 className="selection-title">Choose Your Learning Path</h1>
        <p className="selection-subtitle">
          Select a course to get started with your learning journey
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-card"
            onClick={() => onSelectCategory(category)}
          >
            <div className="category-card-icon">
              <BookOpen size={48} />
            </div>
            <h2 className="category-card-title">{category.name}</h2>
            <p className="category-card-description">{category.description}</p>
            <div className="category-card-meta">
              <span className="course-count">{category.count} courses</span>
              <ChevronRight size={20} className="chevron-icon" />
            </div>
          </button>
        ))}
      </div>

      <section className="course-selection-info">
        <h2 className="info-title">Why Choose a Course?</h2>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-number">1</div>
            <h3>Focused Learning</h3>
            <p>Stay focused on one subject at a time</p>
          </div>
          <div className="info-item">
            <div className="info-number">2</div>
            <h3>Structured Path</h3>
            <p>Follow a logical learning progression</p>
          </div>
          <div className="info-item">
            <div className="info-number">3</div>
            <h3>Track Progress</h3>
            <p>Monitor your completion within each course</p>
          </div>
          <div className="info-item">
            <div className="info-number">4</div>
            <h3>Easy Navigation</h3>
            <p>Jump between related topics effortlessly</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseSelection;
