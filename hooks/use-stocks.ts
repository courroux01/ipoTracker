'use client';

import { useQuery } from '@tanstack/react-query';
import type { Stock } from '@/types';

// Mock data service - in a real app, this would be an API call
const fetchStocks = async (): Promise<Stock[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      name: 'AAPL',
      fullName: 'Apple Inc',
      price: 182.53,
      change: 1.25,
      chart: 'up',
    },
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
      name: 'AMZN',
      fullName: 'Amazon.com Inc',
      price: 3250.5,
      change: 4.85,
      chart: 'up',
    },
    {
      name: 'TSLA',
      fullName: 'Tesla Inc',
      price: 620.75,
      change: -4.54,
      chart: 'down',
    },
    {
      name: 'GOOGL',
      fullName: 'Alphabet Inc',
      price: 2750.25,
      change: 2.3,
      chart: 'up',
    },
    {
      name: 'META',
      fullName: 'Meta Platforms Inc',
      price: 335.45,
      change: 5.2,
      chart: 'up',
    },
    {
      name: 'JNJ',
      fullName: 'Johnson & Johnson',
      price: 160.2,
      change: -0.8,
      chart: 'down',
    },
  ];
};

export function useStocks() {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
  });
}

export function useStockDetails(ticker: string) {
  const { data: stocks = [], isLoading, error } = useStocks();
  const stock = stocks.find((stock) => stock.name === ticker);

  return {
    data: stock,
    isLoading,
    error,
    notFound: !stock,
  };
}
