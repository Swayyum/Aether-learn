import React, { useState } from 'react';
import { Book, Clock, Star, Users, PlayCircle, LineChart, GitBranch, Code, Lock, CheckCircle, BookOpen } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: number;
  completed: boolean;
  description: string;
  type: 'video' | 'interactive' | 'quiz';
  preview?: string;
  content?: string;
  references?: string[];
}

const CoursePage = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  const modules: Module[] = [
    {
      id: "linear-regression",
      title: "Introduction to Linear Regression",
      duration: "45 mins",
      lessons: 3,
      completed: false,
      description: "Understanding the fundamentals of linear regression and its applications",
      type: "video",
      preview: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=500",
      content: `
        Linear regression is one of the foundational algorithms in machine learning. Let's break it down:

        1. The Basic Concept
        - Predicts a continuous output variable (y) based on input features (x)
        - Assumes a linear relationship: y = mx + b
        - 'm' is the slope (coefficient), 'b' is the y-intercept

        2. Key Components
        - Features (independent variables)
        - Target variable (dependent variable)
        - Coefficients (weights)
        - Cost function (usually Mean Squared Error)

        3. The Learning Process
        - Initialize parameters
        - Make predictions
        - Calculate error
        - Update parameters
        - Repeat until convergence
      `,
      references: [
        "Pattern Recognition and Machine Learning - Bishop, 2006",
        "The Elements of Statistical Learning - Hastie et al., 2009",
        "Introduction to Statistical Learning - James et al., 2013"
      ]
    },
    {
      id: "gradient-descent",
      title: "Gradient Descent Implementation",
      duration: "1 hour",
      lessons: 4,
      completed: false,
      description: "Interactive coding session: Implementing gradient descent from scratch",
      type: "interactive",
      preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=500",
      content: `
        Gradient Descent is the cornerstone of modern machine learning optimization:

        1. The Algorithm
        - Iteratively minimize the cost function
        - Takes steps proportional to the negative gradient
        - Learning rate controls step size

        2. Types of Gradient Descent
        - Batch Gradient Descent (full dataset)
        - Stochastic Gradient Descent (single sample)
        - Mini-batch Gradient Descent (batch of samples)

        3. Implementation Steps
        - Calculate predictions: ŷ = Xw + b
        - Compute loss: MSE = (1/n)Σ(y - ŷ)²
        - Calculate gradients: ∂J/∂w, ∂J/∂b
        - Update parameters: w = w - α(∂J/∂w)

        4. Common Challenges
        - Choosing learning rate
        - Avoiding local minima
        - Handling feature scaling
      `,
      references: [
        "Deep Learning - Goodfellow et al., 2016",
        "Optimization Methods for Large-Scale Machine Learning - Bottou et al., 2018"
      ]
    },
    {
      id: "model-evaluation",
      title: "Model Evaluation & Metrics",
      duration: "1.5 hours",
      lessons: 6,
      completed: false,
      description: "Learn about R-squared, MSE, and other evaluation metrics",
      type: "quiz",
      preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500",
      content: `
        Understanding how to evaluate your models is crucial:

        1. Regression Metrics
        - Mean Squared Error (MSE)
        - Root Mean Squared Error (RMSE)
        - Mean Absolute Error (MAE)
        - R-squared (coefficient of determination)

        2. Classification Metrics
        - Accuracy
        - Precision and Recall
        - F1 Score
        - ROC and AUC

        3. Cross-Validation
        - K-fold cross-validation
        - Stratified K-fold
        - Leave-one-out cross-validation

        4. Bias-Variance Tradeoff
        - Understanding underfitting
        - Detecting overfitting
        - Model complexity vs. performance
      `,
      references: [
        "Applied Predictive Modeling - Kuhn & Johnson, 2013",
        "Evaluating Machine Learning Models - Zheng, 2015"
      ]
    }
  ];

  const handleStartLearning = () => {
    setSelectedModule(modules[0].id);
    setShowContent(true);
  };

  const renderModuleContent = (module: Module) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-6">{module.title}</h2>
          <div className="whitespace-pre-line text-gray-700">
            {module.content}
          </div>
          {module.references && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">References</h3>
              <ul className="list-disc pl-5 space-y-2">
                {module.references.map((ref, index) => (
                  <li key={index} className="text-gray-600">{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Machine Learning Foundations</h1>
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>12 hours</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              <span>4.9 (2.1k reviews)</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>15,234 enrolled</span>
            </div>
          </div>
          <p className="text-lg max-w-2xl">
            Master the fundamentals of Machine Learning, from basic linear regression to advanced classification techniques.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-6">
                {modules.map((module) => (
                  <div 
                    key={module.id} 
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedModule === module.id ? 'ring-2 ring-indigo-500' : ''
                    }`}
                    onClick={() => {
                      if (showContent) {
                        setSelectedModule(module.id);
                      }
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {module.type === 'video' && <PlayCircle className="w-5 h-5 text-blue-500" />}
                          {module.type === 'interactive' && <Code className="w-5 h-5 text-green-500" />}
                          {module.type === 'quiz' && <GitBranch className="w-5 h-5 text-purple-500" />}
                          <h3 className="font-semibold">{module.title}</h3>
                        </div>
                        <div className="text-sm text-gray-500">
                          {module.duration} • {module.lessons} lessons
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      
                      {module.preview && (
                        <div className="relative h-48 mb-4">
                          <img
                            src={module.preview}
                            alt={module.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {!showContent && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                              <Lock className="w-8 h-8 text-white" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {module.completed && (
                        <div className="mt-2">
                          <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedModule && showContent && 
              renderModuleContent(modules.find(m => m.id === selectedModule)!)
            }
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-xl font-bold mb-2">Free Course</div>
                <button 
                  onClick={handleStartLearning}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-4"
                >
                  {showContent ? 'Continue Learning' : 'Start Learning Now'}
                </button>
                <p className="text-sm text-gray-500">No credit card required</p>
              </div>
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <PlayCircle className="w-5 h-5 text-gray-400 mr-3" />
                    12 hours of video content
                  </li>
                  <li className="flex items-center text-sm">
                    <Code className="w-5 h-5 text-gray-400 mr-3" />
                    15 coding exercises
                  </li>
                  <li className="flex items-center text-sm">
                    <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                    5 downloadable resources
                  </li>
                  <li className="flex items-center text-sm">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    Access to community forum
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;