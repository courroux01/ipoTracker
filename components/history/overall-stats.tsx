'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Calendar, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface OverallStatsProps {
  totalInvestment: number;
  ipoCount: number;
  upcomingIpos: number;
  monthlyChange: number;
}

interface StatItem {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  delay: number;
}

export function OverallStats({
  totalInvestment,
  ipoCount,
  upcomingIpos,
  monthlyChange,
}: OverallStatsProps) {
  const stats: StatItem[] = [
    {
      title: 'Total Investment',
      value: `$${totalInvestment.toLocaleString()}`,
      description: 'Across all IPO investments',
      icon: DollarSign,
      iconBg: 'bg-[#c9ff3c]/20',
      iconColor: 'text-[#c9ff3c]',
      delay: 0.1,
    },
    {
      title: 'Monthly Change',
      value: `+${monthlyChange.toFixed(1)}%`,
      description: 'Since last month',
      icon: TrendingUp,
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-500',
      delay: 0.2,
    },
    {
      title: 'Total IPOs',
      value: ipoCount,
      description: 'IPOs tracked in your portfolio',
      icon: Activity,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-500',
      delay: 0.3,
    },
    {
      title: 'Upcoming IPOs',
      value: upcomingIpos,
      description: "Future IPOs you're interested in",
      icon: Calendar,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-500',
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            className="rounded-xl border-2 border-white bg-[#1a1a1a] p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">
                {stat.title}
              </h3>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
