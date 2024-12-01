'use client';

import { ScrollArea, ScrollBar } from '@/src/components/ui/scroll-area';
import { Badge } from '@/src/components/ui/badge';

const markets = [
  { id: 1, name: 'SOL-KACY', price: '$255.69', change: '+2.3%' },
  { id: 2, name: 'SOL-USDC', price: '$255.70', change: '-1.2%' },
  { id: 3, name: 'SOL-USDT', price: '$255.65', change: '+0.8%' },
  { id: 4, name: 'SOL', price: '$255.68', change: '+1.5%' },
  // Add more market pairs as needed
];

export function TopMarkets() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">Top Markets</h2>
      <ScrollArea className="whitespace-nowrap">
        <div className="flex space-x-4">
          {markets.map((market) => (
            <div
              key={market.id}
              className="inline-flex items-center space-x-2 rounded-lg bg-card p-3"
            >
              <span className="font-medium">{market.name}</span>
              <span>{market.price}</span>
              <Badge
                variant={
                  market.change.startsWith('+') ? 'success' : 'destructive'
                }
              >
                {market.change}
              </Badge>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
