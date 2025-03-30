'use client';

import { motion } from 'framer-motion';

interface SectorSelectorProps {
  sectors: string[];
  selectedSector: string;
  onSelectSector: (sector: string) => void;
}

export function SectorSelector({
  sectors,
  selectedSector,
  onSelectSector,
}: SectorSelectorProps) {
  return (
    <div className="flex w-full flex-wrap gap-3">
      {sectors.map((sector, index) => (
        <motion.button
          key={sector}
          className={`cursor-pointer rounded-xl border border-white px-4 py-2 text-sm font-medium ${
            selectedSector === sector
              ? 'border-[#c9ff3c] bg-[#c9ff3c] text-black'
              : 'bg-[#1a1a1a] text-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          onClick={() => onSelectSector(sector)}
        >
          {sector}
        </motion.button>
      ))}
    </div>
  );
}
