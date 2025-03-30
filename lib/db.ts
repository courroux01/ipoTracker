/**
 * This file provides a centralized interface for database operations
 * using Prisma and Zod for validation.
 */

import { PrismaClient } from '@prisma/client';
import type { z } from 'zod';
import {
  profileUpdateSchema,
  notificationPrefsUpdateSchema,
  ipoInterestSchema,
  ipoInvestmentSchema,
  ipoNotificationSchema,
} from '@/types/forms';

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Get user by Clerk ID
 * @param userId - Clerk user ID
 */
export async function getUserById(userId: string) {
  if (!userId) throw new Error('User ID is required');

  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      notificationPrefs: true,
    },
  });
}

/**
 * Create or update user profile
 * @param userId - Clerk user ID
 * @param data - Profile data to update
 */
export async function upsertProfile(
  userId: string,
  data: z.infer<typeof profileUpdateSchema>,
) {
  if (!userId) throw new Error('User ID is required');

  // Validate data
  const validatedData = profileUpdateSchema.parse(data);

  return await prisma.profile.upsert({
    where: { userId },
    update: validatedData,
    create: {
      userId,
      ...validatedData,
    },
  });
}

/**
 * Update notification preferences
 * @param userId - Clerk user ID
 * @param data - Notification preferences data
 */
export async function updateNotificationPrefs(
  userId: string,
  data: z.infer<typeof notificationPrefsUpdateSchema>,
) {
  if (!userId) throw new Error('User ID is required');

  // Validate data
  const validatedData = notificationPrefsUpdateSchema.parse(data);

  return await prisma.notificationPrefs.upsert({
    where: { userId },
    update: validatedData,
    create: {
      userId,
      ...validatedData,
    },
  });
}

/**
 * Get all IPOs
 * @param filters - Optional filters for IPOs
 */
