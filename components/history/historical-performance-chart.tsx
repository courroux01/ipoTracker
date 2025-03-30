'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface ChartData {
  month: string;
  value: number;
}

interface HistoricalPerformanceChartProps {
  totalProfit: number;
  percentageGain: number;
  chartData: ChartData[];
}

export function HistoricalPerformanceChart({
  totalProfit,
  percentageGain,
  chartData,
}: HistoricalPerformanceChartProps) {
  // Create line chart path
  const points = chartData.map((item, index) => {
    const x = (index / (chartData.length - 1)) * 100;
    const minValue = Math.min(...chartData.map((d) => d.value));
    const maxValue = Math.max(...chartData.map((d) => d.value));
    const range = maxValue - minValue;
    const y = 100 - ((item.value - minValue) / range) * 80;
    return `${x},${y}`;
  });

  const linePath = `M${points.join(' L')}`;

  return (
    <motion.div
      className="h-full rounded-xl bg-white p-6 shadow-sm dark:bg-[#1a1a1a]"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <TrendingUp className="mr-2 h-5 w-5 text-[#c9ff3c]" />
            Historical Performance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last 6 months
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalProfit)}
          </p>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            <span className="text-sm font-medium">
              {formatPercentage(percentageGain)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-48">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={i}
              x1="0"
              y1={25 * i + 10}
              x2="100"
              y2={25 * i + 10}
              stroke="#333"
              strokeWidth="0.2"
              strokeDasharray="1,1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* Line chart */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Area under the line */}
          <motion.path
            d={`${linePath} L100,100 L0,100 Z`}
            fill="url(#gradient)"
            opacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1.5, duration: 1 }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {points.map((point, index) => {
            const [x, y] = point.split(',').map(Number);
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill="#4CAF50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Month labels */}
        <div className="mt-2 flex justify-between">
          {chartData.map((item, index) => (
            <motion.div
              key={index}
              className="text-xs text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {item.month}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
