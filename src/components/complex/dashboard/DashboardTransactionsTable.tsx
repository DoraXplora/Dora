'use client';

import {
  TransactionsTable,
  type ProgramFilter,
} from '@/src/components/complex/txs/TransactionsTable';
import { Button, buttonVariants } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useDashboardInfo } from '@/src/providers/stats/solanaClusterStats';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardTransactionsTable() {
  const dashboardInfo = useDashboardInfo();

  const { epochInfo } = dashboardInfo;
  const { blockHeight, absoluteSlot } = epochInfo;

  const [blockNumber, setBlockNumber] = useState(Number(absoluteSlot));
  const [programFilter, setProgramFilter] = useState<ProgramFilter>('all');

  return (
    <div className="overflow-x-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Recent Transactions</span>
          <div className="flex items-center text-sm">
            <Button
              onClick={() => setBlockNumber(blockNumber - 1)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={blockNumber === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-mono text-blue-500">{blockNumber}</span>
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

      <div className="rounded-lg border pt-2">
        <TransactionsTable
          programFilter={programFilter}
          blockNumber={blockNumber}
        />

        <Link
          className={buttonVariants({
            variant: 'secondary',
            className:
              'flex !gap-1 items-center text-xs w-full !text-slate-500',
          })}
          href="/txs"
        >
          VIEW ALL TRANSACTIONS
          <ArrowRight height={2} width={2} />
        </Link>
      </div>
    </div>
  );
}
