import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/src/components/complex/layout/Footer';
import { Navbar } from '@/src/components/complex/layout/Navbar';
import { ClusterProvider } from '@/src/providers/cluster';
import { ThemeProvider } from '@/src/providers/theme-provider';

import { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dora - SOON Blockchain Explorer',
  description: 'Explore the SOON blockchain with ease',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClusterProvider>
              <Navbar />
              {children}
              <Footer />
            </ClusterProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
