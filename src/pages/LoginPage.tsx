import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
  const { isDark } = useTheme();

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
            Welcome back
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        <div className={`${
          isDark ? 'bg-gray-800' : 'bg-white'
        } py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;