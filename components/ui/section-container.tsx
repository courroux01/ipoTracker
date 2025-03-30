'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { itemVariants } from '@/lib/animation-variants';

interface SectionContainerProps {
  children: ReactNode;
  title?: string;
  className?: string;
  rightElement?: ReactNode;
}

export function SectionContainer({
  children,
  title,
  className = '',
  rightElement,
}: SectionContainerProps) {
  return (
    <motion.div
      className={`mb-6 rounded-xl border-2 border-white bg-[#1a1a1a] p-4 shadow-sm md:p-6 ${className}`}
      variants={itemVariants}
    >
      {(title || rightElement) && (
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          )}
          {rightElement && <div>{rightElement}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
