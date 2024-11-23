'use client';

import { Badge } from '@/src/components/ui/badge';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { formatRelativeTime } from '@/src/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const transactions = [
  {
    signature: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd8',
    block: 303171622,
    time: new Date(Date.now() - 30 * 1000),
    instruction: { type: 'swap', count: '2+' },
    by: '7dGcLiRYta...sELwYpuuMu',
    value: '0.00005743',
    fee: '0.00005743',
    programs: ['system', 'token', 'compute'],
  },
  {
    signature: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7',
    block: 303171622,
    time: new Date(Date.now() - 36 * 1000),
    instruction: { type: 'placeTradeOrder', count: '' },
    by: 'MEV-Bot-7kmm...jnG',
    value: '0.000055',
    fee: '0.000055',
    programs: ['raydium'],
  },
];

export function TransactionsTable() {
  const [currentPage] = useState(21);
  const [itemsPerPage, setItemsPerPage] = useState('20');
  const [excludeVoteProgram, setExcludeVoteProgram] = useState(true);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">Block:</span>
            <div className="flex items-center gap-1">
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

        <div className="rounded-lg border">
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
              {transactions.map((tx) => (
                <TableRow key={tx.signature}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/txs/${tx.signature}`}
                        className="font-mono text-blue-500 hover:underline"
                      >
                        {tx.signature.substring(0, 10)}...
                      </Link>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/blocks/${tx.block}`}
                      className="font-mono ext-blue-500 hover:underline"
                    >
                      {tx.block}
                    </Link>
                  </TableCell>
                  <TableCell>{formatRelativeTime(tx.time)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{tx.instruction.type}</Badge>
                      {tx.instruction.count && (
                        <Badge variant="secondary">
                          {tx.instruction.count}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-blue-500">{tx.by}</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {tx.value}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {tx.fee}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {tx.programs.map((program, index) => (
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
            <span className="text-sm">Page {currentPage} of 21</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
