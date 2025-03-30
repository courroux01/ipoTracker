/**
 * Hook for managing user profile data
 */

'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import type { z } from 'zod';
import type {
  profileUpdateSchema,
  notificationPrefsUpdateSchema,
} from '@/types/forms';
import { updateProfile, updateNotificationPreferences } from '@/lib/actions';

/**
 * Custom hook for managing user profile
 */
export function useProfile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile data
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch('/api/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    },
    enabled: isLoaded && isSignedIn,
  });

  // Fetch notification preferences
  const {
    data: notificationData,
    isLoading: isLoadingNotifications,
    error: notificationError,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await fetch('/api/notifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notification preferences');
      }
      return response.json();
    },
    enabled: isLoaded && isSignedIn,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: z.infer<typeof profileUpdateSchema>) => {
      setIsSubmitting(true);
      try {
        const result = await updateProfile(data);
        return result;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      refetchProfile();
    },
  });

  // Update notification preferences mutation
  const updateNotificationsMutation = useMutation({
    mutationFn: async (data: z.infer<typeof notificationPrefsUpdateSchema>) => {
      setIsSubmitting(true);
      try {
        const result = await updateNotificationPreferences(data);
        return result;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      refetchNotifications();
    },
  });

  return {
    user,
    isLoaded,
    isSignedIn,
    profile: profileData?.profile,
    notificationPrefs: notificationData?.notificationPrefs,
    isLoadingProfile,
    isLoadingNotifications,
    isSubmitting,
    profileError,
    notificationError,
    updateProfile: updateProfileMutation.mutate,
    updateNotificationPrefs: updateNotificationsMutation.mutate,
  };
}
