/**
 * This file contains type definitions that mirror the Prisma schema
 * for use throughout the application.
 */

import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

// Profile schema
export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']).nullable(),
  investmentHorizon: z
    .enum(['Less than 5 years', '5-10 years', '10+ years'])
    .nullable(),
  incomeBracket: z
    .enum([
      'Under $50,000',
      '$50,000 - $100,000',
      '$100,000 - $200,000',
      '$200,000+',
    ])
    .nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Profile = z.infer<typeof profileSchema>;

// IPO schema
export const ipoSchema = z.object({
  id: z.string(),
  ticker: z.string(),
  name: z.string(),
  sector: z.string(),
  expectedDate: z.date(),
  expectedPriceMin: z.number().positive(),
  expectedPriceMax: z.number().positive(),
  description: z.string(),
  logo: z.string().nullable(),
  valuation: z.number().positive().nullable(),
  foundedYear: z.number().int().positive().nullable(),
  headquarters: z.string().nullable(),
  ceo: z.string().nullable(),
  employees: z.number().int().positive().nullable(),
  revenue: z.number().positive().nullable(),
  website: z.string().nullable(),
  competitors: z.array(z.string()),
  riskFactors: z.array(z.string()),
  useOfProceeds: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Ipo = z.infer<typeof ipoSchema>;

// UserInterestedIpo schema
export const userInterestedIpoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  ipoId: z.string(),
  interested: z.boolean(),
  investmentShares: z.number().int().positive().nullable(),
  investmentAmount: z.number().positive().nullable(),
  notifyOnDate: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserInterestedIpo = z.infer<typeof userInterestedIpoSchema>;

// Transaction schema
export const transactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  ipoId: z.string().nullable(),
  type: z.enum(['interest', 'investment', 'notification']),
  action: z.string(),
  details: z.string(),
  amount: z.number().nullable(),
  shares: z.number().int().positive().nullable(),
  createdAt: z.date(),
});

export type Transaction = z.infer<typeof transactionSchema>;

// NotificationPrefs schema
export const notificationPrefsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  ipoReminders: z.boolean(),
  marketUpdates: z.boolean(),
  portfolioAlerts: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NotificationPrefs = z.infer<typeof notificationPrefsSchema>;
