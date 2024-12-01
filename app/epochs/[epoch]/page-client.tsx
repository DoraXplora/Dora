'use client';

import { EpochDetails } from '@/src/components/complex/epochs/EpochDetails';
import { SearchHeader } from '@/src/components/complex/txs/SearchHeader';

export default function EpochPageClient({ epoch }: { epoch: number }) {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <EpochDetails epoch={epoch} />
      </main>
    </div>
  );
}
