/**
 * This file handles Clerk webhook events to sync user data with our database
 */

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Get the webhook signature from the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // Validate headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Error: Missing svix headers', { svix_id, svix_timestamp });
      return NextResponse.json(
        { error: 'Missing svix headers' },
        { status: 400 },
      );
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Validate webhook secret
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error('Error: Missing CLERK_WEBHOOK_SECRET environment variable');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the webhook
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return NextResponse.json(
        { error: 'Error verifying webhook' },
        { status: 400 },
      );
    }

    // Handle the webhook event
    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, ...userData } = evt.data;

      if (!id) {
        return NextResponse.json(
          { error: 'Missing user ID in webhook data' },
          { status: 400 },
        );
      }

      // Get the primary email
      const primaryEmail = email_addresses.find(
        (email: any) => email.id === userData.primary_email_address_id,
      );

      if (!primaryEmail) {
        return NextResponse.json(
          { error: 'No primary email found' },
          { status: 400 },
        );
      }

      try {
        // Create or update the user in our database
        await prisma.user.upsert({
          where: { id: id as string },
          update: {
            email: primaryEmail.email_address,
          },
          create: {
            id: id as string,
            email: primaryEmail.email_address,
            // Create default notification preferences
            notificationPrefs: {
              create: {
                emailNotifications: true,
                pushNotifications: false,
                ipoReminders: true,
                marketUpdates: true,
                portfolioAlerts: true,
              },
            },
          },
        });

        return NextResponse.json(
          { success: true, event: eventType },
          { status: 200 },
        );
      } catch (error) {
        console.error('Error syncing user to database:', error);
        return NextResponse.json(
          { error: 'Error syncing user to database' },
          { status: 500 },
        );
      }
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      if (!id) {
        return NextResponse.json(
          { error: 'Missing user ID in webhook data' },
          { status: 400 },
        );
      }

      try {
        // Delete the user from our database
        // Note: With proper cascading deletes in Prisma schema, this will also delete related records
        await prisma.user.delete({
          where: { id: id as string },
        });

        return NextResponse.json(
          { success: true, event: eventType },
          { status: 200 },
        );
      } catch (error) {
        console.error('Error deleting user from database:', error);
        return NextResponse.json(
          { error: 'Error deleting user from database' },
          { status: 500 },
        );
      }
    }

    // Return a 200 response for other event types
    return NextResponse.json(
      { success: true, event: eventType },
      { status: 200 },
    );
  } catch (error) {
    console.error('Unexpected error in webhook handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
