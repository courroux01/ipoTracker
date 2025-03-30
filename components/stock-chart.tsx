"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface StockChartProps {
  data?: number[]
  color?: string
  height?: number
  showTooltip?: boolean
}

export function StockChart({
  data = [40, 35, 50, 45, 70, 65, 80, 75, 65, 60, 50, 55, 40],
  color = "#4CAF50",
  height = 150,
  showTooltip = false,
}: StockChartProps) {
  const [activePoint, setActivePoint] = useState<number | null>(null)

  // Normalize data to fit in the chart height
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  // Create path for the chart
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - minValue) / range) * 100
    return `${x},${y}`
  })

  const linePath = `M${points.join(" L")}`
  const areaPath = `${linePath} L100,100 L0,100 Z`

  return (
    <div className="relative w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <motion.line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#333"
            strokeWidth="0.2"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 + y * 0.001 }}
          />
        ))}

        {/* Area under the line */}
        <motion.path
          d={areaPath}
          fill={`url(#gradient-${color.replace("#", "")})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.8, duration: 1 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="chart-line"
        />

        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100
          const y = 100 - ((value - minValue) / range) * 100

          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
              onMouseEnter={() => setActivePoint(index)}
              onMouseLeave={() => setActivePoint(null)}
              className="cursor-pointer"
            />
          )
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tooltip */}
      {showTooltip && activePoint !== null && (
        <motion.div
          className="absolute bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10"
          style={{
            left: `${(activePoint / (data.length - 1)) * 100}%`,
            top: `${100 - ((data[activePoint] - minValue) / range) * 100}%`,
            transform: "translate(-50%, -150%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          ${data[activePoint].toFixed(2)}
        </motion.div>
      )}
    </div>
  )
}

