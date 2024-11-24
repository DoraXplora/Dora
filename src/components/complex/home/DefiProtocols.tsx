'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import Image from 'next/image';

const protocols = [
  {
    name: 'Jupiter',
    image: '/placeholder.svg',
    volume: '$2,323,733,010',
    change: '-6.85%',
    transactions: '8,782,935',
    txChange: '-25.66%',
  },
  {
    name: 'Orca',
    image: '/placeholder.svg',
    volume: '$1,324,939,010',
    change: '+15.52%',
    transactions: '1,130,876',
    txChange: '-0.56%',
  },
  {
    name: 'Meteora',
    image: '/placeholder.svg',
    volume: '$991,223,550',
    change: '+7.91%',
    transactions: '1,281,535',
    txChange: '+9.81%',
  },
  // Add more protocols as needed
];

export function DefiProtocols() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          Top DeFi Protocols by Volume
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Volume 24H</TableHead>
              <TableHead className="text-right">Total Txs 24H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocols.map((protocol) => (
              <TableRow key={protocol.name}>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={protocol.image}
                    alt={protocol.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  {protocol.name}
                </TableCell>
                <TableCell className="text-right">
                  {protocol.volume}{' '}
                  <span
                    className={
                      protocol.change.startsWith('+')
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    ({protocol.change})
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {protocol.transactions}{' '}
                  <span
                    className={
                      protocol.txChange.startsWith('+')
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    ({protocol.txChange})
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
