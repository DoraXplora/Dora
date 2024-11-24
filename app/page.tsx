'use client';

import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
// import { TopMarkets } from '@/src/components/complex/top-markets';
import { BlocksTable } from '@/src/components/complex/blocks/BlocksTable';
import { StatsCards } from '@/src/components/complex/home/StatsCards';
import { TransactionsTable } from '@/src/components/complex/txs/TransactionTable';
import { StatsProvider } from '@/src/providers/stats';
import { SupplyProvider } from '@/src/providers/supply';

const NetworkStats = dynamic(
  () => import('@/src/components/complex/home/NetworkStats'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <StatsProvider>
      <SupplyProvider>
        <HomeContent />
      </SupplyProvider>
    </StatsProvider>
  );
}

function HomeContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="container mx-auto px-4 py-5 md:py-10">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions, blocks, programs and tokens"
              className="w-full rounded-lg bg-muted px-4 py-3 pl-12 text-foreground placeholder-foreground/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/70" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* TODO: <TopMarkets /> */}
        <StatsCards />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <BlocksTable />
          <TransactionsTable />
        </div>

        {/* <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <NFTDashboard />
          <DefiProtocols />
        </div> */}

        <div className="mt-8">
          <NetworkStats />
        </div>
      </main>
    </div>
  );
}
