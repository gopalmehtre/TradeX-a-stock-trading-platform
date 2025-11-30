import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0 = Login, 1 = Signup
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      setError('');
      setLoading(true);

      // Login
      if (formState === 0) {
        if (!email || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        await handleLogin(email, password);
      }

      // Signup
      if (formState === 1) {
        if (!username || !email || !password || !confirmPassword) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        let result = await handleRegister(username, email, password);
        setMessage(result);
        // Form will redirect automatically on success
      }
    } catch (err) {
      console.log(err);
      let errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              {/* Toggle Buttons */}
              <div className="text-center mb-4">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn ${formState === 0 ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => {
                      setFormState(0);
                      setError('');
                      setMessage('');
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`btn ${formState === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => {
                      setFormState(1);
                      setError('');
                      setMessage('');
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <h2 className="text-center mb-4">
                {formState === 0 ? 'Login to TradeX' : 'Create Account'}
              </h2>

              {/* Error/Success Messages */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}

              {/* Form */}
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Username - Only for Signup */}
                {formState === 1 && (
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                )}

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={formState === 0 ? 'Enter password' : 'Create password'}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Only for Signup */}
                {formState === 1 && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleAuth}
                  disabled={loading}
                >
                  {loading
                    ? formState === 0
                      ? 'Logging in...'
                      : 'Creating account...'
                    : formState === 0
                    ? 'Login'
                    : 'Sign Up'}
                </button>

                {/* Footer Links */}
                <p className="text-center text-muted mb-0">
                  {formState === 0 ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => setFormState(1)}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => setFormState(0)}
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}