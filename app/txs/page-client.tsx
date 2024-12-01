'use client';

import { SearchHeader } from '@/src/components/complex/txs/SearchHeader';
import {
  TransactionsTable,
  type ProgramFilter,
} from '@/src/components/complex/txs/TransactionsTable';
import { Button } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useCluster } from '@/src/providers/cluster';
import {
  useDashboardInfo,
  useStatsProvider,
} from '@/src/providers/stats/solanaClusterStats';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TransactionsPageClient() {
  const { cluster } = useCluster();
  const { setActive } = useStatsProvider();

  useEffect(() => {
    setActive(true);
    return () => setActive(false);
  }, [setActive, cluster]);

  const dashboardInfo = useDashboardInfo();

  const { epochInfo } = dashboardInfo;
  const { blockHeight, absoluteSlot } = epochInfo;

  const isManualNavigation = useRef(false);

  const [blockNumber, setBlockNumber] = useState(Number(absoluteSlot));
  const [programFilter, setProgramFilter] = useState<ProgramFilter>('all');

  const goBackward = () => {
    isManualNavigation.current = true;
    setBlockNumber(blockNumber - 1);
  };

  const goForward = () => {
    isManualNavigation.current = true;
    setBlockNumber(blockNumber + 1);
  };

  useEffect(() => {
    if (
      epochInfo &&
      absoluteSlot !== undefined &&
      !isManualNavigation.current
    ) {
      setBlockNumber(Number(absoluteSlot));
    }

    // Reset manual navigation flag after each update
    isManualNavigation.current = false;
  }, [epochInfo, absoluteSlot]);

  const transactionsTableTitle = (
    <div className="flex items-center gap-2">
      <h1 className="text-xl font-semibold">Transactions</h1>

      <div className="flex items-center text-sm">
        <Button
          onClick={goBackward}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={blockNumber === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-mono text-blue-500">{blockNumber}</span>
        <Button
          onClick={goForward}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={blockNumber >= blockHeight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />

      <main className="container mx-auto px-4 py-8">
        <TransactionsTable
          title={transactionsTableTitle}
          blockNumber={blockNumber}
        />
      </main>
    </div>
  );
}
