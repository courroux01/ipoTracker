'use client';

import { useQuery } from '@tanstack/react-query';

export interface IPO {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  expectedDate: string;
  expectedPrice: string;
  description: string;
  logo: string;
  valuation?: string;
  foundedYear?: string;
  headquarters?: string;
  ceo?: string;
  employees?: number;
  revenue?: string;
  website?: string;
  competitors?: string[];
  riskFactors?: string[];
  useOfProceeds?: string;
}

const fetchIPOs = async (): Promise<IPO[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const today = new Date().toISOString().split('T')[0]; // Today's date

  return [
    {
      id: '1',
      name: 'MediPharm Labs',
      ticker: 'MEDI',
      sector: 'Medicine',
      expectedDate: today,
      expectedPrice: '$18-22',
      description: 'Pharmaceutical innovations.',
      logo: 'M',
    },
    {
      id: '2',
      name: 'TechVision AI',
      ticker: 'TVIA',
      sector: 'Technology',
      expectedDate: '2024-12-15',
      expectedPrice: '$45-50',
      description: 'AI-powered vision.',
      logo: 'T',
    },
    {
      id: '3',
      name: 'GreenEnergy Solutions',
      ticker: 'GRNS',
      sector: 'Energy',
      expectedDate: '2025-01-10',
      expectedPrice: '$28-32',
      description: 'Renewable energy.',
      logo: 'G',
    },
    {
      id: '4',
      name: 'FinTech Innovations',
      ticker: 'FNTI',
      sector: 'Finance',
      expectedDate: '2025-03-05',
      expectedPrice: '$35-40',
      description: 'Digital banking.',
      logo: 'F',
    },
    {
      id: '5',
      name: 'Consumer Brands Inc',
      ticker: 'CBRN',
      sector: 'Consumer',
      expectedDate: today,
      expectedPrice: '$22-26',
      description: 'Sustainable goods.',
      logo: 'C',
    },
    {
      id: '6',
      name: 'Industrial Automation',
      ticker: 'IAUT',
      sector: 'Industrial',
      expectedDate: '2025-04-10',
      expectedPrice: '$30-35',
      description: 'Factory automation.',
      logo: 'I',
    },
    {
      id: '7',
      name: 'QuantumCompute',
      ticker: 'QNTM',
      sector: 'Technology',
      expectedDate: '2025-05-15',
      expectedPrice: '$60-65',
      description: 'Quantum computing.',
      logo: 'Q',
    },
    {
      id: '8',
      name: 'AgriTech Farms',
      ticker: 'AGTF',
      sector: 'Agriculture',
      expectedDate: '2025-06-01',
      expectedPrice: '$18-22',
      description: 'Smart farming.',
      logo: 'A',
    },
    {
      id: '9',
      name: 'CyberShield Security',
      ticker: 'CYBS',
      sector: 'Technology',
      expectedDate: '2025-07-10',
      expectedPrice: '$32-36',
      description: 'Cybersecurity solutions.',
      logo: 'C',
    },
    {
      id: '10',
      name: 'BioGenetics Research',
      ticker: 'BIOG',
      sector: 'Medicine',
      expectedDate: '2025-08-20',
      expectedPrice: '$40-45',
      description: 'Gene therapy.',
      logo: 'B',
    },
  ];
};

export function useIPOs(options = {}) {
  return useQuery({
    queryKey: ['ipos'],
    queryFn: fetchIPOs,
    ...options,
  });
}

export function useIPODetails(id: string) {
  const { data: ipos = [], isLoading, error } = useIPOs();
  const ipo = ipos.find((ipo) => ipo.id === id);

  return {
    data: ipo,
    isLoading,
    error,
    notFound: !ipo,
  };
}
