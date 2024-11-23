import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/src/providers/theme-provider';
import './globals.css';
import { Footer } from '@/src/components/complex/footer';
import { Navbar } from '@/src/components/complex/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dora - SOON Blockchain Explorer',
  description: 'Explore the SOON blockchain with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
