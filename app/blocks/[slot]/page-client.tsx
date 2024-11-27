'use client';

import { BlockDetails } from '@/src/components/complex/blocks/BlockDetails';
import { SearchHeader } from '@/src/components/complex/txs/SearchHeader';
import { useBlock, useFetchBlock } from '@/src/providers/block';
import { useCluster } from '@/src/providers/cluster';
import { ClusterStatus } from '@/src/utils/cluster';
import { useEffect } from 'react';

export default function BlockPageClient({ slot }: { slot: number }) {
  const confirmedBlock = useBlock(slot);
  const fetchBlock = useFetchBlock();
  const { status } = useCluster();
  // Fetch block on load
  useEffect(() => {
    if (!confirmedBlock && status === ClusterStatus.Connected) {
      fetchBlock(slot);
    }
  }, [slot, status]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isNaN(slot) || slot >= Number.MAX_SAFE_INTEGER || slot % 1 !== 0) {
    return <div>Invalid slot number</div>; // TODO: Update this
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        {confirmedBlock && confirmedBlock.data && confirmedBlock.data.block ? (
          <BlockDetails slot={slot} confirmedBlock={confirmedBlock} />
        ) : null}{' '}
        {/* TODO: Loading indicator */}
      </main>
    </div>
  );
}
