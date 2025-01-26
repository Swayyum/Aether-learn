import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, GitBranch, Star, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis with BERT',
    description: 'Build a sentiment analysis model using BERT for social media data',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    technologies: ['PyTorch', 'Transformers', 'Python'],
    stars: 245,
    contributors: 12,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'object-detection',
    title: 'Real-time Object Detection',
    description: 'Implement YOLOv8 for real-time object detection using webcam',
    difficulty: 'Advanced',
    duration: '3-4 weeks',
    technologies: ['OpenCV', 'PyTorch', 'YOLO'],
    stars: 189,
    contributors: 8,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot Assistant',
    description: 'Create a chatbot using GPT-3.5 for customer support',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    technologies: ['OpenAI API', 'Python', 'FastAPI'],
    stars: 312,
    contributors: 15,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=500'
  }
];

const ProjectsPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredProjects = selectedDifficulty
    ? projects.filter(project => project.difficulty === selectedDifficulty)
    : projects;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Hands-on ML Projects</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apply your knowledge with real-world machine learning projects. Build your portfolio and gain practical experience.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                !selectedDifficulty ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Projects
            </button>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedDifficulty === level ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                    {project.difficulty}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {project.stars}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {project.contributors} contributors
                    </div>
                    <div>{project.duration}</div>
                  </div>
                  
                  <Link
                    to={`/projects/${project.id}`}
                    className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;