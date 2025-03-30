'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Hash, Save, Loader2 } from 'lucide-react';
import {
  useInterestedIPOs,
  type InterestedIPO,
} from '@/hooks/use-interested-ipos';

interface InvestmentFormProps {
  ipo: InterestedIPO;
  onComplete?: () => void;
}

export function InvestmentForm({ ipo, onComplete }: InvestmentFormProps) {
  const { updateInvestment, isUpdatingInvestment } = useInterestedIPOs();
  const [investmentType, setInvestmentType] = useState<'shares' | 'amount'>(
    ipo.investment?.shares ? 'shares' : 'amount',
  );
  const [shares, setShares] = useState<string>(
    ipo.investment?.shares?.toString() || '',
  );
  const [amount, setAmount] = useState<string>(
    ipo.investment?.amount?.toString() || '',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const investment: { shares?: number; amount?: number } = {};

    if (investmentType === 'shares' && shares) {
      investment.shares = Number.parseFloat(shares);
    } else if (investmentType === 'amount' && amount) {
      investment.amount = Number.parseFloat(amount);
    }

    updateInvestment(ipo.id, investment);

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <button
            type="button"
            className={`rounded-md px-3 py-1 text-sm ${
              investmentType === 'shares'
                ? 'bg-[#c9ff3c] text-black'
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setInvestmentType('shares')}
          >
            Shares
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-1 text-sm ${
              investmentType === 'amount'
                ? 'bg-[#c9ff3c] text-black'
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setInvestmentType('amount')}
          >
            Amount
          </button>
        </div>

        {investmentType === 'shares' ? (
          <div className="relative">
            <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <input
              type="number"
              placeholder="Number of shares"
              className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pr-4 pl-10 text-white"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              min="0"
              step="1"
            />
          </div>
        ) : (
          <div className="relative">
            <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <input
              type="number"
              placeholder="Investment amount"
              className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pr-4 pl-10 text-white"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        )}
      </div>

      <motion.button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#c9ff3c] px-4 py-2 text-black"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isUpdatingInvestment}
      >
        {isUpdatingInvestment ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span>Save Investment</span>
      </motion.button>
    </form>
  );
}