export async function getIpos(filters?: {
  sector?: string;
  expectedDateStart?: Date;
  expectedDateEnd?: Date;
  search?: string;
}) {
  const where: any = {};

  if (filters?.sector && filters.sector !== 'All') {
    where.sector = filters.sector;
  }

  if (filters?.expectedDateStart && filters?.expectedDateEnd) {
    where.expectedDate = {
      gte: filters.expectedDateStart,
      lte: filters.expectedDateEnd,
    };
  }

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { ticker: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return await prisma.ipo.findMany({
    where,
    orderBy: { expectedDate: 'asc' },
  });
}

/**
 * Get IPO by ID
 * @param ipoId - IPO ID
 */
export async function getIpoById(ipoId: string) {
  if (!ipoId) throw new Error('IPO ID is required');

  return await prisma.ipo.findUnique({
    where: { id: ipoId },
  });
}

/**
 * Toggle interest in an IPO
 * @param data - IPO interest data
 * @param userId - Clerk user ID
 */
export async function toggleIpoInterest(
  data: z.infer<typeof ipoInterestSchema>,
  userId: string,
) {
  if (!userId) throw new Error('User ID is required');

  // Validate data
  const validatedData = ipoInterestSchema.parse(data);

  // Get the IPO to include in transaction
  const ipo = await prisma.ipo.findUnique({
    where: { id: validatedData.ipoId },
    select: { name: true, ticker: true },
  });

  if (!ipo) throw new Error('IPO not found');

  // Use a transaction to ensure data consistency
  try {
    return await prisma.$transaction(async (tx) => {
      // Update or create the user-ipo relationship
      const userIpo = await tx.userInterestedIpo.upsert({
        where: {
          userId_ipoId: {
            userId,
            ipoId: validatedData.ipoId,
          },
        },
        update: {
          interested: validatedData.interested,
        },
        create: {
          userId,
          ipoId: validatedData.ipoId,
          interested: validatedData.interested,
        },
      });

      // Create a transaction record
      await tx.transaction.create({
        data: {
          userId,
          ipoId: validatedData.ipoId,
          type: 'interest',
          action: validatedData.interested
            ? 'Marked Interest'
            : 'Removed Interest',
          details: validatedData.interested
            ? `Marked interest in ${ipo.name} (${ipo.ticker}) IPO`
            : `Removed interest in ${ipo.name} (${ipo.ticker}) IPO`,
        },
      });

      return userIpo;
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new Error(
      `Failed to toggle IPO interest: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Update IPO investment
 * @param data - IPO investment data
 * @param userId - Clerk user ID
 */
export async function updateIpoInvestment(
  data: z.infer<typeof ipoInvestmentSchema>,
  userId: string,
) {
  if (!userId) throw new Error('User ID is required');

  // Validate data
  const validatedData = ipoInvestmentSchema.parse(data);

  // Get the IPO to include in transaction
  const ipo = await prisma.ipo.findUnique({
    where: { id: validatedData.ipoId },
    select: { name: true, ticker: true },
  });

  if (!ipo) throw new Error('IPO not found');

  // Use a transaction to ensure data consistency
  return await prisma.$transaction(async (tx) => {
    // Update the user-ipo relationship
    const userIpo = await tx.userInterestedIpo.update({
      where: {
        userId_ipoId: {
          userId,
          ipoId: validatedData.ipoId,
        },
      },
      data: {
        investmentShares:
          validatedData.investmentType === 'shares'
            ? validatedData.shares
            : null,
        investmentAmount:
          validatedData.investmentType === 'amount'
            ? validatedData.amount
            : null,
      },
    });

    // Create a transaction record
    await tx.transaction.create({
      data: {
        userId,
        ipoId: validatedData.ipoId,
        type: 'investment',
        action: 'Updated Investment',
        details: `Updated investment in ${ipo.name} (${ipo.ticker}) IPO`,
        shares:
          validatedData.investmentType === 'shares'
            ? validatedData.shares
            : null,
        amount:
          validatedData.investmentType === 'amount'
            ? validatedData.amount
            : null,
      },
    });

    return userIpo;
  });
}

/**
 * Toggle IPO notification
 * @param data - IPO notification data
 * @param userId - Clerk user ID
 */
export async function toggleIpoNotification(
  data: z.infer<typeof ipoNotificationSchema>,
  userId: string,
) {
  if (!userId) throw new Error('User ID is required');

  // Validate data
  const validatedData = ipoNotificationSchema.parse(data);

  // Get the IPO to include in transaction
  const ipo = await prisma.ipo.findUnique({
    where: { id: validatedData.ipoId },
    select: { name: true, ticker: true, expectedDate: true },
  });

  if (!ipo) throw new Error('IPO not found');

  // Use a transaction to ensure data consistency
  return await prisma.$transaction(async (tx) => {
    // Update the user-ipo relationship
    const userIpo = await tx.userInterestedIpo.update({
      where: {
        userId_ipoId: {
          userId,
          ipoId: validatedData.ipoId,
        },
      },
      data: {
        notifyOnDate: validatedData.notifyOnDate,
      },
    });

    // Create a transaction record
    await tx.transaction.create({
      data: {
        userId,
        ipoId: validatedData.ipoId,
        type: 'notification',
        action: validatedData.notifyOnDate
          ? 'Enabled Notification'
          : 'Disabled Notification',
        details: validatedData.notifyOnDate
          ? `Enabled notification for ${ipo.name} (${ipo.ticker}) IPO on ${ipo.expectedDate.toLocaleDateString()}`
          : `Disabled notification for ${ipo.name} (${ipo.ticker}) IPO`,
      },
    });

    return userIpo;
  });
}

/**
 * Get user's interested IPOs
 * @param userId - Clerk user ID
 */
export async function getUserInterestedIpos(userId: string) {
  if (!userId) throw new Error('User ID is required');

  return await prisma.userInterestedIpo.findMany({
    where: {
      userId,
      interested: true,
    },
    include: {
      ipo: true,
    },
    orderBy: {
      ipo: {
        expectedDate: 'asc',
      },
    },
  });
}

/**
 * Get user's transaction history
 * @param userId - Clerk user ID
 * @param filters - Optional filters for transactions
 */
export async function getUserTransactions(
  userId: string,
  filters?: {
    type?: 'interest' | 'investment' | 'notification' | 'all';
    search?: string;
  },
) {
  if (!userId) throw new Error('User ID is required');

  const where: any = { userId };

  if (filters?.type && filters.type !== 'all') {
    where.type = filters.type;
  }

  if (filters?.search) {
    where.OR = [
      { action: { contains: filters.search, mode: 'insensitive' } },
      { details: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return await prisma.transaction.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}
