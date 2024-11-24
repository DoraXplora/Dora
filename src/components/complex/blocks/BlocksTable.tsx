'use client';

import { Button } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Switch } from '@/src/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const blocks = [
  {
    hash: '6ESrVsxs30Ps5BcuR...',
    slot: '303174328',
    time: '9 mins ago',
    leader: 'HashKey Cloud',
    txCount: 2402,
    nonVoteTx: 534,
    successRate: '95.75%',
    reward: '0.1668',
  },
  {
    hash: 'HhWNk9scJpkKokSc...',
    slot: '303174327',
    time: '9 mins ago',
    leader: 'Ice Staking',
    txCount: 1285,
    nonVoteTx: 468,
    successRate: '89.65%',
    reward: '0.03641',
  },
];

export function BlocksTable() {
  const [currentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('20');
  const [excludeVoteProgram, setExcludeVoteProgram] = useState(true);

  return (
    <TooltipProvider>
      <div className="overflow-x-auto space-y-4">
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

        <div className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Block Hash</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead className="text-right">Tx Count</TableHead>
                  <TableHead className="text-right">Non-vote Tx(s)</TableHead>
                  <TableHead className="text-right">Success Rate</TableHead>
                  <TableHead className="text-right">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blocks.map((block) => (
                  <TableRow key={block.slot}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/blocks/${block.hash}`}
                          className="font-mono text-blue-500 hover:underline"
                        >
                          {block.hash}
                        </Link>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/blocks/${block.slot}`}
                        className="font-mono text-blue-500 hover:underline"
                      >
                        {block.slot}
                      </Link>
                    </TableCell>
                    <TableCell>{block.time}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/validator/${block.leader}`}
                          className="text-blue-500 hover:underline"
                        >
                          {block.leader}
                        </Link>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {block.txCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {block.nonVoteTx.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {block.successRate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span>◎</span>
                        <span>{block.reward}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
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
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">per page</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">Page {currentPage} of 20</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
