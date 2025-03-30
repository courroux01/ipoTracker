'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatPercentage } from '@/lib/utils';

interface MarketTrendIndicatorProps {
  title: string;
  trend: string;
  change: number;
}

export function MarketTrendIndicator({
  title,
  trend,
  change,
}: MarketTrendIndicatorProps) {
  const isPositive = change >= 0;

  return (
    <div>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex items-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          {trend}
        </p>
        <div
          className={`ml-2 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}
        >
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3" />
          )}
          <span className="text-xs">{formatPercentage(change)}</span>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-400">last 7 day</p>
    </div>
  );
}
