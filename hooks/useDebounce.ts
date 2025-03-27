'use client';

import { useQuery } from '@tanstack/react-query';

export default function useDebounce<T>(value: T, delay = 500): T {
  const { data: debouncedValue } = useQuery({
    queryKey: ['debouncedValue', value],
    queryFn: () =>
      new Promise<T>((resolve) => setTimeout(() => resolve(value), delay)),
    staleTime: delay,
    gcTime: delay * 2,
  });

  return debouncedValue ?? value;
}
