'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { CardGrid } from '@/components/ui/card-grid';
import { AnimatedButton } from '@/components/ui/animated-button';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Wallet,
  Bell,
  Calendar,
  Clock,
  History,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { itemVariants } from '@/lib/animation-variants';

export default function DashboardPage() {
  // Sample data
  const portfolioValue = 209891.21;
  const portfolioChange = 5.8;
  const upcomingIpos = 12;
  const pendingTransactions = 3;
  const watchlistAlerts = 2;

  return (
    <PageLayout
      title="Dashboard"
      description="Your financial overview at a glance"
      actionButton={
        <AnimatedButton
          variant="primary"
          icon={<RefreshCw className="h-4 w-4" />}
          iconPosition="left"
        >
          Refresh Data
        </AnimatedButton>
      }
    >
      {/* Portfolio Summary */}
      <SectionContainer>
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Portfolio Value
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolioValue)}
              </p>
              <div className="flex items-center text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span className="font-medium">
                  {formatPercentage(portfolioChange)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.div
              className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm dark:bg-[#1a1a1a]"
              whileHover={{
                y: -2,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              variants={itemVariants}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9ff3c]/20">
                <Wallet className="h-5 w-5 text-[#c9ff3c]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Available Cash
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(25430.65)}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm dark:bg-[#1a1a1a]"
              whileHover={{
                y: -2,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              variants={itemVariants}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <PieChart className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Asset Allocation
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  5 Categories
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-sm dark:bg-[#1a1a1a]"
              whileHover={{
                y: -2,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              variants={itemVariants}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <BarChart3 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  YTD Return
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  +12.4%
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/50">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <BarChart3 className="mx-auto mb-2 h-10 w-10 text-[#c9ff3c]" />
            <p className="text-gray-500 dark:text-gray-400">
              Portfolio Performance Chart
            </p>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Quick Access Cards */}
      <motion.h2
        className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
        variants={itemVariants}
      >
        Quick Access
      </motion.h2>

      <CardGrid columns={3}>
        {/* Upcoming IPOs Card */}
        <motion.div variants={itemVariants}>
          <Link href="/upcoming">
            <SectionContainer className="h-full cursor-pointer transition-all duration-300 hover:border hover:border-[#c9ff3c]/50">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9ff3c]/20">
                    <Calendar className="h-6 w-6 text-[#c9ff3c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Upcoming IPOs
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Track new opportunities
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex-grow rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      New IPOs this month
                    </p>
                    <p className="text-lg font-bold text-[#c9ff3c]">
                      {upcomingIpos}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex items-center text-sm font-medium text-[#c9ff3c]">
                    <span>View Details</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </SectionContainer>
          </Link>
        </motion.div>

        {/* Ongoing Investments Card */}
        <motion.div variants={itemVariants}>
          <Link href="/ongoing">
            <SectionContainer className="h-full cursor-pointer transition-all duration-300 hover:border hover:border-[#c9ff3c]/50">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9ff3c]/20">
                    <Clock className="h-6 w-6 text-[#c9ff3c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Ongoing Investments
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your portfolio
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex-grow rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Active stocks
                    </p>
                    <p className="text-lg font-bold text-[#c9ff3c]">5</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex items-center text-sm font-medium text-[#c9ff3c]">
                    <span>View Portfolio</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </SectionContainer>
          </Link>
        </motion.div>

        {/* Transaction History Card */}
        <motion.div variants={itemVariants}>
          <Link href="/history">
            <SectionContainer className="h-full cursor-pointer transition-all duration-300 hover:border hover:border-[#c9ff3c]/50">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9ff3c]/20">
                    <History className="h-6 w-6 text-[#c9ff3c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Transaction History
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Review past activities
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex-grow rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Pending transactions
                    </p>
                    <p className="text-lg font-bold text-[#c9ff3c]">
                      {pendingTransactions}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex items-center text-sm font-medium text-[#c9ff3c]">
                    <span>View History</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </SectionContainer>
          </Link>
        </motion.div>
      </CardGrid>

      {/* Notifications Section */}
      <motion.div variants={itemVariants} className="mt-6">
        <SectionContainer title="Recent Notifications">
          <div className="space-y-3">
            {watchlistAlerts > 0 && (
              <motion.div
                className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20">
                  <Bell className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Watchlist Alert
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AAPL has increased by 3.2% today
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    2 hours ago
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
              whileHover={{ x: 5 }}
            >
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Portfolio Update
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your portfolio has grown by 5.8% this month
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  1 day ago
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
              whileHover={{ x: 5 }}
            >
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Upcoming IPO
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  MediPharm Labs IPO scheduled for June 15
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  3 days ago
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-4 text-center">
            <AnimatedButton variant="outline">
              View All Notifications
            </AnimatedButton>
          </div>
        </SectionContainer>
      </motion.div>
    </PageLayout>
  );
}
