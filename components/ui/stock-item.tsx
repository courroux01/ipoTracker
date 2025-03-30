'use client';

import { motion } from 'framer-motion';
import type { Stock } from '@/types';
import { formatCurrency, formatPercentage, getColorByValue } from '@/lib/utils';

interface StockItemProps {
  stock: Stock;
}

export function StockItem({ stock }: StockItemProps) {
  const color = getColorByValue(stock.change);

  return (
    <motion.div
      className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-[#2a2a2a]"
      whileHover={{ x: 5 }}
    >
      <div className="flex items-center">
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#2a2a2a]">
          <span className="text-xs font-bold text-white">
            {stock.name.substring(0, 1)}
          </span>
        </div>
        <div>
          <p className="font-medium text-white">{stock.name}</p>
          <p className="text-xs text-gray-400">{stock.fullName}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-3 h-8 w-16">
          <svg width="100%" height="100%" viewBox="0 0 100 30">
            <motion.path
              d={
                stock.chart === 'up'
                  ? 'M0,20 Q25,5 50,15 T100,10'
                  : 'M0,10 Q25,25 50,15 T100,20'
              }
              fill="none"
              stroke={color}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          </svg>
        </div>
        <div className="text-right">
          <p className="font-medium text-white">
            {formatCurrency(stock.price)}
          </p>
          <p className="text-xs" style={{ color }}>
            {formatPercentage(stock.change)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
