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
import { useDashboardInfo } from '@/src/providers/stats/solanaClusterStats';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TransactionsPageClient() {
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

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-5 flex items-center justify-between">
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
          <Select
            value={programFilter}
            onValueChange={(filter: ProgramFilter) => setProgramFilter(filter)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="system">System Program</SelectItem>
              <SelectItem value="token">Token Program</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border pt-2">
          <TransactionsTable
            programFilter={programFilter}
            blockNumber={blockNumber}
          />
        </div>
      </main>
    </div>
  );
}
