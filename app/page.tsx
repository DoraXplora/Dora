import { Search } from 'lucide-react';
// import { TopMarkets } from '@/src/components/complex/top-markets';
import { StatsCards } from '@/src/components/base/stats-cards';
import { DefiDashboard } from '@/src/components/complex/home/defi-dashboard';
import { DefiProtocols } from '@/src/components/complex/home/defi-protocols';
import { NetworkStats } from '@/src/components/complex/home/network-stats';
import { NFTDashboard } from '@/src/components/complex/home/nft-dashboard';
import { TransactionsTable } from '@/src/components/complex/txs/transactions-table';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="container mx-auto px-4 py-5 md:py-10">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions, blocks, programs and tokens"
              className="w-full rounded-lg bg-white/10 px-4 py-3 pl-12 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* <TopMarkets /> */}
        <StatsCards />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <TransactionsTable />
          <DefiDashboard />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <NFTDashboard />
          <DefiProtocols />
        </div>

        <div className="mt-8">
          <NetworkStats />
        </div>
      </main>
    </div>
  );
}
