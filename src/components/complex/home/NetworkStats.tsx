'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { usePerformanceInfo } from '@/src/providers/stats/solanaClusterStats';
import { displayTimestamp, formatRelativeTime } from '@/src/utils/date';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const pingData = Array.from({ length: 30 }, (_, i) => ({
  time: `17:${i.toString().padStart(2, '0')}`,
  ping: Math.floor(Math.random() * 1000) + 500,
}));

type TPSData = {
  time: string;
  fullDate: Date;
  tps: number | null;
  trueTps: number | null;
};

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
};

type Series = 'short' | 'medium' | 'long';

function CustomTpsTooltip({
  active,
  payload,
}: {
  active: boolean | undefined;
  payload: TPSData | undefined;
}) {
  if (active && payload) {
    payload.tps ||= 0;
    payload.trueTps ||= 0;

    const trueTpsPercentage = (payload.trueTps / payload.tps) * 100;

    return (
      <div className="bg-background border-border rounded-lg p-3 shadow-lg w-max text-sm">
        <div className="text-gray-600 mb-1">
          {displayTimestamp(payload.fullDate.getTime())}
        </div>
        <div className="text-gray-500 text-xs mb-2">
          {formatRelativeTime(new Date(payload.fullDate))}
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></span>
          <span>Total TPS: {payload.tps}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-2 h-2 rounded-full bg-[#ec4899] mr-2"></span>
          <span>
            True TPS: {payload.trueTps} ({trueTpsPercentage.toFixed(1)}%)
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export default function NetworkStats() {
  const [tpsDuration, setTPSDuration] = useState<Series>('short');
  const [pingDuration, setPingDuration] = useState<Series>('short');

  const performanceInfo = usePerformanceInfo();

  const tpsData: TPSData[] = performanceInfo.perfHistory[tpsDuration].map(
    (tps, i) => {
      let time;
      if (tpsDuration === 'short')
        time = new Date(new Date().getTime() - i * 60000);
      else if (tpsDuration === 'medium')
        time = new Date(new Date().getTime() - i * 60000 * 4);
      else time = new Date(new Date().getTime() - i * 60000 * 12);

      return {
        time: formatTime(time),
        fullDate: time,
        tps: tps,
        trueTps: performanceInfo.truePerfHistory[tpsDuration][i],
      };
    }
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-x-2 space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            TPS | True TPS
          </CardTitle>
          <ToggleGroup
            size="sm"
            value={tpsDuration}
            onValueChange={(value: Series) => setTPSDuration(value)}
            type="single"
          >
            <ToggleGroupItem value="short" aria-label="Toggle 30 minutes">
              30m
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" aria-label="Toggle 2 hours">
              2h
            </ToggleGroupItem>
            <ToggleGroupItem value="long" aria-label="Toggle 6 hours">
              6h
            </ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tpsData}>
                {/* TODO: Add a custom tooltip */}
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => (
                    <CustomTpsTooltip
                      active={active}
                      payload={payload?.at(0)?.payload as TPSData}
                    />
                  )}
                />
                <Bar dataKey="tps" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="trueTps" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-x-2 space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            Average Ping Time (Network response time)
          </CardTitle>
          <ToggleGroup
            size="sm"
            value={pingDuration}
            onValueChange={(value: Series) => setPingDuration(value)}
            type="single"
          >
            <ToggleGroupItem value="short" aria-label="Toggle 30 minutes">
              30m
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" aria-label="Toggle 2 hours">
              2h
            </ToggleGroupItem>
            <ToggleGroupItem value="long" aria-label="Toggle 6 hours">
              6h
            </ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pingData}>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar dataKey="ping" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
