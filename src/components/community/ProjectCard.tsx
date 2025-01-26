import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitBranch, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  id: number;
  title: string;
  author: string;
  stars: number;
  forks: number;
  description: string;
  tags: string[];
  image: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  stars,
  forks,
  description,
  tags,
  image,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center"
          >
            View Project
            <ExternalLink className="w-4 h-4 ml-2" />
          </motion.button>
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>by {author}</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {stars}
            </div>
            <div className="flex items-center">
              <GitBranch className="w-4 h-4 mr-1" />
              {forks} forks
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;