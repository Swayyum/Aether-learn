import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: string;
  attendees: number;
  description: string;
  image: string;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  type,
  attendees,
  description,
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
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
          {type}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {format(date, 'MMM d, yyyy')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {time}
            </div>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {attendees} attending
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Join Event
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard;