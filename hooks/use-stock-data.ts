'use client';

import { useState, useEffect } from 'react';
import type { Stock } from '@/types';

// This is a mock hook that would normally fetch real data
export function useStockData() {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      name: 'MSFT',
      fullName: 'Microsoft Co',
      price: 234.53,
      change: 10.3,
      chart: 'up',
    },
    {
      name: 'NVDA',
      fullName: 'NVIDIA Co',
      price: 140.36,
      change: -0.6,
      chart: 'down',
    },
    {
      name: 'AAPL',
      fullName: 'Apple Inc',
      price: 182.53,
      change: 1.25,
      chart: 'up',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching updated stock data
  const refreshStocks = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate updated data
      setStocks((prev) =>
        prev.map((stock) => ({
          ...stock,
          price: stock.price * (1 + (Math.random() * 0.02 - 0.01)),
          change: stock.change + (Math.random() * 0.5 - 0.25),
        })),
      );
    } catch (err) {
      setError('Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stocks, loading, error, refreshStocks };
}
