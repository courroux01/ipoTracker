'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { AnimatedButton } from '@/components/ui/animated-button';
import { SectorSelector } from '@/components/upcoming/sector-selector';
import { DateSelector } from '@/components/upcoming/date-selector';
import { UpcomingIpoCard } from '@/components/upcoming/upcoming-ipo-card';
import { IPODetailsModal } from '@/components/upcoming/ipo-details-modal';
import { SelectAllFiltered } from '@/components/upcoming/select-all-filtered';
import { useIPOs, useIPODetails, type IPO } from '@/hooks/use-ipos';

export default function UpcomingPage() {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIpoId, setSelectedIpoId] = useState<string | null>(null);

  // Get the query client for manual invalidation
  const queryClient = useQueryClient();

  // Add a useEffect to update the document title with filter information
  useEffect(() => {
    // Update document title to reflect active filters
    let title = 'Upcoming IPOs';

    if (selectedSector !== 'All') {
      title += ` - ${selectedSector}`;
    }

    if (selectedPeriod !== 'All') {
      title += ` - ${selectedPeriod}`;
    }

    if (searchQuery) {
      title += ` - Search: ${searchQuery}`;
    }

    document.title = title;

    // Log active filters for debugging
    console.log('Active filters:', {
      sector: selectedSector,
      period: selectedPeriod,
      customDate: selectedPeriod === 'Custom' ? selectedDate : null,
      search: searchQuery,
    });
  }, [selectedSector, selectedPeriod, selectedDate, searchQuery]);

  // Get all IPOs and filter them directly in the component
  // Add staleTime of 5 minutes (300000 ms) for revalidation
  const {
    data: allIpos = [],
    isLoading,
    refetch,
  } = useIPOs({
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get selected IPO details
  const { data: selectedIpo } = useIPODetails(selectedIpoId || '');

  // Handle refresh button click
  const handleRefresh = async () => {
    await refetch();
  };

  // Filter IPOs based on current filters
  const filteredIpos = allIpos.filter((ipo) => {
    // ALL filters must match for an IPO to be included (concurrent filtering)

    // 1. Filter by sector
    const matchesSector =
      selectedSector === 'All' || ipo.sector === selectedSector;

    // 2. Filter by search query (search in multiple fields)
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      ipo.name.toLowerCase().includes(searchLower) ||
      ipo.ticker.toLowerCase().includes(searchLower) ||
      ipo.description.toLowerCase().includes(searchLower) ||
      ipo.sector.toLowerCase().includes(searchLower);

    // 3. Filter by date
    let matchesDate = true;
    const ipoDate = new Date(ipo.expectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

    if (selectedPeriod === 'All') {
      // Show all IPOs regardless of date
      matchesDate = true;
    } else if (selectedPeriod === 'Custom') {
      // Compare dates using isSameDay for more accurate comparison
      matchesDate = isSameDay(ipoDate, selectedDate);
    } else if (selectedPeriod === 'Today') {
      // Use isSameDay for more accurate comparison
      matchesDate = isSameDay(ipoDate, today);
    } else if (selectedPeriod === 'This Week') {
      // Get start of week (Sunday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      // Get end of week (Saturday)
      const endOfWeek = new Date(today);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      // Set times to beginning and end of day
      startOfWeek.setHours(0, 0, 0, 0);
      endOfWeek.setHours(23, 59, 59, 999);

      matchesDate = ipoDate >= startOfWeek && ipoDate <= endOfWeek;
    } else if (selectedPeriod === 'This Month') {
      matchesDate =
        ipoDate.getMonth() === today.getMonth() &&
        ipoDate.getFullYear() === today.getFullYear();
    } else if (selectedPeriod === 'Next Month') {
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      matchesDate =
        ipoDate.getMonth() === nextMonth.getMonth() &&
        ipoDate.getFullYear() === nextMonth.getFullYear();
    }

    // All conditions must be true for the IPO to be included in results
    return matchesSector && matchesSearch && matchesDate;
  });

  // Available sectors - extract unique sectors from data
  const sectors = [
    'All',
    ...Array.from(new Set(allIpos.map((ipo) => ipo.sector))),
  ].sort();

  // Date period options
  const datePeriods = [
    'All',
    'Today',
    'This Week',
    'This Month',
    'Next Month',
    'Custom',
  ];

  // Handle date period selection
  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  // Handle IPO selection for modal
  const handleIpoSelect = (ipo: IPO) => {
    setSelectedIpoId(ipo.id);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedIpoId(null);
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedPeriod('Custom');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSector('All');
    setSelectedPeriod('All');
    setSearchQuery('');
    setSelectedDate(new Date());
  };

  return (
    <PageLayout
      title="Upcoming IPOs"
      description="Discover and track upcoming market opportunities"
      actionButton={
        <AnimatedButton
          variant="primary"
          icon={<RefreshCw className="h-4 w-4" />}
          iconPosition="left"
          onClick={handleRefresh}
        >
          Refresh Data
        </AnimatedButton>
      }
    >
      {/* SECTORS - Prominently displayed at the top */}
      <SectionContainer title="Sectors">
        <div className="flex flex-wrap gap-3">
          <SectorSelector
            sectors={sectors}
            selectedSector={selectedSector}
            onSelectSector={setSelectedSector}
          />
        </div>
      </SectionContainer>

      {/* DATE SELECTOR - Prominently displayed */}
      <SectionContainer
        title="IPO Date"
        rightElement={
          <div className="flex items-center">
            <DateSelector
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          {datePeriods.map((period, index) => (
            <motion.button
              key={period}
              className={`cursor-pointer rounded-xl border border-white px-4 py-2 text-sm font-medium ${
                selectedPeriod === period
                  ? 'border-[#c9ff3c] bg-[#c9ff3c] text-black'
                  : 'bg-[#1a1a1a] text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => handlePeriodSelect(period)}
            >
              {period}
            </motion.button>
          ))}
        </div>

        {selectedPeriod === 'Custom' && (
          <div className="mt-4 text-sm text-gray-400">
            Selected date:{' '}
            <span className="font-medium text-[#c9ff3c]">
              {format(selectedDate, 'MMMM d, yyyy')}
            </span>
          </div>
        )}
      </SectionContainer>

      {/* Upcoming IPOs List */}
      <SectionContainer
        title="Upcoming IPOs"
        rightElement={
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <input
                type="text"
                placeholder="Search IPOs..."
                className="w-full rounded-xl bg-[#1a1a1a] py-2 pr-4 pl-10 text-white shadow-sm focus:ring-2 focus:ring-[#c9ff3c]/50 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // Add these props for better UX
                autoComplete="off"
                spellCheck="false"
              />
              {searchQuery && (
                <motion.button
                  className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500 hover:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchQuery('')}
                >
                  <span className="sr-only">Clear search</span>×
                </motion.button>
              )}
            </div>
            <motion.button
              className="hidden rounded-xl bg-[#1a1a1a] p-2 shadow-sm sm:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-4 w-4 text-gray-300" />
            </motion.button>
          </div>
        }
      >
        {/* Select All Filtered Button */}
        {filteredIpos.length > 0 && (
          <div className="mb-4">
            <SelectAllFiltered filteredIpos={filteredIpos} />
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-[#1a1a1a] p-4 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-gray-700"></div>
                    <div className="ml-3">
                      <div className="h-4 w-32 rounded bg-gray-700"></div>
                      <div className="mt-2 h-3 w-20 rounded bg-gray-700"></div>
                    </div>
                  </div>
                </div>
                <div className="mb-3 h-4 w-full rounded bg-gray-700"></div>
                <div className="mb-3 h-4 w-3/4 rounded bg-gray-700"></div>
                <div className="flex justify-between">
                  <div className="h-3 w-20 rounded bg-gray-700"></div>
                  <div className="h-3 w-20 rounded bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredIpos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400">
              No IPOs found matching your criteria
            </p>
            <motion.button
              className="mt-4 rounded-xl bg-[#c9ff3c] px-4 py-2 font-medium text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetFilters}
            >
              Reset Filters
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIpos.map((ipo, index) => (
              <UpcomingIpoCard
                key={ipo.id}
                ipo={ipo}
                index={index}
                onClick={() => handleIpoSelect(ipo)}
                searchTerm={searchQuery}
              />
            ))}
          </div>
        )}

        {/* Filter summary */}
        {filteredIpos.length > 0 && (
          <div className="mt-4 text-sm text-gray-400">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span>Showing {filteredIpos.length} IPOs</span>

              {/* Show active filter count badge if multiple filters are active */}
              {(selectedSector !== 'All' ? 1 : 0) +
                (selectedPeriod !== 'All' ? 1 : 0) +
                (searchQuery ? 1 : 0) >
                1 && (
                <span className="rounded-full bg-[#c9ff3c] px-2 py-1 text-xs font-medium text-black">
                  {(selectedSector !== 'All' ? 1 : 0) +
                    (selectedPeriod !== 'All' ? 1 : 0) +
                    (searchQuery ? 1 : 0)}{' '}
                  filters active
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedSector !== 'All' && (
                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs">
                  Sector: {selectedSector}
                </span>
              )}
              {selectedPeriod !== 'All' && (
                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs">
                  Period: {selectedPeriod}
                  {selectedPeriod === 'Custom' &&
                    ` (${format(selectedDate, 'MMM d, yyyy')})`}
                </span>
              )}
              {searchQuery && (
                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs">
                  Search: "{searchQuery}"
                </span>
              )}
              {(selectedSector !== 'All' ||
                selectedPeriod !== 'All' ||
                searchQuery) && (
                <motion.button
                  className="text-xs text-[#c9ff3c] underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetFilters}
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </div>
        )}
      </SectionContainer>

      {/* IPO Details Modal */}
      <IPODetailsModal
        ipo={selectedIpo!}
        isOpen={!!selectedIpoId}
        onClose={handleCloseModal}
      />
    </PageLayout>
  );
}
