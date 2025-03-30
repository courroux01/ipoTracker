'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

// Custom hook to provide responsive animation variants
export function useAnimationVariants() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [variants, setVariants] = useState({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.03 : 0.08, // Faster on mobile
          delayChildren: isMobile ? 0.1 : 0.2, // Shorter delay on mobile
        },
      },
    },
    item: {
      hidden: { y: isMobile ? 10 : 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: isMobile ? 200 : 300,
          damping: 24,
        },
      },
    },
  });

  // Update variants when screen size changes
  useEffect(() => {
    setVariants({
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: isMobile ? 0.03 : 0.08,
            delayChildren: isMobile ? 0.1 : 0.2,
          },
        },
      },
      item: {
        hidden: { y: isMobile ? 10 : 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: isMobile ? 200 : 300,
            damping: 24,
          },
        },
      },
    });
  }, [isMobile]);

  return variants;
}
