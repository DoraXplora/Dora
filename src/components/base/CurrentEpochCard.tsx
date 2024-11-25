'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useDashboardInfo } from '@/src/providers/stats/solanaClusterStats';
import { slotsToHumanString } from '@/src/utils';
import { percentage } from '@/src/utils/math';
import { Progress } from '@components/ui/progress';
import { Separator } from '@components/ui/separator';

export default function CurrentEpochCard() {
  const dashboardInfo = useDashboardInfo();

  const { avgSlotTime_1h, epochInfo } = dashboardInfo;
  const hourlySlotTime = Math.round(1000 * avgSlotTime_1h);
  const { epoch, slotIndex, slotsInEpoch } = epochInfo;
  const epochProgress = slotsInEpoch
    ? percentage(slotIndex, slotsInEpoch, 2).toFixed(1)
    : '0.0';
  const epochTimeRemaining = slotsToHumanString(
    Number(slotsInEpoch - slotIndex),
    hourlySlotTime
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p className="w-full text-base">Current Epoch</p>
            <Progress
              className="h-2 bg-primary-foreground"
              value={Number(epochProgress)}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-blue-500">{epoch}</p>
            <span className="font-normal text-slate-500 text-sm">
              ({epochProgress}%)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid p-3 gap-y-5 rounded-md bg-accent text-sm">
          <div>
            <p className="flex-1 mb-1 opacity-70 text-xs">Slot Range</p>
            <p>
              {slotIndex} to {slotsInEpoch}
            </p>
          </div>
          <Separator className="bg-slate-200 dark:bg-slate-500" />
          <div>
            <p className="flex-1 mb-1 opacity-70 text-xs">Time remaining</p>
            <p>{epochTimeRemaining}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
