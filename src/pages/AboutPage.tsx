import React from 'react';
import { Github, Linkedin, GraduationCap, Brain, Code2, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-16 transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Swayam Mehta
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Computer Engineering Senior @ UNC Charlotte
            </p>
          </div>

          {/* Main Content */}
          <div className={`${
            isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-300`}>
            <div className="prose max-w-none dark:prose-invert">
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                Hello! I'm Swayam Mehta, a senior in Computer Engineering with a concentration in Machine Learning 
                at the University of North Carolina at Charlotte. My journey in machine learning has taken me 
                through a variety of projects, from building deep learning models to creating innovative 
                applications in fields like smart surveillance, robotics, and healthcare.
              </p>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                My goal with Aether is simple: to make machine learning accessible to everyone, whether 
                you're just getting started or looking to deepen your understanding. Here, I'll be sharing 
                insights, tutorials, and hands-on projects that break down complex concepts into manageable, 
                easy-to-follow steps. I believe that machine learning has something to offer everyone, and 
                I'm excited to help you unlock its potential.
              </p>
            </div>

            {/* Skills & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 transition-colors duration-300`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Machine Learning</h3>
                </div>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Deep learning, neural networks, and computer vision</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 transition-colors duration-300`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Code2 className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Development</h3>
                </div>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Full-stack development and MLOps</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 transition-colors duration-300`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <GraduationCap className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Education</h3>
                </div>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Teaching and sharing ML knowledge</p>
              </motion.div>
            </div>
          </div>

          {/* Connect Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${
              isDark ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            } rounded-2xl p-8 text-white text-center transition-colors duration-300`}
          >
            <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
            <div className="flex justify-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/Swayyum"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } text-indigo-600 p-3 rounded-full transition-colors duration-300`}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/swayam-mehta/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } text-indigo-600 p-3 rounded-full transition-colors duration-300`}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;