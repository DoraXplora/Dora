'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';
import { useCluster } from '@/src/providers/cluster';
import { useFetchSupply, useSupply } from '@/src/providers/supply';
import { ClusterStatus } from '@/src/utils/cluster';
import { displayLamports } from '@/src/utils/lamports';
import { percentage } from '@/src/utils/math';
import { useEffect } from 'react';

export default function SolSupplyCard() {
  const { status } = useCluster();
  const supply = useSupply();
  const fetchSupply = useFetchSupply();

  function fetchData() {
    fetchSupply();
  }

  useEffect(() => {
    if (status === ClusterStatus.Connected) {
      fetchData();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  let circulatingPercentage = '0';
  let nonCirculatingPercentage = '0';

  // Check if supply is of type Supply
  if (typeof supply === 'object') {
    // Calculate to 2dp for accuracy, then display as 1
    circulatingPercentage = percentage(
      supply.circulating,
      supply.total,
      2
    ).toFixed(1);

    nonCirculatingPercentage = percentage(
      supply.nonCirculating,
      supply.total,
      2
    ).toFixed(1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardTitle>
            <p className="text-base opacity-70">SOL Supply</p>
            <p>
              {' '}
              {typeof supply === 'object'
                ? displayLamports(supply.total)
                : null}
            </p>
          </CardTitle>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid p-3 gap-y-5 rounded-md bg-accent text-sm">
          <div>
            <p className="flex-1 mb-1 opacity-70 text-xs">Circulating Supply</p>
            <p>
              {typeof supply === 'object'
                ? displayLamports(supply.circulating)
                : 0}{' '}
              SOL ({circulatingPercentage}%)
            </p>
          </div>
          <Separator className="bg-slate-200 dark:bg-slate-500" />
          <div>
            <p className="flex-1 mb-1 opacity-70 text-xs">
              Non-circulating Supply
            </p>
            <p>
              {typeof supply === 'object'
                ? displayLamports(supply.nonCirculating)
                : 0}{' '}
              SOL ({nonCirculatingPercentage}%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
