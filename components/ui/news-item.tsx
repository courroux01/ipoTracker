"use client"

import { motion } from "framer-motion"
import type { NewsItem } from "@/types"
import { cn } from "@/lib/utils"

interface NewsItemProps {
  newsItem: NewsItem
  isLast?: boolean
  delay?: number
}

export function NewsItemComponent({ newsItem, isLast = false, delay = 0 }: NewsItemProps) {
  return (
    <motion.div
      className={cn(!isLast && "border-b border-gray-200 dark:border-gray-800 pb-4 mb-4")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {newsItem.ticker} <span className="text-gray-500 dark:text-gray-400 text-xs">({newsItem.company})</span>
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{newsItem.ticker.substring(0, 1)}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">"{newsItem.headline}"</p>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">{newsItem.date}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{newsItem.source}</p>
      </div>
    </motion.div>
  )
}

