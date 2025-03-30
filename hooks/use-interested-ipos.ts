'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IPO } from '@/hooks/use-ipos';

// Type for interested IPO with additional fields
export interface InterestedIPO extends IPO {
  interested: boolean;
  investment?: {
    shares?: number;
    amount?: number;
  };
  notifyOnDate?: boolean;
}

// Simulate database operations with localStorage
const STORAGE_KEY = 'interested-ipos';

// Load interested IPOs from localStorage
const loadInterestedIPOs = (): Record<string, InterestedIPO> => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load interested IPOs:', error);
    return {};
  }
};

// Save interested IPOs to localStorage
const saveInterestedIPOs = (data: Record<string, InterestedIPO>) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save interested IPOs:', error);
  }
};

// Fetch interested IPOs (simulating API call)
const fetchInterestedIPOs = async (): Promise<
  Record<string, InterestedIPO>
> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return loadInterestedIPOs();
};

// Toggle interest in an IPO
const toggleInterest = async (
  ipoId: string,
  interestedIPOs: Record<string, InterestedIPO>,
  ipo: IPO,
): Promise<Record<string, InterestedIPO>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newInterestedIPOs = { ...interestedIPOs };

  if (newInterestedIPOs[ipoId]) {
    // If already interested, toggle the flag
    newInterestedIPOs[ipoId] = {
      ...newInterestedIPOs[ipoId],
      interested: !newInterestedIPOs[ipoId].interested,
    };

    // If no longer interested, consider removing it completely
    if (!newInterestedIPOs[ipoId].interested) {
      delete newInterestedIPOs[ipoId];
    }
  } else {
    // If not already tracked, add it with interested=true
    newInterestedIPOs[ipoId] = {
      ...ipo,
      interested: true,
    };
  }

  saveInterestedIPOs(newInterestedIPOs);
  return newInterestedIPOs;
};

// Mark multiple IPOs as interested
const markMultipleAsInterested = async (
  ipos: IPO[],
  interestedIPOs: Record<string, InterestedIPO>,
): Promise<Record<string, InterestedIPO>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newInterestedIPOs = { ...interestedIPOs };

  ipos.forEach((ipo) => {
    if (newInterestedIPOs[ipo.id]) {
      // Update existing entry
      newInterestedIPOs[ipo.id] = {
        ...newInterestedIPOs[ipo.id],
        ...ipo,
        interested: true,
      };
    } else {
      // Create new entry
      newInterestedIPOs[ipo.id] = {
        ...ipo,
        interested: true,
      };
    }
  });

  saveInterestedIPOs(newInterestedIPOs);
  return newInterestedIPOs;
};

// Update investment details
const updateInvestment = async (
  ipoId: string,
  investment: { shares?: number; amount?: number },
  interestedIPOs: Record<string, InterestedIPO>,
): Promise<Record<string, InterestedIPO>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newInterestedIPOs = { ...interestedIPOs };

  if (newInterestedIPOs[ipoId]) {
    newInterestedIPOs[ipoId] = {
      ...newInterestedIPOs[ipoId],
      investment,
    };
  }

  saveInterestedIPOs(newInterestedIPOs);
  return newInterestedIPOs;
};

// Toggle notification setting
const toggleNotification = async (
  ipoId: string,
  interestedIPOs: Record<string, InterestedIPO>,
): Promise<Record<string, InterestedIPO>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newInterestedIPOs = { ...interestedIPOs };

  if (newInterestedIPOs[ipoId]) {
    newInterestedIPOs[ipoId] = {
      ...newInterestedIPOs[ipoId],
      notifyOnDate: !newInterestedIPOs[ipoId].notifyOnDate,
    };
  }

  saveInterestedIPOs(newInterestedIPOs);
  return newInterestedIPOs;
};

