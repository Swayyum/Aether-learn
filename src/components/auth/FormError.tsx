import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-start">
      <AlertCircle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;