'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { itemVariants } from '@/lib/animation-variants';
import type { MarketTrend, NewsItem } from '@/types';
import { MarketTrendIndicator } from '@/components/ui/market-trend-indicator';
import { NewsItemComponent } from '@/components/ui/news-item';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface PortfolioCardProps {
  totalInvestment: number;
  percentageChange: number;
  marketDirection: MarketTrend;
  marketMomentum: MarketTrend;
  news: NewsItem[];
}

export function PortfolioCard({
  totalInvestment,
  percentageChange,
  marketDirection,
  marketMomentum,
  news,
}: PortfolioCardProps) {
  return (
    <motion.div
      className="h-full rounded-3xl bg-white p-6 shadow-lg dark:bg-[#1a1a1a]"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      variants={itemVariants}
    >
      <div className="mb-6 rounded-xl bg-[#c9ff3c] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-medium text-black">Your Portfolio</p>
          <p className="text-sm text-black/70">December 21, 2022</p>
        </div>
        <p className="mb-1 text-sm text-black/70">Total Invest</p>
        <div className="flex items-end justify-between">
          <motion.h3
            className="text-2xl font-bold text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {formatCurrency(totalInvestment)}
          </motion.h3>
          <div className="flex items-center rounded-full bg-black/10 px-2 py-1 text-black">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span className="text-xs font-medium">
              {formatPercentage(percentageChange)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <MarketTrendIndicator
          title="Market Direction"
          trend={marketDirection.trend}
          change={marketDirection.change}
        />
        <MarketTrendIndicator
          title="Market Momentum"
          trend={marketMomentum.trend}
          change={marketMomentum.change}
        />
      </div>

      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Recent Market News
          </h3>
          <button className="text-sm text-[#c9ff3c]">See more</button>
        </div>

        <div className="space-y-4">
          {news.map((item, index) => (
            <NewsItemComponent
              key={`${item.ticker}-${index}`}
              newsItem={item}
              isLast={index === news.length - 1}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
