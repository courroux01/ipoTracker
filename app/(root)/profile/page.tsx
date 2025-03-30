'use client';

import { motion } from 'framer-motion';
import { UserIcon, Shield, Calendar, Mail, AlertCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { CardGrid } from '@/components/ui/card-grid';
import { ProfileForm } from '@/components/profile/profile-form';
import { NotificationSettings } from '@/components/profile/notification-settings';
import { itemVariants } from '@/lib/animation-variants';
import { UserButton } from '@clerk/nextjs';
import { useAppUser } from '@/providers/UserProvider';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, isLoading } = useAppUser();
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Simulate error state for demonstration purposes
  useEffect(() => {
    // If we're still loading after 5 seconds, assume there's an error
    const timer = setTimeout(() => {
      if (isLoading && !user) {
        setHasError(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading, user]);

  // Placeholder data for when user data fails to load
  const placeholderUser = {
    email: 'investor@example.com',
    firstName: 'Alex',
    lastName: 'Morgan',
    memberSince: 'March 2023',
    investmentPreference: 'Moderate',
    riskTolerance: 'Medium',
    investmentHorizon: ['Retirement', 'Growth'],
    preferredSectors: ['Technology', 'Healthcare'],
  };

  // For display purposes, we use the user's email as display name.
  const displayName = !hasError
    ? user?.email?.split('@')[0] || 'User'
    : placeholderUser.firstName + ' ' + placeholderUser.lastName;

  const emailDisplay = !hasError
    ? user?.email || 'No email'
    : placeholderUser.email;

  const memberSince = !hasError
    ? user
      ? new Date().toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
      : 'Loading...'
    : placeholderUser.memberSince;

  // Handle retry
  const handleRetry = () => {
    setHasError(false);
    setRetryCount((prev) => prev + 1);
    // Simulate a new loading attempt
    setTimeout(() => {
      if (retryCount >= 2) {
        setHasError(true);
      }
    }, 2000);
  };

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
                className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full ${
                  hasError ? 'bg-red-900/20' : 'bg-[#1a1a1a]'
                } overflow-hidden`}
                whileHover={{ scale: 1.05 }}
              >
                {isLoading && !hasError ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <UserIcon className="h-12 w-12 text-gray-400" />
                  </motion.div>
                ) : hasError ? (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <AlertCircle className="h-12 w-12 text-red-400" />
                  </motion.div>
                ) : (
                  <UserButton />
                )}
              </motion.div>

              {isLoading && !hasError ? (
                <div className="space-y-2">
                  <motion.div
                    className="mx-auto h-6 w-32 rounded-md bg-gray-800"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  <motion.div
                    className="mx-auto h-4 w-48 rounded-md bg-gray-800"
                    animate={{
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: 0.2,
                    }}
                  />
                </div>
              ) : (
                <>
                  <motion.h2
                    className="text-xl font-semibold text-white"
                    animate={
                      hasError ? { x: [0, -5, 5, 0] } : { scale: [1, 1.03, 1] }
                    }
                    transition={
                      hasError
                        ? { duration: 0.5, delay: 0.3 }
                        : { duration: 2, repeat: Number.POSITIVE_INFINITY }
                    }
                  >
                    {displayName}
                  </motion.h2>
                  <div className="flex items-center justify-center gap-1 text-gray-400">
                    <Mail className="h-3 w-3" />
                    <p>{emailDisplay}</p>
                  </div>
                </>
              )}

              <div className="mt-4 flex items-center justify-center gap-2">
                {isLoading && !hasError ? (
                  <>
                    <motion.div
                      className="h-6 w-32 rounded-full bg-gray-800"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    />
                    <motion.div
                      className="h-6 w-24 rounded-full bg-gray-800"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 0.3,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <motion.div
                      className="flex items-center gap-1 rounded-full bg-[#c9ff3c]/10 px-3 py-1 text-xs text-[#c9ff3c]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Shield className="h-3 w-3" />
                      <span>WealthPulse Member</span>
                    </motion.div>
                    <motion.div
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                        hasError
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {hasError ? 'Limited Access' : 'Verified'}
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>

            <div className="mt-8 border-t border-gray-800 pt-6">
              <h3 className="mb-4 font-medium text-white">Account Summary</h3>
              <div className="space-y-3">
                {isLoading && !hasError
                  ? [1, 2, 3].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex justify-between"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: index * 0.2,
                        }}
                      >
                        <div className="h-4 w-24 rounded bg-gray-800" />
                        <div className="h-4 w-32 rounded bg-gray-800" />
                      </motion.div>
                    ))
                  : [
                      {
                        label: 'Member Since',
                        value: memberSince,
                        icon: <Calendar className="h-4 w-4 text-[#c9ff3c]" />,
                      },
                      {
                        label: 'Investment Preference',
                        value: hasError
                          ? placeholderUser.investmentPreference
                          : 'Not set',
                        icon: <Shield className="h-4 w-4 text-[#c9ff3c]" />,
                      },
                      {
                        label: 'Risk Tolerance',
                        value: hasError
                          ? placeholderUser.riskTolerance
                          : 'Not set',
                        icon: (
                          <AlertCircle className="h-4 w-4 text-[#c9ff3c]" />
                        ),
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ x: 2 }}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="text-gray-400">{item.label}</span>
                        </div>
                        <span className="font-medium text-white">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
              </div>

              {hasError && (
                <motion.div
                  className="mt-6 rounded-lg border border-red-800 bg-red-900/10 p-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-red-400">
                    We're having trouble loading your profile data.
                  </p>
                  <motion.button
                    className="mt-2 rounded-lg bg-[#c9ff3c] px-4 py-2 text-sm font-medium text-black"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRetry}
                  >
                    Retry
                  </motion.button>
                </motion.div>
              )}
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
            {isLoading && !hasError ? (
              <div className="space-y-4">
                <motion.div
                  className="h-10 w-full rounded-lg bg-gray-800"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <motion.div
                  className="h-10 w-full rounded-lg bg-gray-800"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="h-24 w-full rounded-lg bg-gray-800"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.4,
                  }}
                />
                <motion.div
                  className="h-10 w-full rounded-lg bg-gray-800"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.6,
                  }}
                />
              </div>
            ) : (
              <ProfileForm
                hasError={hasError}
                placeholderData={
                  hasError
                    ? {
                        investmentHorizon: placeholderUser.investmentHorizon[0],
                        riskTolerance: placeholderUser.riskTolerance,
                      }
                    : undefined
                }
              />
            )}
          </SectionContainer>
        </motion.div>
      </CardGrid>

      <SectionContainer title="Notification Settings">
        {isLoading && !hasError ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                className="rounded-lg bg-[#1a1a1a] p-4"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: item * 0.1,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-32 rounded bg-gray-800" />
                    <div className="h-4 w-48 rounded bg-gray-800" />
                  </div>
                  <div className="h-6 w-12 rounded-full bg-gray-800" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <NotificationSettings hasError={hasError} />
        )}
      </SectionContainer>
    </PageLayout>
  );
}
