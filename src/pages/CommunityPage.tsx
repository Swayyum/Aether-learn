import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import {
  DiscussionCard,
  ProjectCard,
  EventCard,
  CommunityStats,
  FeaturedMembers
} from '../components/community';

const discussions = [
  {
    id: 1,
    title: "Best practices for fine-tuning LLMs",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    replies: 24,
    likes: 156,
    tags: ['LLM', 'Fine-tuning', 'Best Practices'],
    preview: "I've been experimenting with different approaches to fine-tuning LLMs and wanted to share some insights...",
    createdAt: new Date('2024-03-10')
  },
  {
    id: 2,
    title: "Vision Transformer implementation challenges",
    author: "Michael Park",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    replies: 18,
    likes: 92,
    tags: ['Vision', 'Transformers', 'PyTorch'],
    preview: "While implementing ViT from scratch, I encountered some interesting challenges with attention mechanisms...",
    createdAt: new Date('2024-03-12')
  },
  {
    id: 3,
    title: "Optimizing CUDA memory usage",
    author: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    replies: 31,
    likes: 127,
    tags: ['CUDA', 'Performance', 'Memory'],
    preview: "Here are some techniques I've found effective for managing GPU memory in large model training...",
    createdAt: new Date('2024-03-14')
  }
];

const projects = [
  {
    id: 1,
    title: "Real-time Sign Language Translation",
    author: "Team AccessML",
    stars: 234,
    forks: 45,
    description: "Using computer vision and transformers for real-time sign language translation",
    tags: ['Computer Vision', 'Accessibility', 'PyTorch'],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    title: "Federated Learning Framework",
    author: "Privacy First ML",
    stars: 189,
    forks: 32,
    description: "A framework for training ML models while preserving data privacy",
    tags: ['Privacy', 'Distributed ML', 'Framework'],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=300"
  }
];

const events = [
  {
    id: 1,
    title: "ML Model Deployment Workshop",
    date: new Date('2024-03-25'),
    time: "10:00 AM PST",
    type: "Workshop",
    attendees: 156,
    description: "Learn best practices for deploying ML models in production",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    title: "AI Ethics Roundtable",
    date: new Date('2024-03-28'),
    time: "2:00 PM PST",
    type: "Discussion",
    attendees: 89,
    description: "Join us for a discussion on ethical considerations in AI development",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=300"
  }
];

const members = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "ML Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    profileUrl: "https://github.com/sarahchen"
  },
  {
    id: 2,
    name: "Michael Park",
    role: "Research Scientist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    profileUrl: "https://github.com/michaelpark"
  }
];

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'projects' | 'events'>('discussions');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-6"
            >
              Join Our ML Community
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8"
            >
              Connect with fellow ML enthusiasts, share knowledge, and collaborate on projects
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Start Discussion
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Browse Projects
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
              {(['discussions', 'projects', 'events'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New {activeTab.slice(0, -1)}
                </motion.button>
              </div>

              {activeTab === 'discussions' && (
                <div className="space-y-6">
                  {discussions.map((discussion) => (
                    <DiscussionCard
                      key={discussion.id}
                      {...discussion}
                      onClick={() => console.log('Opening discussion:', discussion.id)}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                      onClick={() => console.log('Opening project:', project.id)}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'events' && (
                <div className="space-y-6">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      {...event}
                      onClick={() => console.log('Opening event:', event.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <CommunityStats
                discussions={1234}
                projects={567}
                contributors={890}
              />
              <FeaturedMembers members={members} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;