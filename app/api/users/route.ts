// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { clerkId, email } = req.body;

  if (!clerkId || !email) {
    return res.status(400).json({ error: 'Missing clerkId or email' });
  }

  try {
    // Upsert the user: if the user exists, update the email; if not, create
    // the User record along with default Profile and NotificationPrefs.
    const user = await prisma.user.upsert({
      where: { id: clerkId },
      update: { email },
      create: {
        id: clerkId,
        email,
        // The nested create automatically sets the foreign key "userId" to "clerkId"
        profile: {
          create: {
            riskTolerance: 'Moderate', // default value
            investmentHorizon: '5-10 years', // default value
            incomeBracket: 'Medium', // default value
          },
        },
        notificationPrefs: {
          create: {
            emailNotifications: true,
            pushNotifications: false,
            ipoReminders: true,
            marketUpdates: true,
            portfolioAlerts: true,
          },
        },
        // interestedIpos and transactions will be empty arrays by default.
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error upserting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
