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
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface BlockDetailsProps {
  blockNumber: string;
}

export function BlockDetails({ blockNumber }: BlockDetailsProps) {
  const [excludeVoteProgram, setExcludeVoteProgram] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState('10');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Block Details</h1>
        <span className="font-mono text-muted-foreground">{blockNumber}</span>
        <Button variant="outline" size="icon">
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Block</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-mono">{blockNumber}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Timestamp</span>
              <span>23 hrs ago (November 22, 2024 18:20:31 +UTC)</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Block Hash</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">
                  C8L8H9BpShJ7vb3w7XVBrjCMTEAsGyGRT3kibc4mwZVL
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Epoch</span>
              <Link href="#" className="text-primary hover:underline">
                701
              </Link>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Leader</span>
              <div className="flex items-center gap-2">
                <Link href="#" className="text-primary hover:underline">
                  BONK - Powered by Jito
                </Link>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Reward</span>
              <div className="flex items-center gap-2">
                <span>0.07484 SOL ($19.2157)</span>
                <span className="text-sm text-muted-foreground">
                  SOL price: $256.75
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">
                Transactions
              </span>
              <span>Total 1,750 transactions</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">
                Previous Block Hash
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono">
                  4FoKRmLUUyBL1NyEwHtUsno3G58R3m7TYgUaKbrEgT
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
}
