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
import { useState } from 'react';

export default function TransactionsPage() {
  const dashboardInfo = useDashboardInfo();

  const { epochInfo } = dashboardInfo;
  const { blockHeight, absoluteSlot } = epochInfo;

  const [blockNumber, setBlockNumber] = useState(Number(absoluteSlot));
  const [programFilter, setProgramFilter] = useState<ProgramFilter>('all');

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold mb-6">Transactions</h1>

            <div className="flex items-center text-sm">
              <Button
                onClick={() => setBlockNumber(blockNumber - 1)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-mono text-blue-500">{blockHeight}</span>
              <Button
                onClick={() => setBlockNumber(blockNumber + 1)}
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

        <TransactionsTable
          programFilter={programFilter}
          blockNumber={blockNumber}
        />
      </main>
    </div>
  );
}
