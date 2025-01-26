import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Code2, ChartBar, Book, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What's your experience level with programming?",
    options: [
      { value: "beginner", label: "Beginner - New to programming" },
      { value: "intermediate", label: "Intermediate - Comfortable with basic programming" },
      { value: "advanced", label: "Advanced - Experienced programmer" }
    ]
  },
  {
    id: 2,
    text: "Have you worked with Machine Learning before?",
    options: [
      { value: "none", label: "No experience" },
      { value: "basics", label: "Basic understanding" },
      { value: "some_projects", label: "Completed some projects" },
      { value: "professional", label: "Professional experience" }
    ]
  },
  {
    id: 3,
    text: "What's your mathematics background?",
    options: [
      { value: "basic", label: "Basic math" },
      { value: "intermediate", label: "College-level calculus" },
      { value: "advanced", label: "Advanced mathematics" }
    ]
  },
  {
    id: 4,
    text: "What's your primary goal with Machine Learning?",
    options: [
      { value: "career", label: "Career transition" },
      { value: "projects", label: "Personal projects" },
      { value: "research", label: "Research" },
      { value: "curiosity", label: "General interest" }
    ]
  }
];

const MLSurvey = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowRecommendation(true);
    }
  };

  const getRecommendedPath = () => {
    const mlExperience = answers[2];
    const mathBackground = answers[3];

    if (mlExperience === 'none' || mlExperience === 'basics') {
      return {
        path: 'foundations',
        title: 'ML Foundations',
        description: 'Start with the basics and build a strong foundation in Machine Learning concepts.',
        icon: Book
      };
    } else if (mathBackground === 'advanced' && mlExperience === 'some_projects') {
      return {
        path: 'advanced',
        title: 'Advanced ML',
        description: 'Dive deep into advanced topics and cutting-edge techniques.',
        icon: Brain
      };
    } else {
      return {
        path: 'intermediate',
        title: 'Intermediate ML',
        description: 'Build on your existing knowledge with practical applications.',
        icon: Code2
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {!showRecommendation ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">ML Learning Path Survey</h2>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-2 bg-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].text}
                </h3>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your Recommended Path</h2>
                <p className="text-gray-600">Based on your responses, we recommend:</p>
              </div>

              {(() => {
                const recommendation = getRecommendedPath();
                const Icon = recommendation.icon;
                
                return (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-semibold">{recommendation.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-6">{recommendation.description}</p>
                    <button
                      onClick={() => navigate(`/courses/${recommendation.path}`)}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    >
                      Start Learning
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLSurvey;