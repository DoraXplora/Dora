'use client';

import { ErrorCard } from '@/src/components/common/ErrorCard';
import {
  TransactionsTable,
  type ProgramFilter,
} from '@/src/components/complex/txs/TransactionsTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Button } from '@/src/components/ui/button';
import { useBlock, useFetchBlock } from '@/src/providers/block';
import { FetchStatus } from '@/src/providers/cache';
import { useCluster } from '@/src/providers/cluster';
import { useDashboardInfo } from '@/src/providers/stats/solanaClusterStats';
import { ClusterStatus } from '@/src/utils/cluster';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardTransactionsTable() {
  const dashboardInfo = useDashboardInfo();

  const { epochInfo } = dashboardInfo;
  const { blockHeight } = epochInfo;

  const [blockNumber, setBlockNumber] = useState(Number(blockHeight));
  const [programFilter, setProgramFilter] = useState<ProgramFilter>('all');

  const confirmedBlock = useBlock(Number(blockNumber));
  const fetchBlock = useFetchBlock();
  const { status } = useCluster();
  // Fetch block on load
  useEffect(() => {
    if (!confirmedBlock && status === ClusterStatus.Connected) {
      fetchBlock(Number(blockNumber));
    }
  }, [blockNumber, status]); // eslint-disable-line react-hooks/exhaustive-deps

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

      {confirmedBlock && confirmedBlock.data && confirmedBlock.data.block ? (
        <TransactionsTable
          programFilter={programFilter}
          block={confirmedBlock.data.block}
        />
      ) : (
        <ErrorCard
          text={
            FetchStatus.Fetching
              ? 'Fetching block'
              : FetchStatus.FetchFailed
              ? 'Unable to fetch block transactions'
              : 'Invalid block'
          }
        />
      )}
    </div>
  );
}
