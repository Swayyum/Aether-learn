import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../types/calendar';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  events: Event[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  setSelectedDate,
  events
}) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50">
        {weekDays.map(day => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-white h-24 p-2"
            />
          ))}
        
        {days.map(day => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const dayEvents = getEventsForDate(date);
          const isSelected = selectedDate?.getTime() === date.getTime();
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedDate(date)}
              className={`bg-white h-24 p-2 cursor-pointer transition-colors ${
                isSelected ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    isToday
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {day}
                </span>
              </div>
              
              <div className="mt-1 space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className="text-xs px-1 py-0.5 rounded truncate"
                    style={{
                      backgroundColor: event.type === 'workshop' ? '#EEF2FF' : '#F0FDF4',
                      color: event.type === 'workshop' ? '#4F46E5' : '#16A34A'
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;