'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface StockHolding {
  name: string;
  ticker: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  change: number;
  value: number;
  allocation: number;
  chartData: number[];
}

interface StockHoldingCardProps {
  stock: StockHolding;
  index: number;
}

export function StockHoldingCard({ stock, index }: StockHoldingCardProps) {
  const isPositive = stock.change >= 0;

  // Normalize chart data
  const minValue = Math.min(...stock.chartData);
  const maxValue = Math.max(...stock.chartData);
  const range = maxValue - minValue;

  // Create path for the mini chart
  const points = stock.chartData.map((value, i) => {
    const x = (i / (stock.chartData.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return `${x},${y}`;
  });

  const linePath = `M${points.join(' L')}`;

  return (
    <motion.div
      className="rounded-xl bg-white p-4 shadow-sm dark:bg-[#1a1a1a]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-4 md:col-span-3">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {stock.ticker.substring(0, 1)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {stock.ticker}
              </h3>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {stock.name}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Shares</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {stock.shares}
          </p>
        </div>

        <div className="col-span-3 md:col-span-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Price</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(stock.averagePrice)}
          </p>
        </div>

        <div className="col-span-3 md:col-span-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(stock.currentPrice)}
          </p>
        </div>

        <div className="col-span-4 md:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Change</p>
          <div
            className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            <span className="font-medium">
              {formatPercentage(stock.change)}
            </span>
          </div>
        </div>

        <div className="col-span-4 md:col-span-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Value</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(stock.value)}
          </p>
        </div>

        <div className="col-span-4 flex justify-end md:col-span-1">
          <motion.button
            className="rounded-full bg-gray-100 p-1 dark:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>
      </div>

      {/* Mini chart */}
      <div className="mt-3 h-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <motion.path
            d={linePath}
            fill="none"
            stroke={isPositive ? '#4CAF50' : '#F44336'}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
