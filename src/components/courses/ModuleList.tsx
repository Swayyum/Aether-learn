import React from 'react';
import { motion } from 'framer-motion';
import { Module } from '../../data/courses/foundations';
import { Clock, ChevronRight } from 'lucide-react';

interface ModuleListProps {
  modules: Module[];
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  activeModule,
  onModuleSelect
}) => {
  return (
    <div className="space-y-4">
      {modules.map((module, index) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            onClick={() => onModuleSelect(module.id)}
            className={`w-full text-left p-4 rounded-xl transition-all ${
              activeModule === module.id
                ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className={`font-semibold ${
                activeModule === module.id ? 'text-indigo-600' : 'text-gray-900'
              }`}>
                {module.title}
              </h3>
              <ChevronRight className={`w-5 h-5 ${
                activeModule === module.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
            </div>
            <p className="text-sm text-gray-500 mt-1">{module.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {module.duration}
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default ModuleList;