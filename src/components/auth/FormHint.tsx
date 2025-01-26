import React from 'react';
import { Info } from 'lucide-react';

interface FormHintProps {
  text: string;
  visible: boolean;
}

const FormHint: React.FC<FormHintProps> = ({ text, visible }) => {
  if (!visible) return null;

  return (
    <div className="mt-1 text-sm flex items-start space-x-1">
      <Info className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
      <span className="text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  );
};

export default FormHint;