import { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/LoginModal.css';

function LoginModal({ onLogin, onClose }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    onLogin(username);
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content">
          <h2 className="modal-title">Welcome to Kalyxon</h2>
          <p className="modal-subtitle">Sign in to start tracking your learning progress</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                autoFocus
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            <button type="submit" className="submit-button">
              Get Started
            </button>
          </form>

          <div className="modal-footer">
            <p className="privacy-note">
              Your data is stored locally in your browser. We don't collect any personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
