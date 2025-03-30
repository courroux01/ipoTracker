/**
 * Component for managing notification settings
 */

'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Smartphone,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Save,
  Loader2,
} from 'lucide-react';
import { useProfile } from '@/hooks/use-profile';
import type { notificationPrefsUpdateSchema } from '@/types/forms';
import type { z } from 'zod';

/**
 * NotificationSettings component for managing user notification preferences
 */
export function NotificationSettings() {
  const {
    notificationPrefs,
    isLoadingNotifications,
    isSubmitting,
    updateNotificationPrefs,
  } = useProfile();

  // Local state for form
  const [formData, setFormData] = useState<
    z.infer<typeof notificationPrefsUpdateSchema>
  >({
    emailNotifications: notificationPrefs?.emailNotifications ?? true,
    pushNotifications: notificationPrefs?.pushNotifications ?? false,
    ipoReminders: notificationPrefs?.ipoReminders ?? true,
    marketUpdates: notificationPrefs?.marketUpdates ?? true,
    portfolioAlerts: notificationPrefs?.portfolioAlerts ?? true,
  });

  // Update local state when notificationPrefs loads
  useState(() => {
    if (notificationPrefs) {
      setFormData({
        emailNotifications: notificationPrefs.emailNotifications,
        pushNotifications: notificationPrefs.pushNotifications,
        ipoReminders: notificationPrefs.ipoReminders,
        marketUpdates: notificationPrefs.marketUpdates,
        portfolioAlerts: notificationPrefs.portfolioAlerts,
      });
    }
  });

  // Handle toggle change
  const handleToggle = (
    field: keyof z.infer<typeof notificationPrefsUpdateSchema>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotificationPrefs(formData);
  };

  if (isLoadingNotifications) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Notification Channels
        </h3>

        {/* Email Notifications */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Email Notifications
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive updates via email
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            className={`relative h-6 w-12 rounded-full transition-colors ${
              formData.emailNotifications
                ? 'bg-[#c9ff3c]'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => handleToggle('emailNotifications')}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white"
              animate={{ x: formData.emailNotifications ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Push Notifications
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive alerts on your device
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            className={`relative h-6 w-12 rounded-full transition-colors ${
              formData.pushNotifications
                ? 'bg-[#c9ff3c]'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => handleToggle('pushNotifications')}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white"
              animate={{ x: formData.pushNotifications ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Notification Types
        </h3>

        {/* IPO Reminders */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                IPO Reminders
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about upcoming IPOs
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            className={`relative h-6 w-12 rounded-full transition-colors ${
              formData.ipoReminders
                ? 'bg-[#c9ff3c]'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => handleToggle('ipoReminders')}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white"
              animate={{ x: formData.ipoReminders ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {/* Market Updates */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Market Updates
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive market trend notifications
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            className={`relative h-6 w-12 rounded-full transition-colors ${
              formData.marketUpdates
                ? 'bg-[#c9ff3c]'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => handleToggle('marketUpdates')}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white"
              animate={{ x: formData.marketUpdates ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {/* Portfolio Alerts */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Portfolio Alerts
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about significant changes
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            className={`relative h-6 w-12 rounded-full transition-colors ${
              formData.portfolioAlerts
                ? 'bg-[#c9ff3c]'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => handleToggle('portfolioAlerts')}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white"
              animate={{ x: formData.portfolioAlerts ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>
      </div>

      <motion.button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c9ff3c] px-4 py-3 font-medium text-black"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span>Save Notification Settings</span>
      </motion.button>
    </form>
  );
}
