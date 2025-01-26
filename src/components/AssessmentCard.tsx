import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AssessmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: string;
  timeEstimate: string;
  questions: number;
  category: 'core' | 'modern' | 'practical';
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  description,
  icon: Icon,
  difficulty,
  timeEstimate,
  questions,
  category
}) => {
  const getCategoryStyles = () => {
    switch (category) {
      case 'modern':
        return 'bg-purple-50 text-purple-600';
      case 'practical':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-indigo-50 text-indigo-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getCategoryStyles()}`}>
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="px-2 py-1 rounded-full bg-gray-100">{difficulty}</span>
          <span>{timeEstimate}</span>
          <span>{questions} Questions</span>
        </div>
      </div>
      
      <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
        Start Learning
      </button>
    </div>
  );
};

export default AssessmentCard;