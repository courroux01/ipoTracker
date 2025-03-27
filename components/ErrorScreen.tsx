'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, animate } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorScreenProps {
  /** Title text (e.g. "404") */
  title?: string;
  /** Subtitle text (e.g. "Page Not Found") */
  subtitle?: string;
  /** Description text */
  description?: string;
  /** Icon to display */
  icon?: LucideIcon;
  /** Path to redirect to */
  redirectPath?: string;
  /** Delay before redirecting in milliseconds */
  redirectDelay?: number;
  /** Text for the primary action button */
  primaryButtonText?: string;
  /** Text for the cancel button */
  cancelButtonText?: string;
  /** Whether to show the progress bar */
  showProgress?: boolean;
  /** Custom class for the container */
  className?: string;
  /** Custom class for the content wrapper */
  contentClassName?: string;
  /** Custom class for the icon wrapper */
  iconClassName?: string;
  /** Custom class for the title */
  titleClassName?: string;
  /** Custom class for the subtitle */
  subtitleClassName?: string;
  /** Custom class for the description */
  descriptionClassName?: string;
  /** Custom class for the progress container */
  progressClassName?: string;
  /** Custom class for the buttons container */
  buttonsClassName?: string;
  /** Custom class for the primary button */
  primaryButtonClassName?: string;
  /** Custom class for the cancel button */
  cancelButtonClassName?: string;
  /** Callback when redirection is canceled */
  onCancel?: () => void;
  /** Callback when primary button is clicked */
  onPrimaryAction?: () => void;
}

export default function ErrorScreen({
  title = '404',
  subtitle = 'Page Not Found',
  description = "The page you're looking for doesn't exist or has been moved.",
  icon: Icon = AlertCircle,
  redirectPath = '/',
  redirectDelay = 3000,
  primaryButtonText = 'Go Home Now',
  cancelButtonText = 'Stay Here',
  showProgress = true,
  className,
  contentClassName,
  iconClassName,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  progressClassName,
  buttonsClassName,
  primaryButtonClassName,
  cancelButtonClassName,
  onCancel,
  onPrimaryAction,
}: ErrorScreenProps) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.ceil(redirectDelay / 1000),
  );

  // Use a spring for smooth animation but with controlled progress
  const progress = useSpring(0, {
    stiffness: 60,
    damping: 15,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!isRedirecting) return;

    const startTime = Date.now();

    // Create a controlled animation that will complete exactly at redirectDelay
    const controls = animate(0, 100, {
      duration: redirectDelay / 1000, // Convert to seconds for Framer
      ease: 'linear', // Linear easing ensures consistent progress
      onUpdate: (value) => {
        // Update the spring with the current linear progress value
        progress.set(value);

        // Calculate remaining time based on actual elapsed time
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(
          Math.ceil((redirectDelay - elapsed) / 1000),
          0,
        );
        setRemainingSeconds(remaining);
      },
      onComplete: () => {
        // Ensure we reach exactly 100% at the end
        progress.set(100);
        setRemainingSeconds(0);
      },
    });

    // Set up redirect timeout - use the same duration as the animation
    timeoutRef.current = setTimeout(() => {
      router.push(redirectPath);
    }, redirectDelay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      controls.stop(); // Stop the animation
    };
  }, [isRedirecting, redirectDelay, redirectPath, router, progress]);

  // Cancel redirection
  const cancelRedirect = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsRedirecting(false);
    progress.set(0);
    if (onCancel) onCancel();
  };

  // Handle primary action
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      router.push(redirectPath);
    }
  };

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
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
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
            <Icon className="text-primary h-16 w-16" />
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={cn(
                'text-5xl font-bold tracking-tight',
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
              {showProgress && isRedirecting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={cn('space-y-2', progressClassName)}
                >
                  <motion.p
                    className="text-muted-foreground text-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: 'easeInOut',
                    }}
                  >
                    Redirecting to home in {remainingSeconds} second
                    {remainingSeconds !== 1 ? 's' : ''}
                  </motion.p>

                  <div className="bg-muted/50 relative h-2 overflow-hidden rounded-full">
                    <motion.div
                      className="bg-primary absolute inset-y-0 left-0 origin-left rounded-full"
                      style={{ width: `${progress.get()}%` }}
                      transition={{ type: 'spring' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={cn(
                'flex flex-col justify-center gap-3 sm:flex-row',
                buttonsClassName,
              )}
            >
              <Button
                onClick={handlePrimaryAction}
                variant="default"
                className={cn(
                  'shadow-md transition-all hover:shadow-lg',
                  primaryButtonClassName,
                )}
                size="lg"
              >
                {primaryButtonText}
              </Button>

              {isRedirecting && (
                <Button
                  onClick={cancelRedirect}
                  variant="outline"
                  className={cn(
                    'hover:bg-background/80 border-2 transition-all',
                    cancelButtonClassName,
                  )}
                  size="lg"
                >
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
