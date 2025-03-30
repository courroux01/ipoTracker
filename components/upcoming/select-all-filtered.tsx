'use client';

import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useInterestedIPOs } from '@/hooks/use-interested-ipos';
import type { IPO } from '@/hooks/use-ipos';

interface SelectAllFilteredProps {
  filteredIpos: IPO[];
  className?: string;
}

export function SelectAllFiltered({
  filteredIpos,
  className = '',
}: SelectAllFilteredProps) {
  const { markMultipleAsInterested, isMarkingMultiple } = useInterestedIPOs();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectAll = () => {
    if (filteredIpos.length === 0) return;

    setIsSelected(true);
    markMultipleAsInterested(filteredIpos);
  };

  return (
    <motion.button
      className={`flex items-center gap-2 rounded-xl bg-[#c9ff3c] px-4 py-2 text-sm font-medium text-black ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSelectAll}
      disabled={isMarkingMultiple || filteredIpos.length === 0}
    >
      {isMarkingMultiple ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSelected ? (
        <Check className="h-4 w-4" />
      ) : null}
      <span>Mark All Filtered as Interested</span>
    </motion.button>
  );
}
