'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingScreenProps {
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Description text */
  description?: string;
  /** Icon to display when loading */
  loadingIcon?: LucideIcon;
  /** Icon to display when complete */
  completeIcon?: LucideIcon;
  /** Loading duration in milliseconds (if known) */
  duration?: number;
  /** Whether to auto-complete after duration */
  autoComplete?: boolean;
  /** Whether loading is complete (controlled mode) */
  isComplete?: boolean;
  /** Callback when loading completes */
  onComplete?: () => void;
  /** Custom class for the container */
  className?: string;
  /** Custom class for the content wrapper */
  contentClassName?: string;
  /** Custom class for the icon wrapper */
  iconClassName?: string;
  /** Custom class for the spinner wrapper */
  spinnerClassName?: string;
  /** Custom class for the title */
  titleClassName?: string;
  /** Custom class for the subtitle */
  subtitleClassName?: string;
  /** Custom class for the description */
  descriptionClassName?: string;
  /** Custom class for the status text */
  statusClassName?: string;
}

export default function LoadingScreen({
  title = 'Loading',
  subtitle,
  description = 'Please wait while we prepare your content...',
  loadingIcon: LoadingIcon = Loader2,
  completeIcon: CompleteIcon = CheckCircle,
  duration = 3000,
  autoComplete = true,
  isComplete: controlledComplete,
  onComplete,
  className,
  contentClassName,
  iconClassName,
  spinnerClassName,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  statusClassName,
}: LoadingScreenProps) {
  // Use controlled or uncontrolled completion state
  const [internalComplete, setInternalComplete] = useState(false);
  const isComplete =
    controlledComplete !== undefined ? controlledComplete : internalComplete;

  // Reference for cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isComplete || !autoComplete) return;

    // Set timeout for auto-completion
    timeoutRef.current = setTimeout(() => {
      setInternalComplete(true);
      if (onComplete) onComplete();
    }, duration);

    // Cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, autoComplete, isComplete, onComplete]);

  return (
    <div
      className={cn(
        'from-background to-muted/30 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4',
        className,
      )}
    >
      <Card
        className={cn(
          'w-full max-w-md border-none bg-transparent shadow-none',
          contentClassName,
        )}
      >
        <CardContent className="space-y-8 p-0 text-center">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <div className="relative mx-auto">
                {/* Main icon */}
                <motion.div
                  key="loading-icon"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className={cn(
                    'bg-muted relative z-10 mx-auto inline-flex rounded-full p-6 shadow-lg',
                    iconClassName,
                  )}
                >
                  <LoadingIcon className="text-primary h-16 w-16" />
                </motion.div>

                {/* Spinner ring */}
                <motion.div
                  key="spinner-ring"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn('absolute inset-0 z-0', spinnerClassName)}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: 'linear',
                    }}
                    className="h-full w-full"
                  >
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-primary/20"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="200"
                        className="text-primary"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                key="complete"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className={cn(
                  'bg-muted mx-auto inline-flex rounded-full p-6 shadow-lg',
                  iconClassName,
                )}
              >
                <CompleteIcon className="text-primary h-16 w-16" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={cn(
                'text-4xl font-bold tracking-tight',
                titleClassName,
              )}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.h2
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={cn('text-2xl font-semibold', subtitleClassName)}
              >
                {subtitle}
              </motion.h2>
            )}
          </div>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={cn('text-muted-foreground', descriptionClassName)}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn('text-primary font-medium', statusClassName)}
                >
                  Complete!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
