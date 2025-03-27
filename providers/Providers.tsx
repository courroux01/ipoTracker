import React from 'react';
import ClerkProvider from './ClerkProvider';
import { ThemeProvider } from 'next-themes';
import TanstackProvider from './TanstackProvider';
import { Toaster } from '@/components/ui/sonner';

interface Props {
  children: React.ReactNode;
}
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <TanstackProvider>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </TanstackProvider>
    </ClerkProvider>
  );
};

export default Providers;
