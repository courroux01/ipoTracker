'use client';

import { useState } from 'react';
import { RefreshCw, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { AnimatedButton } from '@/components/ui/animated-button';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { useInterestedIPOs } from '@/hooks/use-interested-ipos';
import { PastIpoCard } from '@/components/ongoing/past-ipo-card';
import { FutureIpoCard } from '@/components/ongoing/future-ipo-card';
import { useQueryClient } from '@tanstack/react-query';
import { BalanceChart } from '@/components/ui/balance-chart';
import { format, subMonths } from 'date-fns';

export default function OngoingPage() {
  const queryClient = useQueryClient();
  const {
    getPastInterestedIPOs,
    getFutureInterestedIPOs,
    calculateTotalInvestment,
    isLoading,
  } = useInterestedIPOs();

  // Get past and future IPOs
  const pastIPOs = getPastInterestedIPOs();
  const futureIPOs = getFutureInterestedIPOs();

  // Calculate total investment
  const totalInvestment = calculateTotalInvestment();

  // Mock monthly change percentage
  const [monthlyChange] = useState(5.8);

  // Generate chart data for the last 6 months
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return {
      name: format(date, 'MMM'),
      value:
        i === 5
          ? totalInvestment
          : Math.round(totalInvestment * (0.7 + i * 0.06)),
      current: i === 5,
    };
  });

  // Handle refresh
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['interested-ipos'] });
  };

  return (
    <PageLayout
      title="Your Portfolio"
      description="Track your current investments and upcoming IPOs"
      actionButton={
        <AnimatedButton
          variant="primary"
          icon={<RefreshCw className="h-4 w-4" />}
          iconPosition="left"
          onClick={handleRefresh}
        >
          Refresh
        </AnimatedButton>
      }
    >
      {/* THIS MONTH'S BALANCE - Prominently displayed */}
      <SectionContainer title="This Month's Balance">
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Portfolio Value
            </p>
            <div className="mt-1 flex items-center gap-3">
              <p className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                {formatCurrency(totalInvestment)}
              </p>
              <div className="flex items-center rounded-full bg-green-100 px-2 py-1 text-green-500 dark:bg-green-900/30">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span className="font-medium">
                  {formatPercentage(monthlyChange)}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <BalanceChart data={monthlyData} height={150} />
          </div>
        </div>
      </SectionContainer>

      {/* PAST INVESTMENTS - IPOs before today */}
      <SectionContainer
        title="Past Investments"
        rightElement={
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              IPOs before today
            </span>
          </div>
        }
      >
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-white p-4 shadow-sm dark:bg-[#1a1a1a]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : pastIPOs.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No past investments found
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Mark IPOs as interested on the Upcoming page to track them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastIPOs.map((ipo, index) => (
              <PastIpoCard key={ipo.id} ipo={ipo} index={index} />
            ))}
          </div>
        )}
      </SectionContainer>

      {/* UPCOMING INVESTMENTS - IPOs after today */}
      <SectionContainer
        title="Upcoming Investments"
        rightElement={
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              IPOs after today
            </span>
          </div>
        }
      >
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-white p-4 shadow-sm dark:bg-[#1a1a1a]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : futureIPOs.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming investments found
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Mark IPOs as interested on the Upcoming page to track them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {futureIPOs.map((ipo, index) => (
              <FutureIpoCard key={ipo.id} ipo={ipo} index={index} />
            ))}
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
}
