'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

export function ProfitLossSummary() {
  // Sample profit/loss data
  const profitLossData = [
    { category: 'Stocks', profit: 8750.25, loss: 2300.5 },
    { category: 'ETFs', profit: 3200.75, loss: 850.25 },
    { category: 'Crypto', profit: 4500.5, loss: 850.0 },
  ];

  // Calculate totals
  const totalProfit = profitLossData.reduce(
    (sum, item) => sum + item.profit,
    0,
  );
  const totalLoss = profitLossData.reduce((sum, item) => sum + item.loss, 0);
  const netGain = totalProfit - totalLoss;

  return (
    <motion.div
      className="h-full rounded-xl bg-white p-6 shadow-sm dark:bg-[#1a1a1a]"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="mb-4 flex items-center">
        <DollarSign className="mr-2 h-5 w-5 text-[#c9ff3c]" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Profit & Loss
        </h3>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Profit
          </p>
          <motion.p
            className="text-xl font-bold text-green-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ${totalProfit.toLocaleString()}
          </motion.p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Loss</p>
          <motion.p
            className="text-xl font-bold text-red-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ${totalLoss.toLocaleString()}
          </motion.p>
        </div>
      </div>

      <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Net Gain/Loss
          </p>
          <p
            className={`text-lg font-bold ${netGain >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            ${netGain.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {profitLossData.map((item, index) => (
          <motion.div
            key={item.category}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex items-center">
              <div
                className="mr-2 h-8 w-2 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, #4CAF50 ${(item.profit / (item.profit + item.loss)) * 100}%, #F44336 ${(item.loss / (item.profit + item.loss)) * 100}%)`,
                }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.category}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>${item.profit.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-xs text-red-500">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>${item.loss.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>Year to date</span>
          </div>
          <span>Last updated: June 5, 2024</span>
        </div>
      </div>
    </motion.div>
  );
}
