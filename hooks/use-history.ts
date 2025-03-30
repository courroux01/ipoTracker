'use client';

import { useState, useMemo } from 'react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { useInterestedIPOs } from '@/hooks/use-interested-ipos';

// Define transaction history item type
export interface TransactionHistoryItem {
  id: string;
  date: string;
  type: 'interest' | 'investment' | 'notification';
  action: string;
  ticker: string;
  name: string;
  details: string;
  ipoDate: string;
}

// Hook for processing history data
export function useHistory() {
  const { getInterestedIPOsArray, isLoading } = useInterestedIPOs();
  const [filterType, setFilterType] = useState<
    'all' | 'interest' | 'investment' | 'notification'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate history items from interested IPOs
  const historyItems = useMemo(() => {
    const interestedIPOs = getInterestedIPOsArray();
    const items: TransactionHistoryItem[] = [];

    // Process each IPO to generate history items
    interestedIPOs.forEach((ipo) => {
      // Add interest marking as a history item
      items.push({
        id: `interest-${ipo.id}`,
        date: new Date().toISOString(), // This would ideally come from when the user marked interest
        type: 'interest',
        action: 'Marked Interest',
        ticker: ipo.ticker,
        name: ipo.name,
        details: `Marked interest in ${ipo.name} IPO`,
        ipoDate: ipo.expectedDate,
      });

      // Add investment actions if applicable
      if (ipo.investment) {
        let details = '';
        if (ipo.investment.shares) {
          details = `Invested in ${ipo.investment.shares} shares`;
        } else if (ipo.investment.amount) {
          details = `Invested $${ipo.investment.amount.toFixed(2)}`;
        }

        if (details) {
          items.push({
            id: `investment-${ipo.id}`,
            date: new Date().toISOString(), // This would ideally come from when the user made the investment
            type: 'investment',
            action: 'Investment',
            ticker: ipo.ticker,
            name: ipo.name,
            details,
            ipoDate: ipo.expectedDate,
          });
        }
      }

      // Add notification settings if applicable
      if (ipo.notifyOnDate) {
        items.push({
          id: `notification-${ipo.id}`,
          date: new Date().toISOString(), // This would ideally come from when the user set up notifications
          type: 'notification',
          action: 'Set Notification',
          ticker: ipo.ticker,
          name: ipo.name,
          details: `Enabled notification for ${ipo.name} IPO on ${format(new Date(ipo.expectedDate), 'MMM d, yyyy')}`,
          ipoDate: ipo.expectedDate,
        });
      }
    });

    // Sort by date (newest first)
    return items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [getInterestedIPOsArray]);

  // Apply filters to history items
  const filteredHistoryItems = useMemo(() => {
    return historyItems.filter((item) => {
      // Apply type filter
      const matchesType = filterType === 'all' || item.type === filterType;

      // Apply search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        item.ticker.toLowerCase().includes(searchLower) ||
        item.name.toLowerCase().includes(searchLower) ||
        item.details.toLowerCase().includes(searchLower);

      return matchesType && matchesSearch;
    });
  }, [historyItems, filterType, searchQuery]);

  // Generate monthly balance data for charts
  const monthlyBalanceData = useMemo(() => {
    const currentDate = new Date();
    const data = [];

    // Get all IPOs with investments
    const interestedIPOs = getInterestedIPOsArray();
    const investedIPOs = interestedIPOs.filter((ipo) => ipo.investment);

    // Generate data for the past 6 months
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(currentDate, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const monthName = format(monthDate, 'MMM');

      // Calculate value for this month (IPOs with dates before the end of this month)
      const monthValue = investedIPOs
        .filter((ipo) => new Date(ipo.expectedDate) <= monthEnd)
        .reduce((total, ipo) => {
          if (!ipo.investment) return total;

          if (ipo.investment.shares) {
            const priceRange = ipo.expectedPrice
              .replace(/[^0-9.-]+/g, ' ')
              .trim()
              .split(' ');
            const avgPrice =
              priceRange.reduce(
                (sum, price) => sum + Number.parseFloat(price),
                0,
              ) / priceRange.length;
            return total + ipo.investment.shares * avgPrice;
          }

          if (ipo.investment.amount) {
            return total + ipo.investment.amount;
          }

          return total;
        }, 0);

      data.push({
        name: monthName,
        value: monthValue,
        current: i === 0, // Mark current month
      });
    }

    return data;
  }, [getInterestedIPOsArray]);

  return {
    historyItems,
    filteredHistoryItems,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    isLoading,
    monthlyBalanceData,
  };
}
