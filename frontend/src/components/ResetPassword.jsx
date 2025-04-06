import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/api';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  // Get token from URL if available
  const token = new URLSearchParams(location.search).get('token');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Handle request password reset
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authService.requestPasswordReset(email);
      toast.success('Password reset link has been sent to your email');
      setEmail('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send reset link';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await authService.resetPassword(token, password);
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to reset password';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        {token ? (
          // Reset password form
          <>
            <h1>Set New Password</h1>
            <p className="subtitle">Enter your new password</p>
            
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="reset-button" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        ) : (
          // Request reset form
          <>
            <h1>Reset Password</h1>
            <p className="subtitle">Enter your email to receive a reset link</p>
            
            <form onSubmit={handleRequestReset}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="reset-button" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
        
        <div className="back-to-login">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;