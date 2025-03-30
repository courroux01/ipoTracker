import React from 'react';
import ClerkProvider from './ClerkProvider';
import TanstackProvider from './TanstackProvider';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from './ThemeProvider';
import { UserProvider } from './UserProvider';

interface Props {
  children: React.ReactNode;
}
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <TanstackProvider>
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster />
        </UserProvider>
      </TanstackProvider>
    </ClerkProvider>
  );
};

export default Providers;
