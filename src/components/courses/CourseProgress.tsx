import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface CourseProgressProps {
  totalModules: number;
  completedModules: number;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
  totalModules,
  completedModules
}) => {
  const progress = (completedModules / totalModules) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Course Progress</h2>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {completedModules}/{totalModules} Modules
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Module Status</h3>
        <div className="space-y-2">
          {Array.from({ length: totalModules }).map((_, index) => (
            <div
              key={index}
              className="flex items-center text-sm"
            >
              {index < completedModules ? (
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 mr-2" />
              )}
              <span className="text-gray-600">
                Module {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;