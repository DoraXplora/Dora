'use client';

import { Address } from '@/src/components/common/Address';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { Block, FetchStatus } from '@/src/providers/block';
import { CacheEntry } from '@/src/providers/cache';
import { useCluster } from '@/src/providers/cluster';
import { lamportsToSolString } from '@/src/utils';
import { displayTimestamp, displayTimestampUtc } from '@/src/utils/date';
import { formatRelative } from 'date-fns';
import { getEpochForSlot } from '@/src/utils/epoch-schedule';
import { useClusterPath } from '@/src/utils/url';
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { Epoch } from '../../common/Epoch';
import BlockTransactionsTable from './BlockTransactionsTable';

interface BlockDetailsProps {
  slot: number;
  confirmedBlock: CacheEntry<Block> | undefined;
}

export function BlockDetails({ slot, confirmedBlock }: BlockDetailsProps) {
  const { clusterInfo } = useCluster();

  const previousBlockPath = useClusterPath({ pathname: `/blocks/${slot - 1}` });
  const nextBlockPath = useClusterPath({ pathname: `/blocks/${slot + 1}` });

  let content;
  if (!confirmedBlock || confirmedBlock.status === FetchStatus.Fetching) {
    content = <div>Loading block</div>;
  } else if (
    confirmedBlock.data === undefined ||
    confirmedBlock.status === FetchStatus.FetchFailed
  ) {
    content = <div>Failed to fetch block</div>;
  } else if (confirmedBlock.data.block === undefined) {
    content = <div>{`Block ${slot} was not found`}</div>;
  } else {
    const { block, blockLeader } = confirmedBlock.data;

    const epoch = clusterInfo
      ? getEpochForSlot(clusterInfo.epochSchedule, BigInt(slot))
      : undefined;

    content = (
      <>
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">Block</span>
                <div className="flex items-center gap-2">
                  {slot !== 0 && (
                    <Link
                      href={previousBlockPath}
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'icon',
                        className: 'h-6 w-6',
                      })}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  )}
                  <span className="font-mono">{slot}</span>
                  <Link
                    href={nextBlockPath}
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'icon',
                      className: 'h-6 w-6',
                    })}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              {block.blockTime ? (
                <>
                  <div className="grid grid-cols-[100px,1fr] gap-4">
                    <span className="text-sm text-muted-foreground">
                      Timestamp (Local)
                    </span>
                    <span>
                      {formatRelative(
                        new Date(block.blockTime * 1000),
                        new Date()
                      )}{' '}
                      ({displayTimestamp(block.blockTime * 1000, true)})
                    </span>
                  </div>
                  <div className="grid grid-cols-[100px,1fr] gap-4">
                    <span className="text-sm text-muted-foreground">
                      Timestamp (UTC)
                    </span>
                    <span>
                      {formatRelative(
                        new Date(block.blockTime * 1000),
                        new Date()
                      )}{' '}
                      ({displayTimestampUtc(block.blockTime * 1000, true)})
                    </span>
                  </div>
                </>
              ) : null}
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">
                  Block Hash
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{block.blockhash}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {epoch ? (
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-sm text-muted-foreground">Epoch</span>
                  <Epoch epoch={epoch} link />
                </div>
              ) : null}
              {blockLeader ? (
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-sm text-muted-foreground">Leader</span>
                  <div className="flex items-center gap-2">
                    <Address pubkey={blockLeader} alignRight link />
                  </div>
                </div>
              ) : null}
              {block.rewards ? (
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-sm text-muted-foreground">Reward</span>
                  <div className="flex items-center gap-2">
                    <span>
                      {lamportsToSolString(
                        block.rewards.reduce(
                          (total, reward) => total + reward.lamports,
                          0
                        )
                      )}{' '}
                      SOL ($19.2157)
                    </span>
                    <span className="text-sm text-muted-foreground">
                      SOL price: $256.75
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">
                  Transactions
                </span>
                <span>Total {block.transactions.length} transactions</span>
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">
                  Previous Block Hash
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{block.previousBlockhash}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <BlockTransactionsTable block={block} />
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Block Details</h1>
        <span className="font-mono text-muted-foreground">{slot}</span>
        <Button variant="outline" size="icon">
          <Copy
            className="h-4 w-4"
            onClick={() => navigator.clipboard.writeText(slot.toString())}
          />
        </Button>
      </div>

      {content}
    </div>
  );
}
