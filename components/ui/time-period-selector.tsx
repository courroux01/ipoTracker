'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function TimePeriodSelector() {
  const [activePeriod, setActivePeriod] = useState('1M');
  const periods = ['1D', '5D', '1W', '1M', '3M', '6M'];

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex space-x-2">
        {periods.map((period, index) => (
          <motion.button
            key={period}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              period === activePeriod
                ? 'bg-[#1a1a1a] text-white dark:bg-[#c9ff3c] dark:text-black'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            onClick={() => setActivePeriod(period)}
          >
            {period}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
