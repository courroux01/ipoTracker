/**
 * Component for managing user profile information
 */

'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useProfile } from '@/hooks/use-profile';
import type { profileUpdateSchema } from '@/types/forms';
import type { z } from 'zod';

interface ProfileFormProps {
  hasError?: boolean;
  placeholderData?: {
    riskTolerance?: string;
    investmentHorizon?: string;
    incomeBracket?: string;
  };
}

/**
 * ProfileForm component for managing user profile information
 */
export function ProfileForm({ hasError = false, placeholderData }: ProfileFormProps) {
  const { profile, isLoadingProfile, isSubmitting, updateProfile } = useProfile();

  // Placeholder data for when profile fails to load
  const defaultPlaceholder = {
    riskTolerance: 'Moderate',
    investmentHorizon: '5-10 years',
    incomeBracket: '$100,000 - $200,000',
  };

  const placeholderValues = placeholderData || defaultPlaceholder;

  // Local state for form
  const [formData, setFormData] = useState<z.infer<typeof profileUpdateSchema>>({
    riskTolerance: hasError ? placeholderValues.riskTolerance! : profile?.riskTolerance || 'Moderate',
    investmentHorizon: hasError ? placeholderValues.investmentHorizon! : profile?.investmentHorizon || '5-10 years',
    incomeBracket: hasError ? placeholderValues.incomeBracket! : profile?.incomeBracket || '$50,000 - $100,000',
  });

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  // Update local state when profile loads
  useEffect(() => {
    if (profile && !hasError) {
      setFormData({
        riskTolerance: profile.riskTolerance || 'Moderate',
        investmentHorizon: profile.investmentHorizon || '5-10 years',
        incomeBracket: profile.incomeBracket || '$50,000 - $100,000',
      });
    }
  }, [profile, hasError]);

  // Handle select change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (hasError) return;
    
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasError) return;
    
    updateProfile(formData);
    
    // Show success message temporarily
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (isLoadingProfile && !hasError) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="space-y-2"
            animate={{ 
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2
            }}
          >
            <div className="h-5 w-32 rounded bg-gray-800" />
            <div className="h-12 w-full rounded-lg bg-gray-800" />
            <div className="h-4 w-3/4 rounded bg-gray-800" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-white">
            Risk Tolerance
          </label>
          <select
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none ${hasError ? 'opacity-80' : ''}`}
            disabled={hasError}
          >
            <option value="Conservative">Conservative</option>
            <option value="Moderate">Moderate</option>
            <option value="Aggressive">Aggressive</option>
          </select>
          <p className="mt-1 text-xs text-gray-400">
            This helps us tailor investment recommendations to your comfort
            level with risk.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-white">
            Investment Horizon
          </label>
          <select
            name="investmentHorizon"
            value={formData.investmentHorizon}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none ${hasError ? 'opacity-80' : ''}`}
            disabled={hasError}
          >
            <option value="Less than 5 years">Less than 5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
          <p className="mt-1 text-xs text-gray-400">
            How long you plan to hold your investments affects strategy
            recommendations.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-white">
            Income Bracket
          </label>
          <select
            name="incomeBracket"
            value={formData.incomeBracket}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none ${hasError ? 'opacity-80' : ''}`}
            disabled={hasError}
          >
            <option value="Under $50,000">Under $50,000</option>
            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
            <option value="$100,000 - $200,000">$100,000 - $200,000</option>
            <option value="$200,000+">$200,000+</option>
          </select>
          <p className="mt-1 text-xs text-gray-400">
            This helps us suggest appropriate investment amounts and strategies.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <motion.button
          type="submit"
          className={`flex items-center justify-center gap-2 rounded-lg bg-[#c9ff3c] px-4 py-3 font-medium text-black ${hasError ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={hasError ? {} : { scale: 1.02 }}
          whileTap={hasError ? {} : { scale: 0.98 }}
          disabled={isSubmitting || hasError}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>Save Profile</span>
        </motion.button>

        {showSuccess && (
          <motion.div
            className="flex items-center gap-1 rounded-lg bg-green-900/20 px-3 py-2 text-sm text-green-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Profile updated!</span>
          </motion.div>
        )}
        
        {hasError && (
          <motion.div
            className="flex items-center gap-1 rounded-lg bg-yellow-900/20 px-3 py-2 text-sm text-yellow-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AlertCircle className="h-4 w-4" />
            <span>Using placeholder data</span>
          </motion.div>
        )}
      </div>
    </form>
  );
}
