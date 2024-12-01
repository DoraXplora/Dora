'use client';

import { Badge } from '@/src/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { useBlock, useFetchBlock } from '@/src/providers/block';
import { useCluster } from '@/src/providers/cluster';
import { ClusterStatus } from '@/src/utils/cluster';
import { parseProgramLogs } from '@/src/utils/program-logs';
import { Address } from '@components/common/Address';
import { Signature } from '@components/common/Signature';
import { SolBalance } from '@components/common/SolBalance';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  ConfirmedTransactionMeta,
  PublicKey,
  TransactionSignature,
  VersionedBlockResponse,
  VOTE_PROGRAM_ID,
} from '@solana/web3.js';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type TransactionWithInvocations = {
  index: number;
  signature?: TransactionSignature;
  meta: ConfirmedTransactionMeta | null;
  invocations: Map<string, number>;
  computeUnits?: number;
  logTruncated: boolean;
};

export type ProgramFilter = 'all' | 'votes' | 'hideVotes';
type TransactionsTableProps = {
  title?: JSX.Element;
  blockNumber: number;
};

type SortMode = '' | 'compute' | 'fee';

export function TransactionsTable({
  title,
  blockNumber,
}: TransactionsTableProps) {
  if (
    isNaN(Number(blockNumber)) ||
    Number(blockNumber) >= Number.MAX_SAFE_INTEGER ||
    Number(blockNumber) % 1 !== 0
  ) {
    notFound();
  }

  const [programFilter, setProgramFilter] = useState<ProgramFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('compute');
  const { cluster } = useCluster();

  const confirmedBlock = useBlock(Number(blockNumber));
  const fetchBlock = useFetchBlock();
  const { status } = useCluster();
  // Fetch block on load
  useEffect(() => {
    if (!confirmedBlock && status === ClusterStatus.Connected) {
      fetchBlock(Number(blockNumber));
    }
  }, [blockNumber, status]); // eslint-disable-line react-hooks/exhaustive-deps

  const block: VersionedBlockResponse | undefined = confirmedBlock?.data?.block;

  const { transactions, invokedPrograms } = useMemo(() => {
    const invokedPrograms = new Map<string, number>();

    const transactions: TransactionWithInvocations[] =
      block?.transactions.map((tx, index) => {
        let signature: TransactionSignature | undefined;
        if (tx.transaction.signatures.length > 0) {
          signature = tx.transaction.signatures[0];
        }

        const programIndexes = tx.transaction.message.compiledInstructions
          .map((ix) => ix.programIdIndex)
          .concat(
            tx.meta?.innerInstructions?.flatMap((ix) => {
              return ix.instructions.map((ix) => ix.programIdIndex);
            }) || []
          );

        const indexMap = new Map<number, number>();
        programIndexes.forEach((programIndex) => {
          const count = indexMap.get(programIndex) || 0;
          indexMap.set(programIndex, count + 1);
        });

        const invocations = new Map<string, number>();
        const accountKeys = tx.transaction.message.getAccountKeys({
          accountKeysFromLookups: tx.meta?.loadedAddresses,
        });
        indexMap.forEach((count, i) => {
          const programId = accountKeys.get(i)!.toBase58();
          invocations.set(programId, count);
          const programTransactionCount = invokedPrograms.get(programId) || 0;
          invokedPrograms.set(programId, programTransactionCount + 1);
        });

        let logTruncated = false;
        let computeUnits: number | undefined = undefined;
        try {
          const parsedLogs = parseProgramLogs(
            tx.meta?.logMessages ?? [],
            tx.meta?.err ?? null,
            cluster
          );

          logTruncated = parsedLogs[parsedLogs.length - 1].truncated;
          computeUnits = parsedLogs
            .map(({ computeUnits }) => computeUnits)
            .reduce((sum, next) => sum + next);
        } catch (err) {
          // ignore parsing errors because some old logs aren't parsable
        }

        return {
          computeUnits,
          index,
          invocations,
          logTruncated,
          meta: tx.meta,
          signature,
        };
      }) || [];
    return { invokedPrograms, transactions };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block]);

  const [filteredTransactions, showComputeUnits] = useMemo((): [
    TransactionWithInvocations[],
    boolean
  ] => {
    const voteFilter = VOTE_PROGRAM_ID.toBase58();
    const filteredTxs: TransactionWithInvocations[] = transactions.filter(
      ({ invocations }) => {
        if (programFilter === 'all') {
          return true;
        } else if (programFilter === 'hideVotes') {
          // hide vote txs that don't invoke any other programs
          return !(invocations.has(voteFilter) && invocations.size === 1);
        }
        return invocations.has(voteFilter);
      }
    );

    const showComputeUnits = filteredTxs.every(
      (tx) => tx.computeUnits !== undefined
    );

    if (sortMode === 'compute' && showComputeUnits) {
      filteredTxs.sort((a, b) => b.computeUnits! - a.computeUnits!);
    } else if (sortMode === 'fee') {
      filteredTxs.sort((a, b) => (b.meta?.fee || 0) - (a.meta?.fee || 0));
    }

    return [filteredTxs, showComputeUnits];
  }, [programFilter, sortMode, transactions]);

  return (
    <TooltipProvider>
      <div className="flex mb-5 items-center justify-between">
        {title}

        <Select
          value={programFilter}
          onValueChange={(filter: ProgramFilter) => setProgramFilter(filter)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All Transactions ({filteredTransactions.length})
            </SelectItem>
            <SelectItem value="hideVotes">
              All Except Votes (
              {filteredTransactions.length -
                (invokedPrograms.get(VOTE_PROGRAM_ID.toBase58()) || 0)}
              )
            </SelectItem>
            <SelectItem value="votes">
              Vote Transactions (
              {invokedPrograms.get(VOTE_PROGRAM_ID.toBase58()) || 0})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-t-lg border pt-2">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => setSortMode('')}
                >
                  #
                </TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Transaction Signature</TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => setSortMode('fee')}
                >
                  Fee
                </TableHead>
                {showComputeUnits && (
                  <TableHead
                    className="text-right cursor-pointer"
                    onClick={() => setSortMode('compute')}
                  >
                    Compute
                  </TableHead>
                )}
                <TableHead>Invoked Programs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <span className="block w-full text-center">
                      {programFilter === 'hideVotes'
                        ? "This block doesn't contain any non-vote transactions"
                        : programFilter === 'all'
                        ? 'This block does not contain any transactions'
                        : "This block doesn't contain any vote transactions"}
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx, i) => {
                  const statusText =
                    tx.meta?.err || !tx.signature ? 'Failed' : 'Success';
                  const statusVariant =
                    tx.meta?.err || !tx.signature ? 'destructive' : 'success';

                  return (
                    <TableRow key={i}>
                      <TableCell>{tx.index + 1}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant}>{statusText}</Badge>
                      </TableCell>
                      <TableCell>
                        {tx.signature && (
                          <Signature
                            signature={tx.signature}
                            link
                            truncateChars={48}
                          />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {tx.meta !== null ? (
                          <SolBalance lamports={tx.meta.fee} />
                        ) : (
                          'Unknown'
                        )}
                      </TableCell>
                      {showComputeUnits && (
                        <TableCell className="text-right">
                          {tx.logTruncated && '>'}
                          {tx.computeUnits !== undefined
                            ? new Intl.NumberFormat('en-US').format(
                                tx.computeUnits
                              )
                            : 'Unknown'}
                        </TableCell>
                      )}
                      <TableCell>
                        {tx.invocations.size === 0
                          ? 'NA'
                          : Array.from(tx.invocations.entries())
                              .sort()
                              .map(([programId, count], i) => (
                                <div key={i} className="flex items-center">
                                  <Address
                                    pubkey={new PublicKey(programId)}
                                    link
                                  />
                                  <span className="ml-2 text-muted-foreground">{`(${count})`}</span>
                                </div>
                              ))}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
