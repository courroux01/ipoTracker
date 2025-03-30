'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  BarChart2,
  LineChart,
  TrendingUp,
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { useState } from 'react';

interface MarketEvent {
  date: Date;
  title: string;
  type: 'ipo' | 'earnings' | 'economic' | 'dividend';
  description: string;
}

interface MarketEventsCalendarProps {
  selectedDate: Date;
}

export function MarketEventsCalendar({
  selectedDate,
}: MarketEventsCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(selectedDate, { weekStartsOn: 1 }),
  );

  // Generate sample market events
  const generateEvents = (startDate: Date): MarketEvent[] => {
    const events: MarketEvent[] = [];

    // IPO events
    events.push({
      date: addDays(startDate, 2),
      title: 'MediPharm Labs IPO',
      type: 'ipo',
      description: 'Initial public offering for MediPharm Labs',
    });

    events.push({
      date: addDays(startDate, 4),
      title: 'TechVision AI IPO',
      type: 'ipo',
      description: 'Initial public offering for TechVision AI',
    });

    // Earnings events
    events.push({
      date: addDays(startDate, 1),
      title: 'AAPL Earnings',
      type: 'earnings',
      description: 'Q2 Earnings report for Apple Inc.',
    });

    events.push({
      date: addDays(startDate, 3),
      title: 'MSFT Earnings',
      type: 'earnings',
      description: 'Q2 Earnings report for Microsoft Corp.',
    });

    // Economic events
    events.push({
      date: addDays(startDate, 2),
      title: 'Fed Rate Decision',
      type: 'economic',
      description: 'Federal Reserve interest rate announcement',
    });

    // Dividend events
    events.push({
      date: addDays(startDate, 0),
      title: 'JNJ Dividend',
      type: 'dividend',
      description: 'Ex-dividend date for Johnson & Johnson',
    });

    return events;
  };

  const marketEvents = generateEvents(currentWeek);

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return marketEvents.filter(
      (event) =>
        format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
    );
  };

  // Get icon for event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ipo':
        return <TrendingUp className="h-4 w-4 text-[#c9ff3c]" />;
      case 'earnings':
        return <BarChart2 className="h-4 w-4 text-blue-500" />;
      case 'economic':
        return <LineChart className="h-4 w-4 text-purple-500" />;
      case 'dividend':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      className="rounded-xl bg-white p-4 shadow-sm dark:bg-[#1a1a1a]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {format(currentWeek, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center gap-2">
          <motion.button
            className="rounded-full bg-gray-100 p-1 dark:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </motion.button>
          <motion.button
            className="rounded-full bg-gray-100 p-1 dark:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const events = getEventsForDay(date);
          const isToday =
            format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          const isSelected =
            format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

          return (
            <motion.div
              key={index}
              className={`min-h-[100px] rounded-lg p-2 ${
                isToday
                  ? 'border border-[#c9ff3c] bg-[#c9ff3c]/10'
                  : isSelected
                    ? 'border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800'
                    : 'bg-gray-50 dark:bg-gray-900/50'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="mb-1 text-right">
                <span
                  className={`text-xs font-medium ${isToday ? 'text-[#c9ff3c]' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {format(date, 'd')}
                </span>
              </div>

              <div className="space-y-1">
                {events.map((event, eventIndex) => (
                  <motion.div
                    key={eventIndex}
                    className="rounded bg-white p-1 text-xs shadow-sm dark:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + eventIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-1">
                      {getEventIcon(event.type)}
                      <span className="truncate font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
