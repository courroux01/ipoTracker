'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DateSelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function DateSelector({
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  const [open, setOpen] = useState(false);

  // Format the date for display
  const formattedDate = format(selectedDate, 'PPP');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className={cn(
              'w-[180px] justify-start border-white bg-[#1a1a1a] text-left font-normal text-white sm:w-[240px]',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-[#c9ff3c]" />
            {formattedDate}
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onSelectDate(date);
                setOpen(false);
              }
            }}
            initialFocus
            className="rounded-md border border-gray-700 bg-[#1a1a1a] p-3 text-white"
          />
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
