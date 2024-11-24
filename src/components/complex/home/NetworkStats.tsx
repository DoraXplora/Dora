'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { usePerformanceInfo } from '@/src/providers/stats/solanaClusterStats';
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

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
};

type Series = 'short' | 'medium' | 'long';

export function NetworkStats() {
  const [tpsDuration, setTPSDuration] = useState<Series>('short');
  const [pingDuration, setPingDuration] = useState<Series>('short');

  const performanceInfo = usePerformanceInfo();

  const tpsData = performanceInfo.perfHistory[tpsDuration].map((tps, i) => {
    return {
      time:
        tpsDuration === 'short'
          ? formatTime(new Date(new Date().getTime() - i * 60000))
          : tpsDuration === 'medium'
          ? formatTime(new Date(new Date().getTime() - i * 60000 * 4))
          : formatTime(new Date(new Date().getTime() - i * 60000 * 12)),
      tps: tps,
      trueTps: performanceInfo.truePerfHistory[tpsDuration][i],
    };
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                <Bar dataKey="tps" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="trueTps" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
