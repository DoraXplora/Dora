import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { pickClusterParams } from '@/src/utils/url';
import { Address } from '@components/common/Address';
import { ErrorCard } from '@components/common/ErrorCard';
import { Signature } from '@components/common/Signature';
import { SolBalance } from '@components/common/SolBalance';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { useCluster } from '@providers/cluster';
import {
  ConfirmedTransactionMeta,
  PublicKey,
  TransactionSignature,
  VersionedBlockResponse,
  VOTE_PROGRAM_ID,
} from '@solana/web3.js';
import { parseProgramLogs } from '@utils/program-logs';
import { displayAddress } from '@utils/tx';
import Link from 'next/link';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React, { useMemo } from 'react';

const PAGE_SIZE = 25;

const useQueryProgramFilter = (query: ReadonlyURLSearchParams): string => {
  const filter = query.get('filter');
  return filter || '';
};

const useQueryAccountFilter = (
  query: ReadonlyURLSearchParams
): PublicKey | null => {
  const filter = query.get('accountFilter');
  if (filter !== null) {
    try {
      return new PublicKey(filter);
    } catch {
      /* empty */
    }
  }
  return null;
};

type SortMode = 'index' | 'compute' | 'fee';
const useQuerySort = (query: ReadonlyURLSearchParams): SortMode => {
  const sort = query.get('sort');
  if (sort === 'compute') return 'compute';
  if (sort === 'fee') return 'fee';
  return 'index';
};

type TransactionWithInvocations = {
  index: number;
  signature?: TransactionSignature;
  meta: ConfirmedTransactionMeta | null;
  invocations: Map<string, number>;
  computeUnits?: number;
  logTruncated: boolean;
};

