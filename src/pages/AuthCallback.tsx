import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase/client';
import { motion } from 'framer-motion';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          navigate('/login', {
            replace: true,
            state: { error: 'Authentication failed: ' + error.message }
          });
          return;
        }
        
        if (session) {
          // Wait a moment to ensure session is fully established
          await new Promise(resolve => setTimeout(resolve, 500));
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/login', {
            replace: true,
            state: { error: 'Authentication failed. Please try again.' }
          });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login', { 
          replace: true,
          state: { error: 'Authentication failed. Please try again.' }
        });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Completing authentication...</p>
      </div>
    </motion.div>
  );
};

export default AuthCallback;