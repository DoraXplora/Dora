'use client';

import { buttonVariants } from '@/src/components/ui/button';
import { displayTimestampUtc, formatRelativeTime } from '@/src/utils/date';
import { DataTable, DataTableColumnHeader } from '@components/ui/data-table';
import { Switch } from '@components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowRight, Copy, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Block = {
  hash: string;
  slot: number;
  time: Date;
  leader: string;
  txCount: number;
  nonVoteTx: number;
  successRate: number;
  reward: number;
};

const blocks: Block[] = [
  {
    hash: '6ESrVsxs30Ps5BcuR...',
    slot: 303174328,
    time: new Date(Date.now() - 8 * 60 * 1000),
    leader: 'HashKey Cloud',
    txCount: 2402,
    nonVoteTx: 534,
    successRate: 95.75,
    reward: 0.1668,
  },
  {
    hash: 'HhWNk9scJpkKokSc...',
    slot: 303174327,
    time: new Date(Date.now() - 9 * 60 * 1000),
    leader: 'Ice Staking',
    txCount: 1285,
    nonVoteTx: 468,
    successRate: 89.65,
    reward: 0.03641,
  },
];

const columns: ColumnDef<Block>[] = [
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
            {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
            <span className="sr-only">View more info</span>
            <Eye className="h-4 w-4" />
            {/* </Button> */}
          </TooltipTrigger>
          <TooltipContent>
            <p>More Info</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'hash',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hash" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/blocks/${row.getValue('slot')}`}
          className="font-mono text-blue-500 hover:underline"
        >
          {row.getValue('hash')}
        </Link>
        <Tooltip>
          <TooltipTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'h-4 w-4',
            })}
          >
            {/* <Button variant="ghost" size="icon" className="h-4 w-4"> */}
            <Copy
              className="h-3 w-3"
              onClick={() =>
                navigator.clipboard.writeText(row.getValue('hash'))
              }
            />
            {/* </Button> */}
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: 'slot',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slot" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/blocks/${row.getValue('slot')}`}
        className="font-mono text-blue-500 hover:underline"
      >
        {row.getValue('slot')}
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
    accessorKey: 'leader',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leader" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/address/${row.getValue('leader')}`}
          className="font-mono text-blue-500 hover:underline"
        >
          {row.getValue('leader')}
        </Link>
        <Tooltip>
          <TooltipTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'h-4 w-4',
            })}
          >
            <Copy
              className="h-3 w-3"
              onClick={() =>
                navigator.clipboard.writeText(row.getValue('leader'))
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: 'txCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tx Count" />
    ),
  },
  {
    accessorKey: 'nonVoteTx',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Non-vote Tx(s)" />
    ),
  },
  {
    accessorKey: 'successRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Success Rate" />
    ),
  },
  {
    accessorKey: 'reward',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reward" />
    ),
  },
];

export function BlocksTable() {
  const [excludeVoteProgram, setExcludeVoteProgram] = useState(true);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Recent Blocks</span>
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
            <DataTable data={blocks} columns={columns} selectable={false} />
          </div>

          <Link
            className={
              buttonVariants({ variant: 'secondary' }) +
              ' flex !gap-1 items-center text-xs w-full !text-slate-500'
            }
            href="/blocks"
          >
            VIEW ALL BLOCKS
            <ArrowRight height={2} width={2} />
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}
