/**
 * Server actions for database operations
 */

'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  profileUpdateSchema,
  notificationPrefsUpdateSchema,
  type ipoInterestSchema,
  type ipoInvestmentSchema,
  type ipoNotificationSchema,
} from '@/types/forms';
import {
  upsertProfile,
  updateNotificationPrefs,
  toggleIpoInterest,
  updateIpoInvestment,
  toggleIpoNotification,
} from '@/lib/db';

/**
 * Update user profile
 * @param data - Profile data to update
 */
export async function updateProfile(data: z.infer<typeof profileUpdateSchema>) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    // Validate data
    const validatedData = profileUpdateSchema.parse(data);

    // Update profile
    const profile = await upsertProfile(userId, validatedData);

    // Revalidate
    revalidatePath('/profile');

    return { success: true, profile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }

    console.error('Error updating profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

/**
 * Update notification preferences
 * @param data - Notification preferences data
 */
export async function updateNotificationPreferences(
  data: z.infer<typeof notificationPrefsUpdateSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    // Validate data
    const validatedData = notificationPrefsUpdateSchema.parse(data);

    // Update notification preferences
    const notificationPrefs = await updateNotificationPrefs(
      userId,
      validatedData,
    );

    // Revalidate
    revalidatePath('/profile');

    return { success: true, notificationPrefs };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }

    console.error('Error updating notification preferences:', error);
    return {
      success: false,
      error: 'Failed to update notification preferences',
    };
  }
}

/**
 * Toggle interest in an IPO
 * @param data - IPO interest data
 */
export async function toggleInterest(data: z.infer<typeof ipoInterestSchema>) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    // Toggle interest
    await toggleIpoInterest(data, userId);

    // Revalidate
    revalidatePath('/upcoming');
    revalidatePath('/ongoing');
    revalidatePath('/history');

    return { success: true };
  } catch (error) {
    console.error('Error toggling interest:', error);
    return { success: false, error: 'Failed to toggle interest' };
  }
}

/**
 * Update IPO investment
 * @param data - IPO investment data
 */
export async function updateInvestment(
  data: z.infer<typeof ipoInvestmentSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    // Update investment
    await updateIpoInvestment(data, userId);

    // Revalidate
    revalidatePath('/ongoing');
    revalidatePath('/history');

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }

    console.error('Error updating investment:', error);
    return { success: false, error: 'Failed to update investment' };
  }
}

/**
 * Toggle IPO notification
 * @param data - IPO notification data
 */
export async function toggleNotification(
  data: z.infer<typeof ipoNotificationSchema>,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    // Toggle notification
    await toggleIpoNotification(data, userId);

    // Revalidate
    revalidatePath('/ongoing');
    revalidatePath('/history');

    return { success: true };
  } catch (error) {
    console.error('Error toggling notification:', error);
    return { success: false, error: 'Failed to toggle notification' };
  }
}
