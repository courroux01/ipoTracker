'use client';

import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';
import {
  itemVariants,
  pulseAnimation,
  pulseTransition,
} from '@/lib/animation-variants';

interface DashboardHeaderProps {
  username: string;
}

export function DashboardHeader({ username }: DashboardHeaderProps) {
  return (
    <motion.div
      className="mb-6 flex items-center justify-between"
      variants={itemVariants}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hello, {username}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back to your dashboard
        </p>
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <motion.div
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#c9ff3c]"
            animate={pulseAnimation}
            transition={pulseTransition}
          />
        </motion.div>
        <motion.div
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}
