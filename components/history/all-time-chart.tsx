'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChevronDown, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface AllTimeChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
}

export function AllTimeChart({ data, height = 300 }: AllTimeChartProps) {
  const [showInfo, setShowInfo] = useState(false);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          All-Time Balance
        </h3>
        <motion.button
          className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="mr-1 h-4 w-4" />
          <span className="text-xs">Details</span>
          <motion.div
            animate={{ rotate: showInfo ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="ml-1 h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>

      {showInfo && (
        <motion.div
          className="mb-3 rounded-md bg-gray-50 p-2 text-xs text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p>
            This chart displays your portfolio balance over time, showing the
            growth of your investments.
          </p>
        </motion.div>
      )}

      <motion.div
        className="w-full"
        style={{ height }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c9ff3c" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c9ff3c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#333"
              strokeOpacity={0.2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#c9ff3c"
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
