'use client';

import { Address } from '@/src/components/common/Address';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { Block, FetchStatus } from '@/src/providers/block';
import { CacheEntry } from '@/src/providers/cache';
import { useCluster } from '@/src/providers/cluster';
import { lamportsToSolString } from '@/src/utils';
import {
  displayTimestamp,
  displayTimestampUtc,
  formatRelativeTime,
} from '@/src/utils/date';
import { getEpochForSlot } from '@/src/utils/epoch-schedule';
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import BlockTransactionsTable from './BlockTransactionsTable';

interface BlockDetailsProps {
  slot: number;
  confirmedBlock: CacheEntry<Block> | undefined;
}

export function BlockDetails({ slot, confirmedBlock }: BlockDetailsProps) {
  const { clusterInfo } = useCluster();

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
                  <Link
                    href={`/blocks/${block.parentSlot}`}
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'icon',
                      className: 'h-6 w-6',
                    })}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                  <span className="font-mono">{block.parentSlot + 1}</span>
                  <Link
                    href={`/blocks/${block.parentSlot + 2}`}
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
                      {formatRelativeTime(new Date(block.blockTime))} (
                      {displayTimestamp(block.blockTime * 1000, true)})
                    </span>
                  </div>
                  <div className="grid grid-cols-[100px,1fr] gap-4">
                    <span className="text-sm text-muted-foreground">
                      Timestamp (UTC)
                    </span>
                    <span>
                      {formatRelativeTime(new Date(block.blockTime))} (
                      {displayTimestampUtc(block.blockTime * 1000, true)})
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
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">Epoch</span>
                <Link
                  href={`/epochs/${epoch}`}
                  className="text-primary hover:underline"
                >
                  {epoch}
                </Link>
              </div>
              {blockLeader ? (
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-sm text-muted-foreground">Leader</span>
                  <div className="flex items-center gap-2">
                    {/* <Link href="#" className="text-primary hover:underline">
                    {wee}
                  </Link>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Copy className="h-4 w-4" />
                  </Button> */}
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
          {/* <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Transactions</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Exclude Vote Program</span>
                  <Switch
                    checked={excludeVoteProgram}
                    onCheckedChange={setExcludeVoteProgram}
                  />
                </div>
                <Select
                  value={selectedProgram}
                  onValueChange={setSelectedProgram}
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
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Signature</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Instructions</TableHead>
                  <TableHead>By</TableHead>
                  <TableHead className="text-right">Value (SOL)</TableHead>
                  <TableHead className="text-right">Fee (SOL)</TableHead>
                  <TableHead>Programs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        href="#"
                        className="font-mono text-primary hover:underline"
                      >
                        27EgytdgyetBzb...
                      </Link>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="#"
                      className="font-mono text-primary hover:underline"
                    >
                      302980699
                    </Link>
                  </TableCell>
                  <TableCell>23 hrs ago</TableCell>
                  <TableCell>
                    <Badge variant="outline">buy</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        href="#"
                        className="font-mono text-primary hover:underline"
                      >
                        7WLZNSHMbT...
                      </Link>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">0.001415</TableCell>
                  <TableCell className="text-right">0.001415</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded bg-primary/20" />
                      <div className="h-4 w-4 rounded bg-primary/20" />
                      <Badge variant="secondary">2+</Badge>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show</span>
                <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm">per page</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">Page 1 of 43</span>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div> */}
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
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      {content}
    </div>
  );
}
