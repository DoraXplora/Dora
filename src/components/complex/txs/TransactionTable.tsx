'use client';

import { Badge } from '@/src/components/ui/badge';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { Switch } from '@/src/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { displayTimestampUtc, formatRelativeTime } from '@/src/utils/date';
import { DataTable, DataTableColumnHeader } from '@components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowRight, ChevronLeft, ChevronRight, Copy, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Transaction = {
  signature: string;
  block: number;
  time: Date;
  instruction: { type: string; count: string };
  by: string;
  value: number;
  fee: number;
  programs: string[];
};

const transactions: Transaction[] = [
  {
    signature: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd8',
    block: 303171622,
    time: new Date(Date.now() - 30 * 1000),
    instruction: { type: 'swap', count: '2+' },
    by: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd8',
    value: 0.00005743,
    fee: 0.00005743,
    programs: ['system', 'token', 'compute'],
  },
  {
    signature: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7',
    block: 303171622,
    time: new Date(Date.now() - 36 * 1000),
    instruction: { type: 'placeTradeOrder', count: '' },
    by: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd8',
    value: 0.000055,
    fee: 0.000055,
    programs: ['raydium'],
  },
];

const columns: ColumnDef<Transaction>[] = [
  // SelectColumn<Block>({
  //   id: 'select',
  // }),
  {
    id: 'actions',
    cell: ({ row }) => {
      const selectedItem = row.original;

      return (
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">View more info</span>
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>More Info</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'signature',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Signature" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/txs/${row.getValue('signature')}`}
          className="font-mono text-blue-500 hover:underline"
        >
          {(row.getValue('signature') as string).substring(0, 10)}...
        </Link>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Copy
                className="h-3 w-3"
                onClick={() =>
                  navigator.clipboard.writeText(row.getValue('signature'))
                }
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: 'block',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Block" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/blocks/${row.getValue('block')}`}
        className="font-mono text-blue-500 hover:underline"
      >
        {row.getValue('block')}
      </Link>
    ),
  },
  {
    accessorKey: 'time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <p className="w-max">{formatRelativeTime(row.getValue('time'))}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{displayTimestampUtc((row.getValue('time') as Date).getTime())}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'instruction',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tx Count" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Badge variant="outline">{row.original.instruction.type}</Badge>
        {row.original.instruction.count && (
          <Badge variant="secondary">{row.original.instruction.count}</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'by',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="By" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/address/${row.getValue('by')}`}
          className="font-mono text-blue-500 hover:underline"
        >
          {(row.getValue('by') as string).substring(0, 4)}...
          {(row.getValue('by') as string).substring(
            (row.getValue('by') as string).length - 4
          )}
        </Link>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Copy
                className="h-3 w-3"
                onClick={() =>
                  navigator.clipboard.writeText(row.getValue('by'))
                }
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
  },
  {
    accessorKey: 'fee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fee" />
    ),
  },
  {
    accessorKey: 'programs',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Programs" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.original.programs.map((program, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div className="h-4 w-4 rounded bg-blue-500/20" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{program}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    ),
  },
];

export function TransactionsTable() {
  const [excludeVoteProgram, setExcludeVoteProgram] = useState(true);

  return (
    <TooltipProvider>
      <div className="overflow-x-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">Recent Transactions</span>
            <div className="flex items-center text-sm">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-mono text-blue-500">303171622</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Exclude Vote Program</span>
            <Switch
              checked={excludeVoteProgram}
              onCheckedChange={setExcludeVoteProgram}
            />
          </div>
        </div>

        <div className="rounded-lg border pt-2">
          <div className="overflow-x-auto">
            <DataTable
              data={transactions}
              columns={columns}
              selectable={false}
            />
          </div>

          <Link
            className={
              buttonVariants({ variant: 'secondary' }) +
              ' flex !gap-1 items-center text-xs w-full !text-slate-500'
            }
            href="/txs"
          >
            VIEW ALL TRANSACTIONS
            <ArrowRight height={2} width={2} />
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}
