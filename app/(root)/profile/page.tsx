'use client';

import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { CardGrid } from '@/components/ui/card-grid';
import { ProfileForm } from '@/components/profile/profile-form';
import { NotificationSettings } from '@/components/profile/notification-settings';
import { itemVariants } from '@/lib/animation-variants';
import { UserButton } from '@clerk/nextjs';
import { useAppUser } from '@/providers/UserProvider';

export default function ProfilePage() {
  const { user, isLoading } = useAppUser();

  // For display purposes, we use the user's email as display name.
  const displayName = user?.email || 'User';
  const memberSince = user
    ? new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Loading...';

  return (
    <PageLayout
      title="Profile"
      description="Manage your account settings and preferences"
    >
      <CardGrid columns={2}>
        {/* Account Summary Card */}
        <motion.div className="lg:col-span-1" variants={itemVariants}>
          <SectionContainer>
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-800 dark:bg-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                {isLoading ? (
                  <UserIcon className="h-12 w-12 text-white" />
                ) : (
                  <UserButton />
                )}
              </motion.div>

              <motion.h2
                className="text-xl font-semibold text-gray-900 dark:text-white"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {!isLoading ? displayName : 'Loading...'}
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-400">
                {!isLoading ? user?.email || 'No email' : 'Loading...'}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <motion.div
                  className="rounded-full bg-[#c9ff3c]/10 px-3 py-1 text-xs text-[#c9ff3c]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  WealthPulse Member
                </motion.div>
                <motion.div
                  className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Verified
                </motion.div>
              </div>
            </motion.div>

            <div className="mt-8 border-t pt-6">
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                Account Summary
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: 'Member Since',
                    value: memberSince,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 2 }}
                  >
                    <span className="text-gray-500 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </motion.div>

        {/* Account Settings Card */}
        <motion.div
          className="lg:col-span-1"
          variants={itemVariants}
          transition={{ delay: 0.3 }}
        >
          <SectionContainer title="Financial Profile">
            <ProfileForm />
          </SectionContainer>
        </motion.div>
      </CardGrid>

      <SectionContainer title="Notification Settings">
        <NotificationSettings />
      </SectionContainer>
    </PageLayout>
  );
}
