import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams(); // Access the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);  // For loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or expired token');
      navigate('/login'); // Redirect to login page if no token
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);  // Show loading indicator

    try {
      const apiUrl = `http://localhost:4000/api/auth/reset-password/${token}`;
      console.log('Sending reset request to:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      let responseBody = '';
      // Read the response body once based on its content type
      if (response.ok) {
        responseBody = await response.json(); // If successful, read as JSON
      } else {
        responseBody = await response.text(); // If failed, read as text
      }

      // Check if the response is OK or not
      if (!response.ok) {
        let errorMessage = responseBody.message || 'Unknown error';
        console.error('Response error details:', errorMessage);
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }

      // If response is successful, handle the data
      console.log('Reset successful:', responseBody);
      toast.success('Password reset successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);  // Hide loading indicator
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              className="p-2 border rounded shadow-sm border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="p-2 border rounded shadow-sm border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
