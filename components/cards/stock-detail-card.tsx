'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { itemVariants, scaleInVariants } from '@/lib/animation-variants';
import type { PriceData } from '@/types';
import { StockChart } from '@/components/ui/stock-chart';
import { TimePeriodSelector } from '@/components/ui/time-period-selector';
import { BuySellButtons } from '@/components/ui/buy-sell-buttons';
import { formatPercentage, formatCompactNumber } from '@/lib/utils';

interface StockDetailCardProps {
  ticker: string;
  companyName: string;
  marketCap: number;
  percentageChange: number;
  chartData: number[];
  priceData: PriceData;
}

export function StockDetailCard({
  ticker,
  companyName,
  marketCap,
  percentageChange,
  chartData,
  priceData,
}: StockDetailCardProps) {
  return (
    <motion.div
      className="h-full rounded-3xl bg-white p-6 shadow-lg dark:bg-[#1a1a1a]"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      variants={itemVariants}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {ticker}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {companyName}
          </p>
        </div>
        <motion.button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-300"
            />
          </svg>
        </motion.button>
      </div>

      <motion.div
        className="mb-6 rounded-xl bg-[#1a1a1a] p-4 dark:bg-black"
        variants={scaleInVariants}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xl font-bold text-white">
            ${formatCompactNumber(marketCap)}B
          </p>
          <div className="flex items-center rounded-full bg-green-500/20 px-2 py-0.5">
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-500">
              {formatPercentage(percentageChange)}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400">Market capitalization</p>
      </motion.div>

      <TimePeriodSelector />

      <div className="relative mb-6 h-48">
        <StockChart
          data={chartData}
          color="#4CAF50"
          height={150}
          priceData={priceData}
        />
      </div>

      <BuySellButtons />
    </motion.div>
  );
}
