'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  tps: Math.floor(Math.random() * 2000) + 2000,
}));

export default function TransactionChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="time"
            stroke="#666"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Line
            type="monotone"
            dataKey="tps"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
