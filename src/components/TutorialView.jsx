import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import '../styles/TutorialView.css';

function TutorialView({ tutorial, onComplete, userProgress }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [completionError, setCompletionError] = useState('');

  useEffect(() => {
    setContent(tutorial.content);
    setIsLoading(false);
  }, [tutorial]);

  const isCompleted = userProgress?.completed;

  const handleCompleteClick = async () => {
    try {
      setIsCompleting(true);
      setCompletionError('');
      setCompletionMessage('');

      console.log('📚 Completing tutorial:', tutorial.id);

      // Set a timeout for the request
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 15000)
      );

      const completionPromise = Promise.resolve(onComplete());

      await Promise.race([completionPromise, timeoutPromise]);

      setCompletionMessage('✅ Tutorial marked as completed!');
      console.log('✅ Completion saved successfully');
      
      // Auto-hide message after 4 seconds
      setTimeout(() => setCompletionMessage(''), 4000);
    } catch (error) {
      console.error('Error:', error);
      
      if (error.message === 'timeout') {
        setCompletionError('Request took too long. Progress may still be saved. Refresh to verify.');
      } else {
        setCompletionError('Unable to save progress. Please try again.');
      }
      
      // Auto-hide error after 6 seconds
      setTimeout(() => setCompletionError(''), 6000);
    } finally {
      setIsCompleting(false);
    }
  };

  const customComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'javascript';

      if (inline) {
        return (
          <code className="inline-code" {...props}>
            {children}
          </code>
        );
      }

      return (
        <div className="code-block-container">
          <div className="code-header">
            <span className="code-language">{language}</span>
            <button 
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(String(children));
              }}
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
              margin: 0,
              borderRadius: '0 0 6px 6px',
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    },
    h1: ({ node, ...props }) => <h1 className="tutorial-h1" {...props} />,
    h2: ({ node, ...props }) => <h2 className="tutorial-h2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="tutorial-h3" {...props} />,
    h4: ({ node, ...props }) => <h4 className="tutorial-h4" {...props} />,
    p: ({ node, ...props }) => <p className="tutorial-p" {...props} />,
    ul: ({ node, ...props }) => <ul className="tutorial-ul" {...props} />,
    ol: ({ node, ...props }) => <ol className="tutorial-ol" {...props} />,
    li: ({ node, ...props }) => <li className="tutorial-li" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="tutorial-blockquote" {...props} />,
    a: ({ node, ...props }) => <a className="tutorial-link" {...props} />,
    img: ({ node, ...props }) => <img className="tutorial-img" {...props} />,
    table: ({ node, ...props }) => <table className="tutorial-table" {...props} />,
    thead: ({ node, ...props }) => <thead className="tutorial-thead" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="tutorial-tbody" {...props} />,
    tr: ({ node, ...props }) => <tr className="tutorial-tr" {...props} />,
    th: ({ node, ...props }) => <th className="tutorial-th" {...props} />,
    td: ({ node, ...props }) => <td className="tutorial-td" {...props} />,
  };

  return (
    <div className="tutorial-view">
      <div className="tutorial-header">
        <div className="tutorial-meta">
          <h1 className="tutorial-title-main">{tutorial.title}</h1>
          <div className="tutorial-info">
            <span className="category-badge">{tutorial.category}</span>
            <span className="difficulty-badge" data-level={tutorial.difficulty}>
              {tutorial.difficulty}
            </span>
          </div>
        </div>
        {isCompleted && (
          <div className="completed-badge">
            <CheckCircle size={24} />
            <span>Completed</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="loading">Loading tutorial...</div>
      ) : (
        <>
          <div className="tutorial-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={customComponents}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Completion Messages */}
          {completionMessage && (
            <div className="completion-success-message">
              <CheckCircle size={20} />
              <span>{completionMessage}</span>
            </div>
          )}
          {completionError && (
            <div className="completion-error-message">
              <AlertCircle size={20} />
              <span>{completionError}</span>
            </div>
          )}

          <div className="tutorial-footer">
            <button 
              className={`complete-btn ${isCompleted ? 'completed' : ''}`}
              onClick={handleCompleteClick}
              disabled={isCompleted || isCompleting}
              title={isCompleted ? 'Already completed!' : 'Mark this tutorial as completed'}
            >
              {isCompleting ? (
                <>
                  <div className="spinner-small"></div>
                  <span>Saving...</span>
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle size={20} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>
            {userProgress?.timeSpent && (
              <div className="time-spent">
                <Clock size={16} />
                <span>{userProgress.timeSpent} minutes spent</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TutorialView;
