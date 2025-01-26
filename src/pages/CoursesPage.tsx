import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, GitBranch, Network, Brain, Code2, BarChart2, BookOpen, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 'foundations',
    title: 'ML Foundations',
    description: 'Start your ML journey with core concepts and fundamental algorithms',
    modules: 8,
    duration: '12 hours',
    students: 1234,
    level: 'Beginner',
    icon: LineChart,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=500',
    topics: ['Linear Regression', 'Classification', 'Model Evaluation']
  },
  {
    id: 'supervised',
    title: 'Supervised Learning',
    description: 'Master classification and regression techniques with hands-on projects',
    modules: 10,
    duration: '15 hours',
    students: 892,
    level: 'Intermediate',
    icon: GitBranch,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500',
    topics: ['Decision Trees', 'SVM', 'Ensemble Methods']
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Dive into neural networks and modern deep learning architectures',
    modules: 12,
    duration: '20 hours',
    students: 567,
    level: 'Advanced',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=500',
    topics: ['Neural Networks', 'CNNs', 'Transformers']
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Learn to process and analyze text data with modern NLP techniques',
    modules: 9,
    duration: '16 hours',
    students: 743,
    level: 'Advanced',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&q=80&w=500',
    topics: ['Text Processing', 'Word Embeddings', 'LLMs']
  }
];

const CoursesPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredCourses = selectedLevel
    ? courses.filter(course => course.level === selectedLevel)
    : courses;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Machine Learning Courses</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From foundational concepts to advanced techniques, master machine learning with our comprehensive curriculum
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setSelectedLevel(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                !selectedLevel ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Levels
            </button>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedLevel === level ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredCourses.map(course => {
              const Icon = course.icon;
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-indigo-50 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.topics.map(topic => (
                        <span
                          key={topic}
                          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {course.modules} modules
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>
                    </div>
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

export default CoursesPage;