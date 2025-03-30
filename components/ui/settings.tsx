'use client';

import { SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function Settings() {
  return (
    <motion.div
      className="h-6 w-6 text-gray-500 dark:text-gray-400"
      animate={{ rotate: [0, 180] }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
        ease: 'linear',
      }}
    >
      <SettingsIcon className="h-6 w-6" />
    </motion.div>
  );
}
