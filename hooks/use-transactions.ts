'use client';

import { useQuery } from '@tanstack/react-query';

export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  ticker: string;
  name: string;
  shares: number;
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

// Mock data service - in a real app, this would be an API call
const fetchTransactions = async (): Promise<Transaction[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 'TX123456',
      date: '2024-06-01',
      type: 'buy',
      ticker: 'AAPL',
      name: 'Apple Inc.',
      shares: 10,
      price: 180.95,
      total: 1809.5,
      status: 'completed',
    },
    {
      id: 'TX123457',
      date: '2024-05-28',
      type: 'sell',
      ticker: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 5,
      price: 230.45,
      total: 1152.25,
      status: 'completed',
    },
    {
      id: 'TX123458',
      date: '2024-05-20',
      type: 'buy',
      ticker: 'NVDA',
      name: 'NVIDIA Corp.',
      shares: 8,
      price: 135.75,
      total: 1086.0,
      status: 'completed',
    },
    {
      id: 'TX123459',
      date: '2024-05-15',
      type: 'buy',
      ticker: 'TSLA',
      name: 'Tesla Inc',
      shares: 4,
      price: 650.3,
      total: 2601.2,
      status: 'pending',
    },
    {
      id: 'TX123460',
      date: '2024-05-10',
      type: 'sell',
      ticker: 'AMZN',
      name: 'Amazon.com Inc',
      shares: 2,
      price: 3200.5,
      total: 6401.0,
      status: 'completed',
    },
    {
      id: 'TX123461',
      date: '2024-05-05',
      type: 'buy',
      ticker: 'JNJ',
      name: 'Johnson & Johnson',
      shares: 12,
      price: 160.2,
      total: 1922.4,
      status: 'cancelled',
    },
  ];
};

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
}

export function useFilteredTransactions(type: string, searchQuery = '') {
  const { data: transactions = [], isLoading, error } = useTransactions();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = type === 'all' || transaction.type === type;

    const matchesSearch =
      searchQuery === '' ||
      transaction.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return {
    data: filteredTransactions,
    isLoading,
    error,
    isEmpty: filteredTransactions.length === 0,
  };
}
