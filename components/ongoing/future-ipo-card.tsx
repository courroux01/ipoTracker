'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import type { InterestedIPO } from '@/hooks/use-interested-ipos';
import { NotificationToggle } from '@/components/ongoing/notification-toggle';

interface FutureIpoCardProps {
  ipo: InterestedIPO;
  index: number;
}

export function FutureIpoCard({ ipo, index }: FutureIpoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format the date properly
  const formattedDate = format(new Date(ipo.expectedDate), 'MMM d, yyyy');

  // Calculate days until IPO
  const daysUntilIpo = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ipoDate = new Date(ipo.expectedDate);
    ipoDate.setHours(0, 0, 0, 0);

    const diffTime = ipoDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const daysLeft = daysUntilIpo();

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-[#1a1a1a]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <div
        className="cursor-pointer p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#c9ff3c] font-bold text-black">
              {ipo.logo}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {ipo.name}
              </h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{ipo.ticker}</span>
                <span className="mx-1">•</span>
                <span>{ipo.sector}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-3 text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {daysLeft === 0
                  ? 'Today'
                  : `${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Until IPO
              </p>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <DollarSign className="mr-1 h-3 w-3" />
            <span>{ipo.expectedPrice}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="border-t border-gray-100 px-4 pt-3 pb-4 dark:border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {ipo.description}
          </p>

          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
            <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Notification Settings
            </h4>
            <div className="flex flex-col space-y-3">
              <NotificationToggle ipo={ipo} className="self-start" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {ipo.notifyOnDate
                  ? 'You will receive an email notification on the IPO date.'
                  : 'Enable notifications to receive an email on the IPO date.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
