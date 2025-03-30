'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { ChevronDown, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface BalanceData {
  name: string;
  value: number;
  current?: boolean;
}

interface BalanceChartProps {
  data: BalanceData[];
  height?: number;
  showLabels?: boolean;
}

export function BalanceChart({
  data,
  height = 200,
  showLabels = true,
}: BalanceChartProps) {
  const [showInfo, setShowInfo] = useState(false);

  const maxValue = Math.max(...data.map((item) => item.value)) * 1.1; // 10% buffer

  // Define custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {formatCurrency(item.value)}
          </p>
          {item.current && (
            <p className="text-xs text-[#c9ff3c]">Current Month</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Monthly Performance
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
            This chart shows your portfolio balance over the past 6 months. The
            highlighted bar represents the current month.
          </p>
        </motion.div>
      )}

      <motion.div
        className="w-full overflow-x-auto"
        style={{ height, minHeight: '150px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
            barCategoryGap={8}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#333"
              strokeOpacity={0.2}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              dy={10}
              height={showLabels ? 30 : 0}
              hide={!showLabels}
            />
            <YAxis
              domain={[0, maxValue]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={showLabels ? 50 : 0}
              hide={!showLabels}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#666" />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9ff3c" stopOpacity={1} />
                <stop offset="100%" stopColor="#c9ff3c" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient
                id="regularBarGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#4CAF50" stopOpacity={1} />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              fill="url(#regularBarGradient)"
              fillOpacity={0.8}
              animationDuration={1500}
              animationEasing="ease-out"
              isAnimationActive={true}
              shape={(props: any) => {
                const { x, y, width, height, fill, payload } = props;
                const fillColor = payload.current ? 'url(#barGradient)' : fill;
                return (
                  <motion.rect
                    x={x}
                    width={width}
                    fill={fillColor}
                    y={y + height} // Start from bottom
                    height={0} // Start with 0 height
                    rx={4}
                    ry={4}
                    initial={{ y: y + height, height: 0 }}
                    animate={{ y, height }}
                    transition={{
                      duration: 0.8,
                      delay: payload.current ? 0.5 : 0.2 + props.index * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
