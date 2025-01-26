import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DiscussionCardProps {
  id: number;
  title: string;
  author: string;
  avatar: string;
  replies: number;
  likes: number;
  tags: string[];
  preview: string;
  createdAt: Date;
  onClick: () => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  title,
  author,
  avatar,
  replies,
  likes,
  tags,
  preview,
  createdAt,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <img
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{preview}</p>
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
            <div className="flex items-center space-x-4">
              <span>by {author}</span>
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {replies} replies
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {likes} likes
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                className="text-indigo-600"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscussionCard;