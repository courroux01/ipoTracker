'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useInterestedIPOs } from '@/hooks/use-interested-ipos';
import type { IPO } from '@/hooks/use-ipos';

interface InterestCheckboxProps {
  ipo: IPO;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
}

export function InterestCheckbox({
  ipo,
  className = '',
  size = 'md',
  label = 'Interested',
  showLabel = true,
}: InterestCheckboxProps) {
  const { isInterested, toggleInterest, isToggling } = useInterestedIPOs();

  const interested = isInterested(ipo.id);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleInterest(ipo.id, ipo);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        className={`${sizeClasses[size]} flex items-center justify-center rounded-md border ${
          interested
            ? 'border-[#c9ff3c] bg-[#c9ff3c]'
            : 'border-gray-600 bg-gray-800'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        disabled={isToggling}
      >
        {interested && (
          <Check
            className="text-black"
            size={size === 'sm' ? 12 : size === 'md' ? 16 : 20}
          />
        )}
      </motion.button>

      {showLabel && <span className="text-sm text-gray-300">{label}</span>}
    </div>
  );
}
