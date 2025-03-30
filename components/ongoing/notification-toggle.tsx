'use client';

import { motion } from 'framer-motion';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import {
  useInterestedIPOs,
  type InterestedIPO,
} from '@/hooks/use-interested-ipos';

interface NotificationToggleProps {
  ipo: InterestedIPO;
  className?: string;
}

export function NotificationToggle({
  ipo,
  className = '',
}: NotificationToggleProps) {
  const { toggleNotification, isTogglingNotification } = useInterestedIPOs();

  const isNotifying = !!ipo.notifyOnDate;

  const handleToggle = () => {
    toggleNotification(ipo.id);
  };

  return (
    <motion.button
      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
        isNotifying
          ? 'bg-[#c9ff3c] text-black'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      disabled={isTogglingNotification}
    >
      {isTogglingNotification ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isNotifying ? (
        <Bell className="h-4 w-4" />
      ) : (
        <BellOff className="h-4 w-4" />
      )}
      <span>{isNotifying ? 'Notifications On' : 'Notifications Off'}</span>
    </motion.button>
  );
}
