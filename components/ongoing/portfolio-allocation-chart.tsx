'use client';

import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import { useState } from 'react';

interface StockHolding {
  name: string;
  ticker: string;
  allocation: number;
}

interface PortfolioAllocationChartProps {
  holdings: StockHolding[];
}

export function PortfolioAllocationChart({
  holdings,
}: PortfolioAllocationChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  // Colors for the pie chart segments
  const colors = [
    '#4CAF50',
    '#2196F3',
    '#9C27B0',
    '#FF9800',
    '#F44336',
    '#3F51B5',
    '#009688',
    '#FFC107',
    '#795548',
    '#607D8B',
  ];

  // Calculate the start and end angles for each segment
  const segments = holdings.map((holding, index) => {
    const startAngle =
      holdings.slice(0, index).reduce((sum, h) => sum + h.allocation, 0) * 3.6; // Convert percentage to degrees

    const endAngle = startAngle + holding.allocation * 3.6;

    return {
      ...holding,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
    };
  });

  // Function to create an SVG arc path
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = 100 + radius * Math.cos(startRad);
    const y1 = 100 + radius * Math.sin(startRad);
    const x2 = 100 + radius * Math.cos(endRad);
    const y2 = 100 + radius * Math.sin(endRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <motion.div
      className="h-full rounded-xl bg-white p-6 shadow-sm dark:bg-[#1a1a1a]"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="mb-4 flex items-center">
        <PieChart className="mr-2 h-5 w-5 text-[#c9ff3c]" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Portfolio Allocation
        </h3>
      </div>

      <div className="relative h-48">
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {segments.map((segment, index) => (
            <motion.path
              key={segment.ticker}
              d={createArc(
                segment.startAngle,
                segment.endAngle,
                hoveredSegment === index ? 85 : 80,
              )}
              fill={segment.color}
              stroke="#fff"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="cursor-pointer"
            />
          ))}

          {/* Center circle */}
          <circle cx="100" cy="100" r="40" fill="#1a1a1a" />

          {/* Text in center */}
          <text
            x="100"
            y="95"
            textAnchor="middle"
            fill="#fff"
            fontSize="12"
            fontWeight="bold"
          >
            {hoveredSegment !== null
              ? segments[hoveredSegment].ticker
              : 'ALLOC'}
          </text>
          <text
            x="100"
            y="110"
            textAnchor="middle"
            fill="#c9ff3c"
            fontSize="10"
          >
            {hoveredSegment !== null
              ? `${segments[hoveredSegment].allocation}%`
              : '100%'}
          </text>
        </svg>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.ticker}
            className="flex items-center text-xs"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            whileHover={{ x: 2 }}
          >
            <div
              className="mr-1 h-3 w-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="truncate text-gray-700 dark:text-gray-300">
              {segment.ticker}
            </span>
            <span className="ml-auto text-gray-500 dark:text-gray-400">
              {segment.allocation}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
