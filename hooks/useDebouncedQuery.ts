'use client';

import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import useDebounce from './useDebounce';

export function useDebouncedQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends unknown[] = unknown[],
>(
  queryKey: TQueryKey,
  queryFn: (context: { queryKey: TQueryKey }) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  > & {
    debounceTime?: number;
  },
): UseQueryResult<TData, TError> {
  const { debounceTime = 500, ...queryOptions } = options || {};

  // Debounce the query key (typically contains the search term or filter)
  const debouncedQueryKey = useDebounce(queryKey, debounceTime);

  return useQuery({
    queryKey: debouncedQueryKey,
    queryFn,
    ...queryOptions,
    // Don't run the query until we have the debounced value
    enabled:
      queryOptions?.enabled !== false &&
      debouncedQueryKey.every((key, i) => key === queryKey[i]),
  });
}
