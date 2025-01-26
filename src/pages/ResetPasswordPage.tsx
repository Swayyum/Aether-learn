import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { handlePasswordReset, updatePassword } from '../lib/supabase/auth';
import FormInput from '../components/auth/FormInput';
import FormError from '../components/auth/FormError';
import SubmitButton from '../components/auth/SubmitButton';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isDark } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          throw new Error('No reset token provided');
        }
        await handlePasswordReset(token);
      } catch (error) {
        console.error('Error verifying reset token:', error);
        navigate('/forgot-password', {
          state: { error: 'Invalid or expired reset link. Please try again.' }
        });
      }
    };

    verifyResetToken();
  }, [navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      await updatePassword(password);
      navigate('/login', {
        state: { message: 'Password updated successfully! Please sign in with your new password.' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Reset your password
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Please enter your new password below
          </p>
        </div>

        <div className={`${
          isDark ? 'bg-gray-800' : 'bg-white'
        } py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <FormError message={error} />}

            <FormInput
              label="New Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <SubmitButton
              loading={loading}
              text="Reset Password"
              loadingText="Updating..."
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;