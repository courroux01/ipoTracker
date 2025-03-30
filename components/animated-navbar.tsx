'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, TrendingUp, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  {
    name: 'Upcoming',
    href: '/upcoming',
    icon: Calendar,
  },
  {
    name: 'Ongoing',
    href: '/ongoing',
    icon: Clock,
  },
  {
    name: 'History',
    href: '/history',
    icon: History,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
];

// Animation variants
const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export function AnimatedNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Desktop navigation */}
      <motion.nav
        className="fixed top-0 right-0 left-0 z-[100] border-b border-white/10 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        variants={navbarVariants}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-[#c9ff3c]" />
                <span className="ml-2 text-lg font-semibold">SeekIPO</span>
              </div>
            </Link>

            <div className="hidden md:block">
              <motion.div className="flex space-x-4" variants={itemVariants}>
                {tabs.map((tab) => {
                  const isActive =
                    pathname === tab.href ||
                    (tab.href !== '/' && pathname?.startsWith(tab.href));

                  return (
                    <motion.div
                      key={tab.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={tab.href}
                        className={cn(
                          'relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out',
                          isActive
                            ? 'text-[#c9ff3c]'
                            : 'text-white/80 hover:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <tab.icon className="h-4 w-4" />
                          <span>{tab.name}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div className="md:hidden" variants={itemVariants}>
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-[#c9ff3c] focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                <div className="flex h-6 w-6 flex-col items-center justify-center gap-1.5">
                  <motion.span
                    className="block h-0.5 w-6 bg-current"
                    animate={
                      isMobileMenuOpen
                        ? { rotate: 45, y: 8 }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block h-0.5 w-6 bg-current"
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block h-0.5 w-6 bg-current"
                    animate={
                      isMobileMenuOpen
                        ? { rotate: -45, y: -8 }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu - cleaned up */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <div className="space-y-2 border-t border-white/10 px-4 pt-2 pb-4">
                {tabs.map((tab, index) => {
                  const isActive =
                    pathname === tab.href ||
                    (tab.href !== '/' && pathname?.startsWith(tab.href));

                  return (
                    <motion.div
                      key={tab.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.2,
                      }}
                    >
                      <Link
                        href={tab.href}
                        className={cn(
                          'relative block rounded-md px-3 py-2 text-base font-medium',
                          isActive
                            ? 'text-[#c9ff3c]'
                            : 'text-white/80 hover:text-white',
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <tab.icon className="h-5 w-5" />
                          <span>{tab.name}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
