import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Timer, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  code?: string;
  options: string[];
  correctAnswer: number;
}

const AssessmentPage = () => {
  const { assessmentId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [assessment, setAssessment] = useState<{
    title: string;
    questions: Question[];
  }>({
    title: 'Loading...',
    questions: []
  });

  useEffect(() => {
    // In a real app, fetch from API
    setAssessment({
      title: 'LLM Assessment: Transformer Architecture',
      questions: [
        {
          id: 1,
          text: "Which component is responsible for capturing long-range dependencies in a transformer architecture?",
          options: [
            "Feed-forward network",
            "Self-attention mechanism",
            "Layer normalization",
            "Positional encoding"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is the purpose of the scaling factor in scaled dot-product attention?",
          code: `attention = softmax(QK^T / sqrt(d_k))V`,
          options: [
            "To normalize the attention weights",
            "To prevent vanishing gradients",
            "To stabilize the dot products",
            "To reduce computational complexity"
          ],
          correctAnswer: 2
        }
      ]
    });
  }, [assessmentId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (assessment.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3">Loading assessment...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{assessment.title}</h1>
              <div className="flex items-center text-gray-600">
                <Timer className="w-5 h-5 mr-2" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 text-blue-700 p-4 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
              <p className="text-sm">
                This assessment tests your understanding of transformer architectures and attention mechanisms.
                Take your time to read each question carefully.
              </p>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-8">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </span>
              <h2 className="text-xl font-semibold mt-2 mb-4">
                {assessment.questions[currentQuestion].text}
              </h2>
              {assessment.questions[currentQuestion].code && (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                  <code>{assessment.questions[currentQuestion].code}</code>
                </pre>
              )}
              <div className="space-y-4">
                {assessment.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedAnswer === index
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-600'
                    }`}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="flex items-center text-gray-600 hover:text-gray-900"
                disabled={currentQuestion === 0}
                onClick={() => {
                  setCurrentQuestion(prev => prev - 1);
                  setSelectedAnswer(null);
                }}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>
              <button
                className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => {
                  if (currentQuestion < assessment.questions.length - 1) {
                    setCurrentQuestion(prev => prev + 1);
                    setSelectedAnswer(null);
                  }
                }}
              >
                {currentQuestion === assessment.questions.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;