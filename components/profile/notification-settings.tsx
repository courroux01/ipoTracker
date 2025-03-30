/**
 * Component for managing notification settings
 */

'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Smartphone,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Save,
  Loader2,
  CheckCircle,
  Info,
} from 'lucide-react';
import { useProfile } from '@/hooks/use-profile';
import type { notificationPrefsUpdateSchema } from '@/types/forms';
import type { z } from 'zod';

interface NotificationSettingsProps {
  hasError?: boolean;
}

/**
 * NotificationSettings component for managing user notification preferences
 */
export function NotificationSettings({
  hasError = false,
}: NotificationSettingsProps) {
  const {
    notificationPrefs,
    isLoadingNotifications,
    isSubmitting,
    updateNotificationPrefs,
  } = useProfile();

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  // Placeholder data for when notifications fail to load
  const placeholderPrefs = {
    emailNotifications: true,
    pushNotifications: false,
    ipoReminders: true,
    marketUpdates: true,
    portfolioAlerts: true,
  };

  // Local state for form
  const [formData, setFormData] = useState<
    z.infer<typeof notificationPrefsUpdateSchema>
  >(
    hasError
      ? placeholderPrefs
      : {
          emailNotifications: notificationPrefs?.emailNotifications ?? true,
          pushNotifications: notificationPrefs?.pushNotifications ?? false,
          ipoReminders: notificationPrefs?.ipoReminders ?? true,
          marketUpdates: notificationPrefs?.marketUpdates ?? true,
          portfolioAlerts: notificationPrefs?.portfolioAlerts ?? true,
        },
  );

  // Update local state when notificationPrefs loads
  useEffect(() => {
    if (notificationPrefs && !hasError) {
      setFormData({
        emailNotifications: notificationPrefs.emailNotifications,
        pushNotifications: notificationPrefs.pushNotifications,
        ipoReminders: notificationPrefs.ipoReminders,
        marketUpdates: notificationPrefs.marketUpdates,
        portfolioAlerts: notificationPrefs.portfolioAlerts,
      });
    }
  }, [notificationPrefs, hasError]);

  // Handle toggle change
  const handleToggle = (
    field: keyof z.infer<typeof notificationPrefsUpdateSchema>,
  ) => {
    if (hasError) return;

    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasError) return;

    updateNotificationPrefs(formData);

    // Show success message temporarily
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (isLoadingNotifications && !hasError) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="rounded-lg bg-[#1a1a1a] p-4"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              delay: i * 0.1,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-800" />
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-800" />
                  <div className="h-3 w-40 rounded bg-gray-800" />
                </div>
              </div>
              <div className="h-6 w-12 rounded-full bg-gray-800" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Define notification options
  const notificationOptions = [
    {
      id: 'emailNotifications' as const,
      title: 'Email Notifications',
      description: 'Receive updates via email',
      icon: <Mail className="h-5 w-5 text-blue-400" />,
      bgColor: 'bg-blue-900/30',
    },
    {
      id: 'pushNotifications' as const,
      title: 'Push Notifications',
      description: 'Receive alerts on your device',
      icon: <Smartphone className="h-5 w-5 text-purple-400" />,
      bgColor: 'bg-purple-900/30',
    },
    {
      id: 'ipoReminders' as const,
      title: 'IPO Reminders',
      description: 'Get notified about upcoming IPOs',
      icon: <Calendar className="h-5 w-5 text-green-400" />,
      bgColor: 'bg-green-900/30',
    },
    {
      id: 'marketUpdates' as const,
      title: 'Market Updates',
      description: 'Receive market trend notifications',
      icon: <TrendingUp className="h-5 w-5 text-amber-400" />,
      bgColor: 'bg-amber-900/30',
    },
    {
      id: 'portfolioAlerts' as const,
      title: 'Portfolio Alerts',
      description: 'Get notified about significant changes',
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      bgColor: 'bg-red-900/30',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {hasError && (
        <motion.div
          className="mb-4 flex items-center gap-2 rounded-lg border border-yellow-800 bg-yellow-900/10 p-3 text-yellow-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Info className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            Using placeholder notification settings. Some features may be
            limited.
          </p>
        </motion.div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {notificationOptions.map((option) => (
          <motion.div
            key={option.id}
            className="rounded-lg bg-[#1a1a1a] p-4 shadow-sm"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${option.bgColor}`}
                >
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-medium text-white">{option.title}</h4>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <motion.button
                  type="button"
                  className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData[option.id] ? 'bg-[#c9ff3c]' : 'bg-gray-700'
                  } ${hasError ? 'opacity-80' : ''}`}
                  onClick={() => handleToggle(option.id)}
                  whileTap={hasError ? {} : { scale: 0.95 }}
                  disabled={hasError}
                >
                  <motion.span
                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    animate={{ x: formData[option.id] ? 6 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <motion.button
          type="submit"
          className={`flex items-center justify-center gap-2 rounded-lg bg-[#c9ff3c] px-4 py-3 font-medium text-black ${hasError ? 'cursor-not-allowed opacity-50' : ''}`}
          whileHover={hasError ? {} : { scale: 1.02 }}
          whileTap={hasError ? {} : { scale: 0.98 }}
          disabled={isSubmitting || hasError}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>Save Notification Settings</span>
        </motion.button>

        {showSuccess && (
          <motion.div
            className="flex items-center gap-1 rounded-lg bg-green-900/20 px-3 py-2 text-sm text-green-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Settings updated!</span>
          </motion.div>
        )}
      </div>
    </form>
  );
}
