import type React from 'react';
export interface Stock {
  name: string;
  fullName: string;
  price: number;
  change: number;
  chart?: 'up' | 'down';
}

export interface MarketTrend {
  trend: string;
  change: number;
}

export interface NewsItem {
  ticker: string;
  company: string;
  headline: string;
  date: string;
  source: string;
}

export interface PriceData {
  open: number;
  close: number;
}

export interface TabItem {
  name: string;
  icon: React.ElementType;
  id: string;
}

export interface ActionButton {
  title: string;
  icon: React.ElementType;
  active: boolean;
}
