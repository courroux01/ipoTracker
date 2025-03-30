'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface MonthlyData {
  month: string;
  value: number;
}

interface MonthlyBalanceCardProps {
  totalValue: number;
  monthlyChange: number;
  monthlyData: MonthlyData[];
}

export function MonthlyBalanceCard({
  totalValue,
  monthlyChange,
  monthlyData,
}: MonthlyBalanceCardProps) {
  // Calculate min and max for chart scaling
  const values = monthlyData.map((item) => item.value);
  const minValue = Math.min(...values) * 0.95;
  const maxValue = Math.max(...values) * 1.05;
  const range = maxValue - minValue;

  return (
    <motion.div
      className="h-full rounded-xl bg-white p-6 shadow-sm dark:bg-[#1a1a1a]"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            This Month's Balance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">June 2024</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalValue)}
          </p>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            <span className="text-sm font-medium">
              {formatPercentage(monthlyChange)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-48">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 200"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={i}
              x1="0"
              y1={50 * i + 25}
              x2="600"
              y2={50 * i + 25}
              stroke="#333"
              strokeWidth="0.5"
              strokeDasharray="5,5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* Chart bars */}
          {monthlyData.map((item, index) => {
            const barHeight = ((item.value - minValue) / range) * 150;
            const x = (index / (monthlyData.length - 1)) * 600;

            return (
              <g key={index}>
                <motion.rect
                  x={x - 20}
                  y={200 - barHeight}
                  width={40}
                  height={barHeight}
                  rx={4}
                  fill={
                    index === monthlyData.length - 1 ? '#c9ff3c' : '#4CAF50'
                  }
                  opacity={index === monthlyData.length - 1 ? 1 : 0.7}
                  initial={{ height: 0, y: 200 }}
                  animate={{ height: barHeight, y: 200 - barHeight }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.8,
                    type: 'spring',
                  }}
                />

                <motion.text
                  x={x}
                  y={180}
                  textAnchor="middle"
                  fill="#888"
                  fontSize="12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {item.month}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}
