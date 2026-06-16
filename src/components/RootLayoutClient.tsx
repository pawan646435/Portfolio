'use client';

import LenisProvider from '@/components/LenisProvider';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor'),
  { ssr: false }
);

interface RootLayoutClientProps {
  children: ReactNode;
  geistSansVar: string;
  geistMonoVar: string;
}

export default function RootLayoutClient({
  children,
  geistSansVar,
  geistMonoVar,
}: RootLayoutClientProps) {
  return (
    <html
      lang="en"
      className={`${geistSansVar} ${geistMonoVar} antialiased`}
    >
      <body className="noise-overlay">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
