'use client';
import { ClerkProvider as CProvider } from '@clerk/nextjs';

export default function ClerkProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CProvider>{children}</CProvider>;
}
