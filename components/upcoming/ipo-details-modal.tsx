'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  DollarSign,
  Building,
  Users,
  Globe,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import type { IPO } from '@/hooks/use-ipos';
import { InterestCheckbox } from '@/components/upcoming/interest-checkbox';

interface IPODetailsModalProps {
  ipo: IPO | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IPODetailsModal({
  ipo,
  isOpen,
  onClose,
}: IPODetailsModalProps) {
  if (!ipo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${ipo.name} (${ipo.ticker})`}
      className="max-w-2xl"
      showCloseButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#c9ff3c] text-2xl font-bold text-black">
            {ipo.logo}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{ipo.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-300">
                    {ipo.ticker}
                  </span>
                  <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-300">
                    {ipo.sector}
                  </span>
                </div>
              </div>
              <InterestCheckbox ipo={ipo} size="lg" />
            </div>
            <p className="mt-2 text-gray-400">{ipo.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium text-gray-300">
              IPO Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#c9ff3c]" />
                <span className="text-sm text-gray-400">Expected Date:</span>
                <span className="text-sm font-medium text-white">
                  {new Date(ipo.expectedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#c9ff3c]" />
                <span className="text-sm text-gray-400">Price Range:</span>
                <span className="text-sm font-medium text-white">
                  {ipo.expectedPrice}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#c9ff3c]" />
                <span className="text-sm text-gray-400">Valuation:</span>
                <span className="text-sm font-medium text-white">
                  {ipo.valuation}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium text-gray-300">
              Company Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-[#c9ff3c]" />
                <span className="text-sm text-gray-400">Founded:</span>
                <span className="text-sm font-medium text-white">
                  {ipo.foundedYear}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#c9ff3c]" />
                <span className="text-sm text-gray-400">Employees:</span>
                <span className="text-sm font-medium text-white">
                  {ipo.employees?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#c9ff3c]" />
                <span className="text-sm text-gray-400">Website:</span>
                <a
                  href={`https://${ipo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#c9ff3c] hover:underline"
                >
                  {ipo.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-300">
            Key Competitors
          </h4>
          <div className="flex flex-wrap gap-2">
            {ipo.competitors?.map((competitor) => (
              <span
                key={competitor}
                className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300"
              >
                {competitor}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Risk Factors
          </h4>
          <ul className="list-disc space-y-1 pl-5">
            {ipo.riskFactors?.map((risk) => (
              <li key={risk} className="text-sm text-gray-400">
                {risk}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h4 className="mb-2 text-sm font-medium text-gray-300">
            Use of Proceeds
          </h4>
          <p className="text-sm text-gray-400">{ipo.useOfProceeds}</p>
        </div>

        <div className="flex justify-end">
          <motion.button
            className="rounded-lg bg-[#c9ff3c] px-4 py-2 font-medium text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Close
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
