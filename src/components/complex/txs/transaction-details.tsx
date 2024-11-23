'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { Copy, ExternalLink } from 'lucide-react';

interface TransactionDetailsProps {
  signature: string;
}

export function TransactionDetails({ signature: id }: TransactionDetailsProps) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Transaction Details</h1>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sol-balance">SOL Balance Change</TabsTrigger>
            <TabsTrigger value="token-balance">
              Token Balance Change
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Signature</div>
                <div className="font-mono text-sm">{id}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">
                  Block & Timestamp
                </div>
                <div className="mt-1 font-mono text-sm">303171622</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  2 mins ago (November 23, 2024 17:07:03 UTC)
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Result</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">SUCCESS</Badge>
                  <span className="text-sm text-muted-foreground">
                    Finalized (MAX Confirmations)
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="space-y-4">
                <div className="flex flex-col gap-y-5">
                  <div className="self-start text-sm">Transaction Actions</div>

                  <div className="space-y-2">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Transfer from</span>
                        <code className="text-primary">6goud...VyJaP</code>
                        <span>to</span>
                        <code className="text-primary">Jfodp.5</code>
                        <span>for</span>
                        <Badge>0.000065 SOL</Badge>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Swap</span>
                        <Badge>0.010000001 SOL</Badge>
                        <span>for</span>
                        <Badge>145,488.898026 R.LP</Badge>
                        <span>on</span>
                        <Badge variant="secondary">Pump.fun</Badge>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Transfer from</span>
                        <code className="text-primary">6goud...VyJaP</code>
                        <span>to</span>
                        <code className="text-primary">
                          Pump.fun Fee Account
                        </code>
                        <span>for</span>
                        <Badge>0.0001 SOL</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sol-balance" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Address</TableHead>
                  <TableHead className="text-right">Balance Before</TableHead>
                  <TableHead className="text-right">Balance After</TableHead>
                  <TableHead className="text-right">Change (SOL)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">
                        6goud1i7kpFwpWeVCMX4e6FoGRq1DYGs7yQcVyJaP
                      </span>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          WRITABLE
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          SIGNER
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          FEE PAYER
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">0.701029835</TableCell>
                  <TableCell className="text-right">0.760569834</TableCell>
                  <TableCell className="text-right text-red-500">
                    -0.000300001
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">Jfodp.5</span>
                      <Badge variant="outline" className="text-xs">
                        WRITABLE
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">0.022087889</TableCell>
                  <TableCell className="text-right">0.022152889</TableCell>
                  <TableCell className="text-right text-green-500">
                    +0.000065
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="token-balance" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Balance Before</TableHead>
                  <TableHead className="text-right">Balance After</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Change Value</TableHead>
                  <TableHead>Token</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">
                        Pump.fun (R.LP) Vault
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">
                    <span className="text-primary">
                      Pump.fun (R.LP) Bonding Curve
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    611,418,274.48348
                  </TableCell>
                  <TableCell className="text-right">
                    611,418,274.48348
                  </TableCell>
                  <TableCell className="text-right">0</TableCell>
                  <TableCell className="text-right">0</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>R.LP</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Signature</div>
              <div className="font-mono text-sm">
                2Jk5dBZY1S2EArfjLAngAuZEpDXcGVqprMmvY1q2aL63eDBR9tnRtVsFdzogh8qcaFXsTYcGSMpgoT2sqq8NCbHRS
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Block</div>
              <div className="mt-1 font-mono text-sm">302978274</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Timestamp</div>
              <div className="mt-1 text-sm">
                1 hr ago (November 22, 2024 18:02:38 UTC)
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Result</div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">SUCCESS</Badge>
                  <span className="text-sm text-muted-foreground">
                    Finalized (MAX Confirmations)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="details" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:mb-4">
                <div className="flex items-center justify-between w-full">
                  <span>Instruction Details</span>
                  <Button variant="link" className="text-blue-500 text-sm">
                    Hide details
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 px-4 pb-4">
                {/* Instruction #1 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      #1 - Compute Budget: SetComputeUnitLimit
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Raw</span>
                      <Switch />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[100px,1fr] gap-4">
                      <span className="text-sm text-muted-foreground">
                        Action
                      </span>
                      <div className="bg-muted rounded p-2 text-sm">
                        Set 15,000 compute units
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-4">
                      <span className="text-sm text-muted-foreground">
                        Interact With
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Compute Budget - </span>
                        <code className="text-xs text-primary">
                          ComputeBudget111111111111111111111111111111
                        </code>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instruction #4 - System Program Transfer */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      #4 - System Program: Transfer
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Raw</span>
                      <Switch />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[100px,1fr] gap-4">
                      <span className="text-sm text-muted-foreground">
                        Interact With
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">System Program - </span>
                        <code className="text-xs text-primary">
                          11111111111111111111111111111111
                        </code>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-4">
                      <span className="text-sm text-muted-foreground">
                        Source
                      </span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-primary">
                          oQDmXAbLbMuK1ESaGnXTT7CyvWCqLyERSJA9HCY47
                        </code>
                        <Badge variant="outline" className="text-xs">
                          WRITABLE
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          SIGNER
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          FEE PAYER
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-4">
                      <span className="text-sm text-muted-foreground">
                        Amount
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">0.000019629</span>
                        <Badge>SOL</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="logs" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:mb-4">
                <div className="flex items-center justify-between w-full">
                  <span>Program Logs</span>
                  <Button variant="link" className="text-blue-500 text-sm">
                    Hide details
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-4 pb-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    #1 Compute Budget instruction
                  </h3>
                  <div className="text-sm text-emerald-400">
                    {'>'} Program returned success
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    #2 Compute Budget instruction
                  </h3>
                  <div className="text-sm text-emerald-400">
                    {'>'} Program returned success
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">#3 SolFi instruction</h3>
                  <div className="text-sm text-muted-foreground">
                    {'>'} Program log:
                    @@@@K-Xer7ijUcYNiBsra@HztUxn2vz0qELAJzch1ZTBxQUAAAAAAAN8UDiAAAAAAAAAAAAAAAA=
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {'>'} Program SolFi consumed 7930 of 14700 compute units
                  </div>
                  <div className="text-sm text-emerald-400">
                    {'>'} Program returned success
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    #4 System Program instruction
                  </h3>
                  <div className="text-sm text-emerald-400">
                    {'>'} Program returned success
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          A transaction is a cryptographically signed instruction that changes
          the blockchain state. Block explorers track the details of all
          transactions in the network.{' '}
          <a href="#" className="text-primary hover:underline">
            Learn more about transactions in our Knowledge Base
          </a>
        </div>
      </div>
    </TooltipProvider>
  );
}
