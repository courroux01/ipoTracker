'use client';

import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#e8edf0] p-4 dark:bg-[#121212]">
          <motion.div
            className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-[#1a1a1a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
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
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                >
                  <AlertOctagon className="h-8 w-8 text-red-600 dark:text-red-400" />
                </motion.div>
              </motion.div>

              <motion.h2
                className="mb-3 text-2xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Something went seriously wrong
              </motion.h2>

              <motion.p
                className="mb-6 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We apologize for the inconvenience. Please try refreshing the
                page.
              </motion.p>

              <motion.button
                className="flex items-center justify-center gap-2 rounded-md bg-[#c9ff3c] px-4 py-2 font-medium text-black"
                onClick={() => reset()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh Page</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Error Code: {error.digest}
          </motion.div>
        </div>
      </body>
    </html>
  );
}