// Hook to access and manipulate interested IPOs
export function useInterestedIPOs() {
  const queryClient = useQueryClient();

  // Query to fetch interested IPOs
  const {
    data: interestedIPOs = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['interested-ipos'],
    queryFn: fetchInterestedIPOs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation to toggle interest
  const toggleInterestMutation = useMutation({
    mutationFn: ({ ipoId, ipo }: { ipoId: string; ipo: IPO }) =>
      toggleInterest(ipoId, interestedIPOs, ipo),
    onSuccess: (data) => {
      queryClient.setQueryData(['interested-ipos'], data);
    },
  });

  // Mutation to mark multiple IPOs as interested
  const markMultipleAsInterestedMutation = useMutation({
    mutationFn: (ipos: IPO[]) => markMultipleAsInterested(ipos, interestedIPOs),
    onSuccess: (data) => {
      queryClient.setQueryData(['interested-ipos'], data);
    },
  });

  // Mutation to update investment details
  const updateInvestmentMutation = useMutation({
    mutationFn: ({
      ipoId,
      investment,
    }: {
      ipoId: string;
      investment: { shares?: number; amount?: number };
    }) => updateInvestment(ipoId, investment, interestedIPOs),
    onSuccess: (data) => {
      queryClient.setQueryData(['interested-ipos'], data);
    },
  });

  // Mutation to toggle notification setting
  const toggleNotificationMutation = useMutation({
    mutationFn: (ipoId: string) => toggleNotification(ipoId, interestedIPOs),
    onSuccess: (data) => {
      queryClient.setQueryData(['interested-ipos'], data);
    },
  });

  // Check if an IPO is marked as interested
  const isInterested = (ipoId: string): boolean => {
    return !!interestedIPOs[ipoId]?.interested;
  };

  // Get all interested IPOs as an array
  const getInterestedIPOsArray = (): InterestedIPO[] => {
    return Object.values(interestedIPOs).filter((ipo) => ipo.interested);
  };

  // Get past interested IPOs (before today)
  const getPastInterestedIPOs = (): InterestedIPO[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

    return getInterestedIPOsArray().filter((ipo) => {
      const ipoDate = new Date(ipo.expectedDate);
      // Ensure proper date comparison by resetting the time
      ipoDate.setHours(0, 0, 0, 0);
      return ipoDate < today;
    });
  };

  // Get future interested IPOs (today and after)
  const getFutureInterestedIPOs = (): InterestedIPO[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

    return getInterestedIPOsArray().filter((ipo) => {
      const ipoDate = new Date(ipo.expectedDate);
      // Ensure proper date comparison by resetting the time
      ipoDate.setHours(0, 0, 0, 0);
      return ipoDate >= today;
    });
  };

  // Calculate total investment value
  const calculateTotalInvestment = (): number => {
    return getPastInterestedIPOs().reduce((total, ipo) => {
      if (!ipo.investment) return total;

      // If shares are provided, calculate based on expected price (mid-range)
      if (ipo.investment.shares) {
        const priceRange = ipo.expectedPrice
          .replace(/[^0-9.-]+/g, ' ')
          .trim()
          .split(' ');
        const avgPrice =
          priceRange.reduce((sum, price) => sum + Number.parseFloat(price), 0) /
          priceRange.length;
        return total + ipo.investment.shares * avgPrice;
      }

      // If amount is provided, use that directly
      if (ipo.investment.amount) {
        return total + ipo.investment.amount;
      }

      return total;
    }, 0);
  };

  return {
    interestedIPOs,
    isLoading,
    error,
    isInterested,
    toggleInterest: (ipoId: string, ipo: IPO) =>
      toggleInterestMutation.mutate({ ipoId, ipo }),
    markMultipleAsInterested: (ipos: IPO[]) =>
      markMultipleAsInterestedMutation.mutate(ipos),
    updateInvestment: (
      ipoId: string,
      investment: { shares?: number; amount?: number },
    ) => updateInvestmentMutation.mutate({ ipoId, investment }),
    toggleNotification: (ipoId: string) =>
      toggleNotificationMutation.mutate(ipoId),
    getInterestedIPOsArray,
    getPastInterestedIPOs,
    getFutureInterestedIPOs,
    calculateTotalInvestment,
    isToggling: toggleInterestMutation.isPending,
    isMarkingMultiple: markMultipleAsInterestedMutation.isPending,
    isUpdatingInvestment: updateInvestmentMutation.isPending,
    isTogglingNotification: toggleNotificationMutation.isPending,
  };
}
