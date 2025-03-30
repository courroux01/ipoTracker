'use client';
// components/UserProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

interface AppUser {
  id: string;
  email: string;
  // Add additional fields as needed.
}

interface UserContextType {
  user: AppUser | undefined;
  isLoading: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

async function fetchUser(clerkId: string, email: string): Promise<AppUser> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clerkId, email }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await res.json();
  return data.user;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user: clerkUser } = useUser();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['appUser', clerkUser?.id],
    queryFn: async () => {
      if (!clerkUser) throw new Error('No clerk user');
      const email = clerkUser.primaryEmailAddress?.emailAddress || '';
      return fetchUser(clerkUser.id, email);
    },
    enabled: isLoaded && !!clerkUser, // Ensures the query only runs when Clerk is loaded
    retry: 1, // Retry once if the query fails
  });

  return (
    <UserContext.Provider value={{ user, isLoading, refetchUser: refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAppUser must be used within a UserProvider');
  }
  return context;
};
