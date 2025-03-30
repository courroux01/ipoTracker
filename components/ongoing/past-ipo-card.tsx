"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, DollarSign, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"
import type { InterestedIPO } from "@/hooks/use-interested-ipos"
import { InvestmentForm } from "@/components/ongoing/investment-form"

interface PastIpoCardProps {
  ipo: InterestedIPO
  index: number
}

export function PastIpoCard({ ipo, index }: PastIpoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Format the date properly
  const formattedDate = format(new Date(ipo.expectedDate), "MMM d, yyyy")

  // Calculate investment value if available
  const getInvestmentValue = () => {
    if (!ipo.investment) return null

    if (ipo.investment.shares) {
      const priceRange = ipo.expectedPrice
        .replace(/[^0-9.-]+/g, " ")
        .trim()
        .split(" ")
      const avgPrice = priceRange.reduce((sum, price) => sum + Number.parseFloat(price), 0) / priceRange.length
      return {
        type: "shares",
        shares: ipo.investment.shares,
        value: ipo.investment.shares * avgPrice,
      }
    }

    if (ipo.investment.amount) {
      return {
        type: "amount",
        amount: ipo.investment.amount,
        value: ipo.investment.amount,
      }
    }

    return null
  }

  const investmentValue = getInvestmentValue()

  return (
    <motion.div
      className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-[#c9ff3c] flex items-center justify-center mr-3 text-black font-bold">
              {ipo.logo}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{ipo.name}</h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{ipo.ticker}</span>
                <span className="mx-1">•</span>
                <span>{ipo.sector}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {investmentValue && (
              <div className="text-right mr-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">${investmentValue.value.toFixed(2)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {investmentValue.type === "shares" ? `${investmentValue.shares} shares` : "Investment"}
                </p>
              </div>
            )}

            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <DollarSign className="h-3 w-3 mr-1" />
            <span>{ipo.expectedPrice}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{ipo.description}</p>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Investment Details</h4>
            <InvestmentForm ipo={ipo} onComplete={() => setIsExpanded(false)} />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

