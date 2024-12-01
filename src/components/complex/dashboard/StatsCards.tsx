import { useCluster } from '@/src/providers/cluster';
import { useStatsProvider } from '@/src/providers/stats/solanaClusterStats';
import CurrentEpochCard from '@components/base/CurrentEpochCard';
import SolSupplyCard from '@components/base/SolSupplyCard';
import { useEffect } from 'react';
import NetworkCard from '../../base/NetworkCard';
import TotalStakeCard from '../../base/TotalStakeCard';

export function StatsCards() {
  const { cluster } = useCluster();
  const { setActive } = useStatsProvider();

  useEffect(() => {
    setActive(true);
    return () => setActive(false);
  }, [setActive, cluster]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SolSupplyCard />
      <CurrentEpochCard />
      <NetworkCard />
      <TotalStakeCard />
    </div>
  );
}
