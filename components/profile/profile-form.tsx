/**
 * Component for managing user profile information
 */

'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { useProfile } from '@/hooks/use-profile';
import type { profileUpdateSchema } from '@/types/forms';
import type { z } from 'zod';

/**
 * ProfileForm component for managing user profile information
 */
export function ProfileForm() {
  const { profile, isLoadingProfile, isSubmitting, updateProfile } =
    useProfile();

  // Local state for form
  const [formData, setFormData] = useState<z.infer<typeof profileUpdateSchema>>(
    {
      riskTolerance: profile?.riskTolerance || 'Moderate',
      investmentHorizon: profile?.investmentHorizon || '5-10 years',
      incomeBracket: profile?.incomeBracket || '$50,000 - $100,000',
    },
  );

  // Update local state when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        riskTolerance: profile.riskTolerance || 'Moderate',
        investmentHorizon: profile.investmentHorizon || '5-10 years',
        incomeBracket: profile.incomeBracket || '$50,000 - $100,000',
      });
    }
  }, [profile]);

  // Handle select change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (isLoadingProfile) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
            Risk Tolerance
          </label>
          <select
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="Conservative">Conservative</option>
            <option value="Moderate">Moderate</option>
            <option value="Aggressive">Aggressive</option>
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This helps us tailor investment recommendations to your comfort
            level with risk.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
            Investment Horizon
          </label>
          <select
            name="investmentHorizon"
            value={formData.investmentHorizon}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="Less than 5 years">Less than 5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            How long you plan to hold your investments affects strategy
            recommendations.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
            Income Bracket
          </label>
          <select
            name="incomeBracket"
            value={formData.incomeBracket}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="Under $50,000">Under $50,000</option>
            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
            <option value="$100,000 - $200,000">$100,000 - $200,000</option>
            <option value="$200,000+">$200,000+</option>
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This helps us suggest appropriate investment amounts and strategies.
          </p>
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
        <span>Save Profile</span>
      </motion.button>
    </form>
  );
}
