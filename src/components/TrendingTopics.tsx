import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Topic {
  title: string;
  description: string;
  progress: number;
}

interface TrendingTopicsProps {
  topics: Topic[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Trending Topics</h2>
        <div className="flex items-center text-indigo-600">
          <TrendingUp className="w-5 h-5 mr-2" />
          <span className="font-medium">Popular Now</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div key={topic.title} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-gray-600 mb-4">{topic.description}</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-50">
                    Popularity
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {topic.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-50">
                <div
                  style={{ width: `${topic.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingTopics;