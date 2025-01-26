import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import FormHint from './FormHint';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const iconMap = {
  email: Mail,
  password: Lock,
  name: User,
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const Icon = iconMap[name as keyof typeof iconMap];
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getHintText = () => {
    if (name === 'password' && focused) {
      return 'Password must be at least 8 characters and contain uppercase, lowercase, and numbers';
    }
    return '';
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          className={`
            block w-full pl-10 pr-3 py-2 
            border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${error ? 'border-red-500' : ''}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      <FormHint text={getHintText()} visible={focused} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;