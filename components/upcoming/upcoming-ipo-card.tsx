'use client';

import { motion } from 'framer-motion';
import { Calendar, DollarSign, TrendingUp, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import type { IPO } from '@/hooks/use-ipos';
import { InterestCheckbox } from '@/components/upcoming/interest-checkbox';

interface UpcomingIpoCardProps {
  ipo: IPO;
  index: number;
  onClick: () => void;
  searchTerm: string;
}

export function UpcomingIpoCard({
  ipo,
  index,
  onClick,
  searchTerm,
}: UpcomingIpoCardProps) {
  // Format the date properly
  const formattedDate = format(new Date(ipo.expectedDate), 'MMM d, yyyy');

  // Get background color based on sector
  const getSectorColor = (sector: string) => {
    const colors: Record<string, string> = {
      Technology: 'bg-blue-900/30 text-blue-400',
      Medicine: 'bg-green-900/30 text-green-400',
      Finance: 'bg-purple-900/30 text-purple-400',
      Energy: 'bg-amber-900/30 text-amber-400',
      Consumer: 'bg-pink-900/30 text-pink-400',
      Industrial: 'bg-gray-800 text-gray-400',
      Agriculture: 'bg-lime-900/30 text-lime-400',
    };

    return colors[sector] || 'bg-gray-800 text-gray-400';
  };

  // Add this function after the getSectorColor function
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="rounded bg-[#c9ff3c]/30 px-0.5">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <motion.div
      className="rounded-xl border-2 border-white bg-[#1a1a1a] p-4 shadow-sm transition-shadow hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#c9ff3c] font-bold text-black">
            {ipo.logo}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">
              {highlightSearchTerm(ipo.name, searchTerm)}
            </h3>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-gray-400">{ipo.ticker}</span>
              <span className="mx-1 text-gray-600">•</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${getSectorColor(ipo.sector)}`}
              >
                {ipo.sector}
              </span>
            </div>
          </div>
        </div>
        <motion.button
          className="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-800"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ExternalLink className="h-4 w-4 text-gray-300" />
        </motion.button>
      </div>

      <p className="mb-3 line-clamp-2 text-sm text-gray-400">
        {ipo.description}
      </p>

      <div className="flex flex-col justify-between gap-2 text-sm sm:flex-row">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-300 sm:text-sm">
            {formattedDate}
          </span>
        </div>
        <div className="flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-300 sm:text-sm">
            {ipo.expectedPrice}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
        <InterestCheckbox ipo={ipo} />
        <motion.button
          className="flex items-center text-xs font-medium text-[#c9ff3c]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          <span>View Details</span>
          <TrendingUp className="ml-1 h-3 w-3" />
        </motion.button>
      </div>
    </motion.div>
  );
}
