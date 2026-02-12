import { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { authService } from '../services/firebase';
import '../styles/LoginModal.css';

function LoginModal({ onLogin, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter an email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!displayName.trim()) {
      setError('Please enter a display name');
      return;
    }

    try {
      setLoading(true);
      const user = await authService.signUp(email, password, displayName);
      onLogin(user);
      // Auto-close modal after 500ms
      setTimeout(() => onClose(), 500);
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter an email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    try {
      setLoading(true);
      const user = await authService.signIn(email, password);
      onLogin(user);
      // Auto-close modal after 500ms
      setTimeout(() => onClose(), 500);
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');

    if (!resetEmail.trim()) {
      setError('Please enter an email');
      return;
    }

    if (!validateEmail(resetEmail)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(resetEmail);
      setResetSent(true);
      setTimeout(() => {
        setResetMode(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content">
          {resetMode ? (
            <>
              <h2 className="modal-title">Reset Password</h2>
              <p className="modal-subtitle">Enter your email to receive a password reset link</p>

              {resetSent ? (
                <div className="success-message">
                  <p>✓ Password reset email sent!</p>
                  <p className="small-text">Check your email for instructions.</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="login-form">
                  <div className="form-group">
                    <label htmlFor="reset-email">Email</label>
                    <input
                      id="reset-email"
                      type="email"
                      placeholder="your@email.com"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        setError('');
                      }}
                      disabled={loading}
                      autoFocus
                    />
                    {error && <span className="error-message">{error}</span>}
                  </div>

                  <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader size={16} className="spinner" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>

                  <button
                    type="button"
                    className="toggle-link"
                    onClick={() => {
                      setResetMode(false);
                      setError('');
                      setResetEmail('');
                    }}
                  >
                    Back to Sign In
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <h2 className="modal-title">Welcome to Kalyxon</h2>
              <p className="modal-subtitle">
                {isSignUp ? 'Create an account to track your learning' : 'Sign in to your account'}
              </p>

              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="login-form">
                {isSignUp && (
                  <div className="form-group">
                    <label htmlFor="display-name">Display Name</label>
                    <input
                      id="display-name"
                      type="text"
                      placeholder="Your name"
                      value={displayName}
                      onChange={(e) => {
                        setDisplayName(e.target.value);
                        setError('');
                      }}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    disabled={loading}
                  />
                </div>

                {error && <span className="error-message">{error}</span>}

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader size={16} className="spinner" />
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </>
                  ) : isSignUp ? (
                    'Create Account'
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="modal-footer">
                <div className="auth-toggle">
                  <p className="toggle-text">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      type="button"
                      className="toggle-link"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError('');
                        setEmail('');
                        setPassword('');
                        setDisplayName('');
                      }}
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>

                {!isSignUp && (
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => {
                      setResetMode(true);
                      setError('');
                    }}
                  >
                    Forgot Password?
                  </button>
                )}

                <p className="privacy-note">
                  Your data is securely stored with Firebase. We don't share your information with third parties.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
