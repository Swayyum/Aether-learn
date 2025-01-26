import React from 'react';
import { BarChart3, BookOpen, Award, Clock, ArrowRight, Brain, Github, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Calendar from '../components/calendar/Calendar';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const courses = [
    {
      title: "Large Language Models",
      progress: 65,
      nextLesson: "Attention Mechanisms",
      timeLeft: "2h 30m"
    },
    {
      title: "Computer Vision",
      progress: 40,
      nextLesson: "Vision Transformers",
      timeLeft: "4h 15m"
    }
  ];

  const achievements = [
    {
      title: "LLM Pioneer",
      description: "Completed first transformer implementation",
      date: "Mar 15, 2024"
    },
    {
      title: "Quick Learner",
      description: "Finished 5 lessons in one day",
      date: "Mar 14, 2024"
    }
  ];

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Courses</span>
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>4</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>2 in progress</div>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Achievements</span>
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>3 this week</div>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Hours Learned</span>
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>28</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+5 from last week</div>
              </div>
            </div>

            {/* Current Courses */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Current Courses</h2>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div key={index} className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{course.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Next: {course.nextLesson}
                        </p>
                      </div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{course.timeLeft} left</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            {course.progress}% Complete
                          </span>
                        </div>
                      </div>
                      <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <Calendar />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} mx-auto mb-4`}></div>
                <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Guest User'}</h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>ML Engineer</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <a 
                  href="https://github.com/Swayyum" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Brain className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{achievement.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{achievement.description}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h2>
              <div className="space-y-3">
                <a href="/courses" className="block text-indigo-600 hover:text-indigo-700">
                  Browse Courses
                </a>
                <a href="/projects" className="block text-indigo-600 hover:text-indigo-700">
                  Active Projects
                </a>
                <a href="/community" className="block text-indigo-600 hover:text-indigo-700">
                  Community Forum
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;