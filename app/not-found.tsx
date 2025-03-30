'use client';

import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#e8edf0] p-4 dark:bg-[#121212]">
      <motion.div
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-[#1a1a1a]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#c9ff3c]/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
              }}
            >
              <Search className="h-8 w-8 text-[#c9ff3c]" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="mb-2 text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="mb-3 text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="mb-6 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The page you are looking for doesn't exist or has been moved.
          </motion.p>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Link href="/" className="w-full">
              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#c9ff3c] px-4 py-2 font-medium text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </motion.button>
            </Link>

            <motion.button
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Looking for one of these pages?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: 'Upcoming IPOs', href: '/upcoming' },
            { name: 'Portfolio', href: '/ongoing' },
            { name: 'Transaction History', href: '/history' },
            { name: 'Profile', href: '/profile' },
            { name: 'Dashboard', href: '/dashboard' },
          ].map((link, index) => (
            <Link key={link.href} href={link.href}>
              <motion.div
                className="rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm dark:bg-[#1a1a1a] dark:text-white"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#c9ff3c',
                  color: '#000',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
