import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Code2, Award } from 'lucide-react';

interface CommunityStatsProps {
  discussions: number;
  projects: number;
  contributors: number;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({
  discussions,
  projects,
  contributors
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold mb-4">Community Stats</h3>
      <div className="space-y-4">
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
            <span>Active Discussions</span>
          </div>
          <span className="font-semibold">{discussions.toLocaleString()}</span>
        </motion.div>
        
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Code2 className="w-5 h-5 text-indigo-600 mr-2" />
            <span>Projects</span>
          </div>
          <span className="font-semibold">{projects.toLocaleString()}</span>
        </motion.div>
        
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Award className="w-5 h-5 text-indigo-600 mr-2" />
            <span>Contributors</span>
          </div>
          <span className="font-semibold">{contributors.toLocaleString()}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityStats;