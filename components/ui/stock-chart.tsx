'use client';

import { motion } from 'framer-motion';
import { chartVariants } from '@/lib/animation-variants';
import type { PriceData } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface StockChartProps {
  data: number[];
  color?: string;
  height?: number;
  priceData?: PriceData;
}

export function StockChart({
  data,
  color = '#4CAF50',
  height = 150,
  priceData,
}: StockChartProps) {
  // Normalize data to fit in the chart height
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  // Create path for the chart
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 400;
    const y = 150 - ((value - minValue) / range) * 130;
    return `${x},${y}`;
  });

  const linePath = `M${points.join(' L')}`;
  const areaPath = `${linePath} L400,150 L0,150 Z`;

  return (
    <div className="relative" style={{ height }}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
      >
        {/* Horizontal grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={i}
            x1="0"
            y1={30 * i}
            x2="400"
            y2={30 * i}
            stroke="#333"
            strokeWidth="0.5"
            strokeDasharray="5,5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          />
        ))}

        {/* Chart line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="3"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Area under the chart */}
        <motion.path
          d={areaPath}
          fill="url(#gradient)"
          opacity="0.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1.5, duration: 1 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Current price indicator */}
        <motion.circle
          cx="300"
          cy="20"
          r="5"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.7 }}
        />
      </motion.svg>

      {/* Price tooltip */}
      {priceData && (
        <motion.div
          className="absolute top-1/4 right-1/4 rounded-md bg-gray-800 p-2 text-white shadow-lg dark:bg-gray-900"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-gray-400">Open</span>
            <span className="text-xs font-medium">
              {formatCurrency(priceData.open)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Close</span>
            <span className="text-xs font-medium">
              {formatCurrency(priceData.close)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
