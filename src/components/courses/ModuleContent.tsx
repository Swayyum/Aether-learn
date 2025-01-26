import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Module } from '../../data/courses/foundations';
import { useTheme } from '../../context/ThemeContext';

interface ModuleContentProps {
  module: Module;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-4xl mx-auto">
      {module.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img
            src={module.image}
            alt={module.title}
            className="w-full h-64 object-cover rounded-xl"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`prose prose-lg max-w-none ${
          isDark ? 'prose-invert' : ''
        }`}
      >
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {module.content}
        </ReactMarkdown>
      </motion.div>

      {module.exercises && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className={`text-2xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Practice Exercises
          </h2>
          <div className="space-y-8">
            {module.exercises.map((exercise, index) => (
              <div
                key={index}
                className={`${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-lg p-6`}
              >
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Question {index + 1}: {exercise.question}
                </h3>
                <div className="space-y-3">
                  {exercise.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                        isDark 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className={
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleContent;