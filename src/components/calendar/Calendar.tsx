import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import { Event } from '../../types/calendar';

const Calendar = () => {
  const { isDark } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'ML Workshop',
      description: 'Introduction to Neural Networks',
      start: new Date(2024, 2, 15, 14, 0),
      end: new Date(2024, 2, 15, 16, 0),
      type: 'workshop'
    },
    {
      id: '2',
      title: 'Matcha Study Group',
      description: 'Group study session on Matcha',
      start: new Date(2024, 2, 20, 15, 0),
      end: new Date(2024, 2, 20, 17, 0),
      type: 'study'
    }
  ]);

  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
  };

  const handleExportToGoogle = async (event: Event) => {
    const startTime = event.start.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = event.end.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${startTime}/${endTime}`;
    window.open(url, '_blank');
  };

  const handleExportToMatcha = () => {
    window.open('https://matchaweb.org/dashboard', '_blank');
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CalendarIcon className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Calendar</h2>
        </div>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/r', '_blank')}
            className={`flex items-center px-4 py-2 ${
              isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
            } border border-gray-300 rounded-lg hover:bg-opacity-90`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
              alt="Google Calendar"
              className="w-5 h-5 mr-2"
            />
            Add to Google Calendar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportToMatcha}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <img
              src="/matcha-icon.svg"
              alt="Matcha"
              className="w-5 h-5 mr-2 invert"
            />
            Add to Matcha
          </motion.button>
        </div>
      </div>

      <motion.div
        className={`${isDark ? 'bg-gray-700' : 'bg-yellow-50'} border ${isDark ? 'border-gray-600' : 'border-yellow-200'} rounded-lg p-4 mb-6 cursor-pointer`}
        onClick={() => setShowInstructions(!showInstructions)}
      >
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${isDark ? 'text-gray-100' : 'text-yellow-800'}`}>
            How to add to Matcha:
          </h3>
          {showInstructions ? (
            <ChevronUp className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-yellow-700'}`} />
          ) : (
            <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-yellow-700'}`} />
          )}
        </div>
        <AnimatePresence>
          {showInstructions && (
            <motion.ol
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`list-decimal list-inside text-sm ${isDark ? 'text-gray-300' : 'text-yellow-700'} space-y-1 mt-2`}
            >
              <li>Go to your Matcha Dashboard</li>
              <li>Click on "Calendar" in the navigation</li>
              <li>Click "Add External Calendar"</li>
              <li>Select "Aether" from the list of providers</li>
              <li>Click "Connect" and authorize the integration</li>
            </motion.ol>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="space-y-6">
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />

        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
        />
      </div>

      <div className={`mt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Events</h3>
        <div className="space-y-4">
          {events
            .filter(event => event.start >= new Date())
            .sort((a, b) => a.start.getTime() - b.start.getTime())
            .map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.title}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{event.description}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {event.start.toLocaleString()} - {event.end.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExportToGoogle(event)}
                      className={`${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
                      title="Add to Google Calendar"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onAdd={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;