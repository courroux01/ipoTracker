'use client';

import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, PieChart, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { TabItem } from '@/types';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNavigation({
  activeTab,
  setActiveTab,
}: BottomNavigationProps) {
  const pathname = usePathname();
  const tabs: TabItem[] = [
    { name: 'Summary', icon: BarChart2, id: 'summary' },
    { name: 'Markets', icon: TrendingUp, id: 'markets' },
    { name: 'Portfolio', icon: PieChart, id: 'portfolio' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ];

  // Map the paths to tab IDs
  const getTabIdFromPath = (path: string): string => {
    if (path.includes('/upcoming')) return 'markets';
    if (path.includes('/ongoing')) return 'portfolio';
    if (path.includes('/profile')) return 'settings';
    if (path.includes('/history')) return 'markets';
    return 'summary';
  };

  // Get the active tab from the current path
  const currentTabId = getTabIdFromPath(pathname || '');

  return (
    <motion.div
      className="pb-safe fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-gray-200 bg-white p-4 md:hidden dark:border-gray-800 dark:bg-[#1a1a1a]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
    >
      {tabs.map((item) => (
        <motion.div
          key={item.id}
          className={`flex flex-col items-center justify-center ${
            currentTabId === item.id
              ? 'text-[#c9ff3c]'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab(item.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={
              item.id === 'summary'
                ? '/dashboard'
                : item.id === 'markets'
                  ? '/upcoming'
                  : item.id === 'portfolio'
                    ? '/ongoing'
                    : '/profile'
            }
          >
            <div className="flex flex-col items-center justify-center">
              <item.icon className="h-6 w-6" />
              <span className="mt-1 text-xs">{item.name}</span>
              {currentTabId === item.id && (
                <motion.div
                  className="absolute bottom-0 h-1 w-10 rounded-t-full bg-[#c9ff3c]"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