export default function BlockTransactionsTable({
  block,
}: {
  block: VersionedBlockResponse;
}) {
  const [numDisplayed, setNumDisplayed] = React.useState(PAGE_SIZE);
  const currentPathname = usePathname();
  const currentSearchParams = useSearchParams();
  const programFilter = useQueryProgramFilter(currentSearchParams);
  const accountFilter = useQueryAccountFilter(currentSearchParams);
  const sortMode = useQuerySort(currentSearchParams);
  const router = useRouter();
  const { cluster } = useCluster();

  const handleSort = (sortType: string) => {
    const additionalParams = new URLSearchParams(
      currentSearchParams?.toString()
    );
    additionalParams.set('sort', 'compute');
    router.push(
      pickClusterParams(currentPathname, currentSearchParams, additionalParams)
    );
  };

  const { transactions, invokedPrograms } = React.useMemo(() => {
    const invokedPrograms = new Map<string, number>();

    const transactions: TransactionWithInvocations[] = block.transactions.map(
      (tx, index) => {
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
      }
    );
    return { invokedPrograms, transactions };
  }, [block, cluster]);

  const [filteredTransactions, showComputeUnits] = React.useMemo((): [
    TransactionWithInvocations[],
    boolean
  ] => {
    const voteFilter = VOTE_PROGRAM_ID.toBase58();
    const filteredTxs: TransactionWithInvocations[] = transactions
      .filter(({ invocations }) => {
        if (programFilter === ALL_TRANSACTIONS) {
          return true;
        } else if (programFilter === HIDE_VOTES) {
          // hide vote txs that don't invoke any other programs
          return !(invocations.has(voteFilter) && invocations.size === 1);
        }
        return invocations.has(programFilter);
      })
      .filter(({ index }) => {
        if (accountFilter === null) {
          return true;
        }

        const tx = block.transactions[index];
        const accountKeys = tx.transaction.message.getAccountKeys({
          accountKeysFromLookups: tx.meta?.loadedAddresses,
        });
        return accountKeys
          .keySegments()
          .flat()
          .find((key) => key.equals(accountFilter));
      });

    const showComputeUnits = filteredTxs.every(
      (tx) => tx.computeUnits !== undefined
    );

    if (sortMode === 'compute' && showComputeUnits) {
      filteredTxs.sort((a, b) => b.computeUnits! - a.computeUnits!);
    } else if (sortMode === 'fee') {
      filteredTxs.sort((a, b) => (b.meta?.fee || 0) - (a.meta?.fee || 0));
    }

    return [filteredTxs, showComputeUnits];
  }, [
    block.transactions,
    transactions,
    programFilter,
    accountFilter,
    sortMode,
  ]);

  if (transactions.length === 0) {
    return <ErrorCard text="This block has no transactions" />;
  }

  let title: string;
  if (filteredTransactions.length === transactions.length) {
    title = `Block Transactions (${filteredTransactions.length})`;
  } else {
    title = `Filtered Block Transactions (${filteredTransactions.length}/${transactions.length})`;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <FilterDropdown
          filter={programFilter}
          invokedPrograms={invokedPrograms}
          totalTransactionCount={transactions.length}
        />
      </CardHeader>

      {accountFilter !== null && (
        <CardContent>
          <p>
            Showing transactions which load account:
            <span className="ml-2 inline-block">
              <Address pubkey={new PublicKey(accountFilter)} link />
            </span>
          </p>
        </CardContent>
      )}

      {filteredTransactions.length === 0 ? (
        <CardContent>
          {accountFilter === null && programFilter === 'HIDE_VOTES'
            ? "This block doesn't contain any non-vote transactions"
            : 'No transactions found with this filter'}
        </CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('')}
                >
                  #
                </TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Transaction Signature</TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort('fee')}
                >
                  Fee
                </TableHead>
                {showComputeUnits && (
                  <TableHead
                    className="text-right cursor-pointer"
                    onClick={() => handleSort('compute')}
                  >
                    Compute
                  </TableHead>
                )}
                <TableHead>Invoked Programs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.slice(0, numDisplayed).map((tx, i) => {
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
              })}
            </TableBody>
          </Table>
        </CardContent>
      )}

      {filteredTransactions.length > numDisplayed && (
        <CardFooter>
          <Button
            className="w-full"
            onClick={() =>
              setNumDisplayed((displayed) => displayed + PAGE_SIZE)
            }
          >
            Load More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

type FilterProps = {
  filter: string;
  invokedPrograms: Map<string, number>;
  totalTransactionCount: number;
};

const ALL_TRANSACTIONS = 'all';
const HIDE_VOTES = '';

type FilterOption = {
  name: string;
  programId: string;
  transactionCount: number;
};

const FilterDropdown = ({
  filter,
  invokedPrograms,
  totalTransactionCount,
}: FilterProps) => {
  const { cluster } = useCluster();
  const defaultFilterOption: FilterOption = {
    name: 'All Except Votes',
    programId: HIDE_VOTES,
    transactionCount:
      totalTransactionCount -
      (invokedPrograms.get(VOTE_PROGRAM_ID.toBase58()) || 0),
  };

  const allTransactionsOption: FilterOption = {
    name: 'All Transactions',
    programId: ALL_TRANSACTIONS,
    transactionCount: totalTransactionCount,
  };

  let currentFilterOption =
    filter !== ALL_TRANSACTIONS ? defaultFilterOption : allTransactionsOption;

  const filterOptions: FilterOption[] = [
    defaultFilterOption,
    allTransactionsOption,
  ];

  invokedPrograms.forEach((transactionCount, programId) => {
    const name = displayAddress(programId, cluster);
    if (filter === programId) {
      currentFilterOption = {
        name: `${name} Transactions (${transactionCount})`,
        programId,
        transactionCount,
      };
    }
    filterOptions.push({ name, programId, transactionCount });
  });

  filterOptions.sort((a, b) => {
    if (a.transactionCount !== b.transactionCount) {
      return b.transactionCount - a.transactionCount;
    } else {
      return b.name > a.name ? -1 : 1;
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currentFilterOption.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {filterOptions.map(({ name, programId, transactionCount }) => (
          <DropdownMenuItem key={name}>
            <FilterLink
              currentFilter={filter}
              key={programId}
              name={name}
              programId={programId}
              transactionCount={transactionCount}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function FilterLink({
  currentFilter,
  name,
  programId,
  transactionCount,
}: {
  currentFilter: string;
  name: string;
  programId: string;
  transactionCount: number;
}) {
  const currentSearchParams = useSearchParams();
  const currentPathname = usePathname();
  const href = useMemo(() => {
    const params = new URLSearchParams(currentSearchParams?.toString());
    if (name === HIDE_VOTES) {
      params.delete('filter');
    } else {
      params.set('filter', programId);
    }
    const nextQueryString = params.toString();
    return `${currentPathname}${nextQueryString ? `?${nextQueryString}` : ''}`;
  }, [currentPathname, currentSearchParams, name, programId]);
  return (
    <Link
      className={`dropdown-item${programId === currentFilter ? ' active' : ''}`}
      href={href}
      key={programId}
    >
      {`${name} (${transactionCount})`}
    </Link>
  );
}
