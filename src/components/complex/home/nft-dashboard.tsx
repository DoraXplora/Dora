'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/src/components/ui/card';

const collections = [
  {
    name: 'Mad Lads',
    image: '/placeholder.svg?height=32&width=32',
    items: '9,998',
    floorPrice: '31.58',
    vol24h: '31,647.88',
  },
  {
    name: 'Starship Goonies',
    image: '/placeholder.svg?height=32&width=32',
    items: '4,653',
    floorPrice: '20.48',
    vol24h: '24,722.6',
  },
  {
    name: 'Famous Fox Federation',
    image: '/placeholder.svg?height=32&width=32',
    items: '3,557',
    floorPrice: '23.841',
    vol24h: '20,376.88',
  },
  // Add more collections as needed
];

export function NFTDashboard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">NFT Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Popular Collection</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Floor Price</TableHead>
              <TableHead className="text-right">Vol 24H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.name}>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  {collection.name}
                </TableCell>
                <TableCell className="text-right">{collection.items}</TableCell>
                <TableCell className="text-right">
                  ◎ {collection.floorPrice}
                </TableCell>
                <TableCell className="text-right">
                  ◎ {collection.vol24h}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
