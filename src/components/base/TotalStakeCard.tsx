'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useVoteAccounts } from '@/src/providers/accounts/vote-accounts';
import { useCluster } from '@/src/providers/cluster';
import { ClusterStatus } from '@/src/utils/cluster';
import { displayLamports } from '@/src/utils/lamports';
import { percentage } from '@/src/utils/math';
import { Separator } from '@components/ui/separator';
import { useEffect, useMemo } from 'react';

export default function TotalStakeCard() {
  const { status } = useCluster();
  const { fetchVoteAccounts, voteAccounts } = useVoteAccounts();

  useEffect(() => {
    if (status === ClusterStatus.Connected) {
      fetchVoteAccounts();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const delinquentStake = useMemo(() => {
    if (voteAccounts) {
      return voteAccounts.delinquent.reduce(
        (prev, current) => prev + current.activatedStake,
        BigInt(0)
      );
    }
  }, [voteAccounts]);

  const activeStake = useMemo(() => {
    if (voteAccounts && delinquentStake) {
      return (
        voteAccounts.current.reduce(
          (prev, current) => prev + current.activatedStake,
          BigInt(0)
        ) + delinquentStake
      );
    }
  }, [voteAccounts, delinquentStake]);

  let activeStakePercentage = '0';
  let delinquentStakePercentage = '0';

  if (delinquentStake && activeStake) {
    activeStakePercentage = percentage(
      activeStake - delinquentStake,
      activeStake,
      2
    ).toFixed(1);
    delinquentStakePercentage = percentage(
      delinquentStake,
      activeStake,
      2
    ).toFixed(1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Stake (SOL)</CardTitle>
        <CardDescription>
          {activeStake ? displayLamports(activeStake) : 0}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid p-3 gap-y-5 rounded-md bg-accent text-sm">
          <div>
            <p className="flex-1 mb-1 opacity-70 text-xs">Current Stake</p>
            <p>{activeStakePercentage}%</p>
          </div>
          <Separator className="bg-slate-200 dark:bg-slate-500" />
          <div>
            <p className="flex-1 mb-1 opacity-70 text-xs">Delinquent Stake</p>
            <p>{delinquentStakePercentage}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
