import React from 'react';
import { Github, Linkedin, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-300'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-400'}`} />
              <h3 className="text-xl font-bold text-white">Aether</h3>
            </motion.div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-400'} mb-4`}>
              Elevate your machine learning journey with comprehensive assessments and cutting-edge AI learning paths.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/Swayyum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/swayam-mehta/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Learning Paths</h4>
            <ul className="space-y-2">
              {['Foundation Track', 'LLM Specialization', 'Vision & Multimodal', 'MLOps Excellence'].map((item) => (
                <motion.li key={item} whileHover={{ x: 4 }}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {['Discussion Forum', 'Expert Network', 'Success Stories', 'Newsletter'].map((item) => (
                <motion.li key={item} whileHover={{ x: 4 }}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aether. Created by Swayam Mehta.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;