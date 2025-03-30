'use client';

import { motion } from 'framer-motion';
import { Search, Filter, Calendar } from 'lucide-react';

interface TransactionFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function TransactionFilters({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
}: TransactionFiltersProps) {
  const filters = [
    { id: 'all', label: 'All Transactions' },
    { id: 'buy', label: 'Buy Orders' },
    { id: 'sell', label: 'Sell Orders' },
  ];

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <motion.button
            key={filter.id}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              activeFilter === filter.id
                ? 'bg-[#c9ff3c] text-black'
                : 'bg-white text-gray-700 dark:bg-[#1a1a1a] dark:text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      <div className="flex w-full items-center gap-3 md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-xl bg-white py-2 pr-4 pl-10 text-gray-900 shadow-sm focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none dark:bg-[#1a1a1a] dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="flex items-center gap-1 rounded-xl bg-white p-2 text-gray-700 shadow-sm dark:bg-[#1a1a1a] dark:text-gray-300">
            <Calendar className="h-4 w-4" />
            <span className="hidden text-sm md:inline">Date Range</span>
          </button>
        </motion.div>

        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="rounded-xl bg-white p-2 shadow-sm dark:bg-[#1a1a1a]">
            <Filter className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
