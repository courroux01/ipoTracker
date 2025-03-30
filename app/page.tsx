'use client';

import { AnimatedNavbar } from '@/components/animated-navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, History, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <AnimatedNavbar />
      <div className="min-h-screen bg-[#121212] p-4 md:p-6">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mt-8 mb-12 text-center">
            <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              Welcome to <span className="text-[#c9ff3c]">SeekIPO</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-400 md:text-xl">
              Track the hottest private stocks turning public. View potentially
              high reward buys and get comprehensive data analysis and history.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Cards - made more responsive for mobile */}
            <motion.div
              className="col-span-1 flex h-full flex-col overflow-hidden rounded-xl bg-[#1a1a1a] shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center border-b border-gray-800 bg-[#c9ff3c]/10 p-4">
                <Calendar className="mr-2 h-5 w-5 text-[#c9ff3c]" />
                <h2 className="text-xl font-bold text-white">Upcoming IPOs</h2>
              </div>
              <div className="flex flex-grow flex-col p-4">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Sectors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Technology', 'Medicine', 'Finance'].map(
                      (sector, i) => (
                        <div
                          key={sector}
                          className={`rounded-lg px-3 py-1 text-xs font-medium ${
                            sector === 'All'
                              ? 'bg-[#c9ff3c] text-black'
                              : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          {sector}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    IPO Date
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Today', 'This Week', 'This Month'].map((period, i) => (
                      <div
                        key={period}
                        className={`rounded-lg px-3 py-1 text-xs font-medium ${
                          period === 'This Month'
                            ? 'bg-[#c9ff3c] text-black'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3 rounded-lg bg-gray-900/50 p-3">
                  <div className="mb-1 flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-[#c9ff3c] text-xs font-bold text-black">
                      M
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        MediPharm Labs
                      </h4>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">MEDI</span>
                        <span className="mx-1 text-gray-600">•</span>
                        <span className="rounded-full bg-gray-800 px-1.5 py-0.5 text-xs text-gray-700">
                          Medicine
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href="/upcoming">
                    <motion.button
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#c9ff3c] px-4 py-2 font-medium text-black"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm whitespace-nowrap">
                        View Upcoming IPOs
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Ongoing Page Preview */}
            <motion.div
              className="col-span-1 flex flex-col overflow-hidden rounded-xl bg-[#1a1a1a] shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center border-b border-gray-800 bg-[#c9ff3c]/10 p-4">
                <Clock className="mr-2 h-5 w-5 text-[#c9ff3c]" />
                <h2 className="text-xl font-bold text-white">
                  Ongoing Investments
                </h2>
              </div>
              <div className="flex flex-grow flex-col p-4">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    This Month's Balance
                  </h3>
                  <div className="rounded-lg bg-gray-900/50 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Total Value</p>
                        <p className="text-lg font-bold text-white">
                          $209,891.21
                        </p>
                      </div>
                      <div className="text-sm font-medium text-green-500">
                        +5.8%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Stock Holdings
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        ticker: 'AAPL',
                        name: 'Apple Inc.',
                        shares: 150,
                        price: '$182.53',
                        change: '+25.23%',
                      },
                      {
                        ticker: 'MSFT',
                        name: 'Microsoft Corp.',
                        shares: 100,
                        price: '$234.53',
                        change: '+11.52%',
                      },
                    ].map((stock, i) => (
                      <div
                        key={stock.ticker}
                        className="rounded-lg bg-gray-900/50 p-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-gray-800">
                              <span className="text-xs font-bold text-gray-300">
                                {stock.ticker.substring(0, 1)}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white">
                                {stock.ticker}
                              </p>
                              <p className="text-xs text-gray-500">
                                {stock.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-white">
                              {stock.price}
                            </p>
                            <p className="text-xs text-green-500">
                              {stock.change}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href="/ongoing">
                    <motion.button
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#c9ff3c] px-4 py-2 font-medium text-black"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm whitespace-nowrap">
                        View Portfolio
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* History Page Preview */}
            <motion.div
              className="col-span-1 flex flex-col overflow-hidden rounded-xl bg-[#1a1a1a] shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center border-b border-gray-800 bg-[#c9ff3c]/10 p-4">
                <History className="mr-2 h-5 w-5 text-[#c9ff3c]" />
                <h2 className="text-xl font-bold text-white">
                  Transaction History
                </h2>
              </div>
              <div className="flex flex-grow flex-col p-4">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Past Transactions
                  </h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {['All', 'Buy', 'Sell'].map((filter, i) => (
                      <div
                        key={filter}
                        className={`rounded-lg px-3 py-1 text-xs font-medium ${
                          filter === 'All'
                            ? 'bg-[#c9ff3c] text-black'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        {filter}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        date: 'Jun 1, 2024',
                        type: 'Buy',
                        ticker: 'AAPL',
                        shares: 10,
                        price: '$180.95',
                      },
                      {
                        date: 'May 28, 2024',
                        type: 'Sell',
                        ticker: 'MSFT',
                        shares: 5,
                        price: '$230.45',
                      },
                    ].map((tx, i) => (
                      <div key={i} className="rounded-lg bg-gray-900/50 p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                tx.type === 'Buy'
                                  ? 'bg-green-900/30 text-green-600'
                                  : 'bg-red-900/30 text-red-600'
                              }`}
                            >
                              {tx.type}
                            </div>
                            <div className="ml-2">
                              <p className="text-xs font-medium text-white">
                                {tx.ticker}
                              </p>
                              <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-white">
                              {tx.shares} shares
                            </p>
                            <p className="text-xs text-gray-500">{tx.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href="/history">
                    <motion.button
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#c9ff3c] px-4 py-2 font-medium text-black"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm whitespace-nowrap">
                        View Transaction History
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Other cards */}
          </div>
        </motion.div>
      </div>
    </>
  );
}
