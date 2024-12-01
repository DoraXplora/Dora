'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  useDashboardInfo,
  usePerformanceInfo,
} from '@/src/providers/stats/solanaClusterStats';
import { Separator } from '@components/ui/separator';

export default function NetworkCard() {
  const dashboardInfo = useDashboardInfo();
  const performanceInfo = usePerformanceInfo();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="text-base opacity-70">Transactions</p>
          <p>{performanceInfo.transactionCount}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid p-3 gap-y-5 rounded-md bg-accent text-sm">
          <div className="grid grid-cols-2">
            <div>
              <p className="flex-1 mb-1 opacity-70 text-xs">Block Height</p>
              <p>{dashboardInfo.epochInfo.blockHeight}</p>
            </div>
            <div>
              <p className="flex-1 mb-1 opacity-70 text-xs">Slot Height</p>
              <p>{dashboardInfo.epochInfo.slotIndex}</p>
            </div>
          </div>
          <Separator className="bg-slate-200 dark:bg-slate-500" />
          <div className="grid grid-cols-2">
            <div>
              <p className="flex-1 mb-1 opacity-70 text-xs">TPS</p>
              <p>{performanceInfo.avgTps}</p>
            </div>
            <div>
              <p className="flex-1 mb-1 opacity-70 text-xs">Max TPS</p>
              <p>{performanceInfo.historyMaxTps}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
