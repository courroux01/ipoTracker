'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import type { InterestedIPO } from '@/hooks/use-interested-ipos';
import { InvestmentForm } from '@/components/ongoing/investment-form';

interface PastIpoCardProps {
  ipo: InterestedIPO;
  index: number;
}

export function PastIpoCard({ ipo, index }: PastIpoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format the date properly
  const formattedDate = format(new Date(ipo.expectedDate), 'MMM d, yyyy');

  // Calculate investment value if available
  const getInvestmentValue = () => {
    if (!ipo.investment) return null;

    if (ipo.investment.shares) {
      const priceRange = ipo.expectedPrice
        .replace(/[^0-9.-]+/g, ' ')
        .trim()
        .split(' ');
      const avgPrice =
        priceRange.reduce((sum, price) => sum + Number.parseFloat(price), 0) /
        priceRange.length;
      return {
        type: 'shares',
        shares: ipo.investment.shares,
        value: ipo.investment.shares * avgPrice,
      };
    }

    if (ipo.investment.amount) {
      return {
        type: 'amount',
        amount: ipo.investment.amount,
        value: ipo.investment.amount,
      };
    }

    return null;
  };

  const investmentValue = getInvestmentValue();

  return (
    <motion.div
      className="overflow-hidden rounded-xl border-2 border-white bg-[#1a1a1a] shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <div
        className="cursor-pointer p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#c9ff3c] font-bold text-black">
              {ipo.logo}
            </div>
            <div>
              <h3 className="font-semibold text-white">{ipo.name}</h3>
              <div className="flex items-center text-xs text-gray-400">
                <span>{ipo.ticker}</span>
                <span className="mx-1">•</span>
                <span>{ipo.sector}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {investmentValue && (
              <div className="mr-3 text-right">
                <p className="text-sm font-medium text-white">
                  ${investmentValue.value.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                  {investmentValue.type === 'shares'
                    ? `${investmentValue.shares} shares`
                    : 'Investment'}
                </p>
              </div>
            )}

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center text-gray-400">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center text-gray-400">
            <DollarSign className="mr-1 h-3 w-3" />
            <span>{ipo.expectedPrice}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="border-t border-gray-800 px-4 pt-3 pb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="mb-4 text-sm text-gray-400">{ipo.description}</p>

          <div className="rounded-lg bg-gray-800/50 p-3">
            <h4 className="mb-3 text-sm font-medium text-gray-300">
              Investment Details
            </h4>
            <InvestmentForm ipo={ipo} onComplete={() => setIsExpanded(false)} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
