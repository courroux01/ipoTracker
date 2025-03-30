'use client';

import { motion } from 'framer-motion';
import { Calendar, DollarSign, Bell, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import type { TransactionHistoryItem } from '@/hooks/use-history';

interface TransactionHistoryItemProps {
  item: TransactionHistoryItem;
  index: number;
}

export function TransactionHistoryItem({
  item,
  index,
}: TransactionHistoryItemProps) {
  // Get icon based on type
  const getIcon = () => {
    switch (item.type) {
      case 'interest':
        return <TrendingUp className="h-4 w-4 text-[#c9ff3c]" />;
      case 'investment':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'notification':
        return <Bell className="h-4 w-4 text-blue-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get badge style based on type
  const getBadgeStyle = () => {
    switch (item.type) {
      case 'interest':
        return 'bg-[#c9ff3c]/20 text-[#c9ff3c]';
      case 'investment':
        return 'bg-green-500/20 text-green-500';
      case 'notification':
        return 'bg-blue-500/20 text-blue-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <motion.div
      className="rounded-xl border-2 border-white bg-[#1a1a1a] p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-8 w-8 rounded-full ${getBadgeStyle()} flex flex-shrink-0 items-center justify-center`}
        >
          {getIcon()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-medium text-white">{item.action}</h3>
            <span className="text-xs text-gray-400">
              {format(new Date(item.date), 'MMM d, yyyy · h:mm a')}
            </span>
          </div>

          <div className="mt-1 flex items-center">
            <span className="text-sm font-medium text-gray-300">
              {item.ticker}
            </span>
            <span className="mx-1 text-gray-400">•</span>
            <span className="truncate text-sm text-gray-400">{item.name}</span>
          </div>

          <p className="mt-1 text-sm text-gray-400">{item.details}</p>

          <div className="mt-2 flex items-center text-xs text-gray-400">
            <Calendar className="mr-1 h-3 w-3" />
            <span>
              IPO Date: {format(new Date(item.ipoDate), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
