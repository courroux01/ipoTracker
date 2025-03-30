'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Transaction {
  id: string;
  date: string;
  type: string;
  ticker: string;
  name: string;
  shares: number;
  price: number;
  total: number;
  status: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

export function TransactionHistoryTable({
  transactions,
}: TransactionHistoryTableProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-[#1a1a1a]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Shares
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Total
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <td className="px-4 py-3 text-sm">
                  <span className="text-gray-900 dark:text-white">
                    {formatDate(transaction.date)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      transaction.type === 'buy'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'buy' ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    )}
                    <span>{transaction.type === 'buy' ? 'Buy' : 'Sell'}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {transaction.ticker.substring(0, 1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.ticker}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {transaction.shares}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {formatCurrency(transaction.price)}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(transaction.total)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <motion.button
                    className="rounded-full bg-gray-100 p-1 dark:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No transactions found
          </p>
        </div>
      )}
    </motion.div>
  );
}
