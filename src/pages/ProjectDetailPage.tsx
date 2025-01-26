import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Clock, Users, GitBranch, Book, ArrowRight, Code2, Terminal, ExternalLink } from 'lucide-react';
import ProjectIDE from '../components/ProjectIDE';

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  technologies: string[];
  stars: number;
  contributors: number;
  image: string;
}

const projects: Record<string, Project> = {
  'sentiment-analysis': {
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
  'object-detection': {
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
  'chatbot': {
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
};

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [showIDE, setShowIDE] = useState(false);
  const [ideChoice, setIdeChoice] = useState<'built-in' | 'external' | null>(null);

  const project = projectId ? projects[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleStartCoding = (choice: 'built-in' | 'external') => {
    setIdeChoice(choice);
    if (choice === 'built-in') {
      setShowIDE(true);
    } else {
      // Open GitHub repository or download starter files
      window.open('https://github.com/yourusername/project-starter', '_blank');
    }
  };

  if (showIDE) {
    return <ProjectIDE projectId={project.id} language="python" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl mb-8">{project.description}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{project.contributors} contributors</span>
              </div>
              <div className="flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                <span>{project.stars} stars</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Brain className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
                    <span>Understand core concepts and implementation details</span>
                  </li>
                  <li className="flex items-start">
                    <Code2 className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
                    <span>Gain hands-on experience with industry-standard tools</span>
                  </li>
                  <li className="flex items-start">
                    <Book className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
                    <span>Learn best practices and optimization techniques</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {!ideChoice ? (
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Choose Your Development Environment</h3>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleStartCoding('built-in')}
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    >
                      <Terminal className="w-5 h-5 mr-2" />
                      Use Built-in IDE
                    </motion.button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleStartCoding('external')}
                      className="w-full border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Use Your Own IDE
                    </motion.button>

                    <p className="text-sm text-gray-500 text-center mt-4">
                      Choose built-in IDE for instant coding or download the starter files to work locally
                    </p>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIdeChoice(null)}
                    className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center mb-6"
                  >
                    Change IDE Preference
                  </motion.button>
                )}

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;