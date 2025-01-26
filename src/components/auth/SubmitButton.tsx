import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text, loadingText }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
          {loadingText}
        </>
      ) : (
        <>
          {text}
          <ArrowRight className="ml-2 w-5 h-5" />
        </>
      )}
    </button>
  );
};

export default SubmitButton;