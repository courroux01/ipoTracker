/**
 * This file contains Zod schemas for form validation
 * throughout the application.
 */

import { z } from 'zod';

// Profile update form schema
export const profileUpdateSchema = z.object({
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']),
  investmentHorizon: z.enum(['Less than 5 years', '5-10 years', '10+ years']),
  incomeBracket: z.enum([
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $200,000',
    '$200,000+',
  ]),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

// Notification preferences update form schema
export const notificationPrefsUpdateSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  ipoReminders: z.boolean(),
  marketUpdates: z.boolean(),
  portfolioAlerts: z.boolean(),
});

export type NotificationPrefsUpdateFormData = z.infer<
  typeof notificationPrefsUpdateSchema
>;

// IPO interest form schema
export const ipoInterestSchema = z.object({
  ipoId: z.string(),
  interested: z.boolean(),
});

export type IpoInterestFormData = z.infer<typeof ipoInterestSchema>;

// IPO investment form schema
export const ipoInvestmentSchema = z
  .object({
    ipoId: z.string(),
    investmentType: z.enum(['shares', 'amount']),
    shares: z.number().int().positive().optional(),
    amount: z.number().positive().optional(),
  })
  .refine(
    (data) => {
      if (data.investmentType === 'shares') {
        return data.shares !== undefined;
      } else {
        return data.amount !== undefined;
      }
    },
    {
      message: 'Must provide either shares or amount based on investment type',
      path: ['shares', 'amount'],
    },
  );

export type IpoInvestmentFormData = z.infer<typeof ipoInvestmentSchema>;

// IPO notification form schema
export const ipoNotificationSchema = z.object({
  ipoId: z.string(),
  notifyOnDate: z.boolean(),
});

export type IpoNotificationFormData = z.infer<typeof ipoNotificationSchema>;
