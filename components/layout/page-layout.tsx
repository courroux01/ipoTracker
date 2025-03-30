'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { AnimatedNavbar } from '@/components/animated-navbar';
import { containerVariants } from '@/lib/animation-variants';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  actionButton?: ReactNode;
}

export function PageLayout({
  children,
  title,
  description,
  actionButton,
}: PageLayoutProps) {
  return (
    <>
      <AnimatedNavbar />
      <div className="min-h-screen bg-[#1c1b1d] p-4 pb-20 md:p-6 md:pb-6">
        <motion.div
          className="mx-auto max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-0"
            variants={containerVariants}
          >
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-gray-400">{description}</p>
            </div>
            {actionButton && (
              <div className="w-full md:w-auto">{actionButton}</div>
            )}
          </motion.div>

          {children}
        </motion.div>
      </div>
    </>
  );
}
