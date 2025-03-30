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
  Cell,
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
        <div className="rounded-md border border-gray-700 bg-gray-800 p-2 shadow-md">
          <p className="text-sm font-medium text-white">{item.name}</p>
          <p className="text-sm text-gray-300">{formatCurrency(item.value)}</p>
          {item.current && (
            <p className="text-xs text-[#c9ff3c]">Current Month</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Define colors
  const regularBarColor = '#4CAF50';
  const currentBarColor = '#c9ff3c';

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">
          Monthly Performance
        </h3>
        <motion.button
          className="flex items-center text-gray-400 hover:text-gray-200"
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
          className="mb-3 rounded-md bg-gray-800/50 p-2 text-xs text-gray-400"
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
              <linearGradient
                id="balance-chart-current-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={currentBarColor} stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor={currentBarColor}
                  stopOpacity={0.6}
                />
              </linearGradient>
              <linearGradient
                id="balance-chart-regular-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={regularBarColor} stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor={regularBarColor}
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.current
                      ? 'url(#balance-chart-current-gradient)'
                      : 'url(#balance-chart-regular-gradient)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
