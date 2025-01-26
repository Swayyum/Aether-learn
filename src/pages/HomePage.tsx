import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Code2, Trophy, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { isDark } = useTheme();
  
  const features = [
    {
      icon: Brain,
      title: 'Advanced ML Assessments',
      description: 'Test your knowledge in LLMs, Vision Transformers, and more'
    },
    {
      icon: Code2,
      title: 'Hands-on Coding',
      description: 'Practice with real-world ML implementations'
    },
    {
      icon: Trophy,
      title: 'Skill Certification',
      description: 'Earn certificates recognized by industry experts'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative min-h-[90vh] flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-white'
      } transition-colors duration-300`}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30" />
          <div className="grid grid-cols-8 gap-4 rotate-12 scale-150">
            {Array.from({ length: 64 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className={`h-32 rounded-lg ${isDark ? 'bg-indigo-800/20' : 'bg-indigo-500/10'}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full px-4 py-1"
            >
              <Zap className="w-4 h-4 text-white mr-2" />
              <span className="text-white text-sm">Free ML Learning Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Master Machine Learning with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Confidence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Free comprehensive skill assessments and learning paths for modern AI technologies
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/survey"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/courses"
                className={`${
                  isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-50'
                } px-8 py-3 rounded-lg font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-105 text-center`}
              >
                View Courses
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <motion.div variants={item} className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Choose Aether?
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Our platform combines cutting-edge ML assessments with practical learning experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className={`${
                    isDark ? 'bg-gray-900 hover:bg-gray-900/80' : 'bg-white hover:bg-gray-50'
                  } rounded-xl p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white text-center relative overflow-hidden"
          >
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent"
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Test Your ML Skills?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of ML engineers who have improved their skills with our free platform
              </p>
              <Link
                to="/survey"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Take the Survey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;