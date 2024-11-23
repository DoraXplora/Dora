'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const tpsData = Array.from({ length: 30 }, (_, i) => ({
  time: `17:${i.toString().padStart(2, '0')}`,
  tps: Math.floor(Math.random() * 1000) + 2000,
  trueTps: Math.floor(Math.random() * 500) + 1000,
}));

const pingData = Array.from({ length: 30 }, (_, i) => ({
  time: `17:${i.toString().padStart(2, '0')}`,
  ping: Math.floor(Math.random() * 1000) + 500,
}));

export function NetworkStats() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            TPS | True TPS
          </CardTitle>
          <div className="flex gap-2">
            <span className="rounded bg-primary px-2 py-1 text-xs">24H</span>
            <span className="rounded bg-muted px-2 py-1 text-xs">7D</span>
            <span className="rounded bg-muted px-2 py-1 text-xs">1M</span>
          </div>
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
          <div className="flex gap-2">
            <span className="rounded bg-primary px-2 py-1 text-xs">24H</span>
            <span className="rounded bg-muted px-2 py-1 text-xs">7D</span>
            <span className="rounded bg-muted px-2 py-1 text-xs">1M</span>
          </div>
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
