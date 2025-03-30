'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, Download, Filter } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useHistory } from '@/hooks/use-history';
import { TransactionHistoryItem } from '@/components/history/transaction-history-item';
import { AllTimeChart } from '@/components/history/all-time-chart';
import { OverallStats } from '@/components/history/overall-stats';
import { useInterestedIPOs } from '@/hooks/use-interested-ipos';

export default function HistoryPage() {
  const {
    filteredHistoryItems,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    isLoading,
    monthlyBalanceData,
  } = useHistory();

  const {
    getFutureInterestedIPOs,
    getInterestedIPOsArray,
    calculateTotalInvestment,
  } = useInterestedIPOs();

  // Calculate overall stats
  const totalInvestment = calculateTotalInvestment();
  const ipoCount = getInterestedIPOsArray().length;
  const upcomingIpos = getFutureInterestedIPOs().length;
  const monthlyChange = 5.8; // Mock monthly change percentage

  // All-time chart data (extended from monthly data to simulate longer history)
  const allTimeData = [
    ...Array.from({ length: 6 }, (_, i) => ({
      name: `${new Date().getFullYear() - 1} Q${i + 1}`,
      value: Math.round(totalInvestment * (0.4 + i * 0.1)),
    })),
    ...monthlyBalanceData,
  ];

  return (
    <PageLayout
      title="Transaction History"
      description="View your investment history and portfolio performance"
      actionButton={
        <AnimatedButton
          variant="secondary"
          icon={<Download className="h-4 w-4" />}
          iconPosition="left"
        >
          Export
        </AnimatedButton>
      }
    >
      {/* Overall Stats Section */}
      <SectionContainer title="Overall Portfolio Stats">
        <OverallStats
          totalInvestment={totalInvestment}
          ipoCount={ipoCount}
          upcomingIpos={upcomingIpos}
          monthlyChange={monthlyChange}
        />
      </SectionContainer>

      {/* All-Time Balance Chart */}
      <SectionContainer title="All-Time Performance">
        <AllTimeChart data={allTimeData} />
      </SectionContainer>

      {/* Transaction History */}
      <SectionContainer title="Transaction History">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'all', label: 'All Activities' },
              { id: 'interest', label: 'Interests' },
              { id: 'investment', label: 'Investments' },
              { id: 'notification', label: 'Notifications' },
            ].map((f) => (
              <motion.button
                key={f.id}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  filterType === f.id
                    ? 'bg-[#c9ff3c] text-black'
                    : 'bg-gray-800 text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterType(f.id as any)}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full rounded-lg bg-[#1a1a1a] py-2 pr-4 pl-10 text-sm text-white focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <motion.button
              className="rounded-lg bg-[#1a1a1a] p-2 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-4 w-4 text-gray-300" />
            </motion.button>
            <motion.button
              className="rounded-lg bg-[#1a1a1a] p-2 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="h-4 w-4 text-gray-300" />
            </motion.button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-[#1a1a1a] p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-32 rounded bg-gray-700"></div>
                    <div className="mb-2 h-3 w-40 rounded bg-gray-700"></div>
                    <div className="h-3 w-full rounded bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredHistoryItems.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-400">No transactions found</p>
            <p className="mt-2 text-sm text-gray-400">
              Try adjusting your filters or mark some IPOs as interested on the
              Upcoming page
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistoryItems.map((item, index) => (
              <TransactionHistoryItem key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
}
