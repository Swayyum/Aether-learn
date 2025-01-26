import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Code2, Network, Bot, ArrowRight, Filter } from 'lucide-react';

const assessments = [
  {
    id: 'llm-fundamentals',
    title: 'LLM Fundamentals',
    description: 'Test your knowledge of transformer architectures and attention mechanisms',
    difficulty: 'Intermediate',
    duration: '45 mins',
    questions: 25,
    category: 'Modern ML',
    icon: Brain
  },
  {
    id: 'vision-transformers',
    title: 'Vision Transformers',
    description: 'Assess your understanding of ViT architecture and implementation',
    difficulty: 'Advanced',
    duration: '60 mins',
    questions: 30,
    category: 'Computer Vision',
    icon: Network
  },
  {
    id: 'ml-deployment',
    title: 'ML Deployment',
    description: 'Evaluate your MLOps skills and deployment strategies',
    difficulty: 'Advanced',
    duration: '90 mins',
    questions: 40,
    category: 'MLOps',
    icon: Code2
  }
];

const AssessmentListPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ML Skill Assessments</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Test your knowledge across different ML domains with our comprehensive assessments
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                  All
                </button>
                <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                  Modern ML
                </button>
                <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                  Computer Vision
                </button>
                <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                  MLOps
                </button>
              </div>
            </div>
          </div>

          {/* Assessment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => {
              const Icon = assessment.icon;
              return (
                <Link
                  key={assessment.id}
                  to={`/assessments/${assessment.id}`}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-indigo-600">
                      {assessment.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{assessment.difficulty}</span>
                    <span>{assessment.duration}</span>
                    <span>{assessment.questions} Questions</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors inline-flex items-center">
                      Start Assessment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentListPage;