'use client';

import { Button } from '@/src/components/ui/button';
import { FetchStatus } from '@/src/providers/block';
import { useCluster } from '@/src/providers/cluster';
import { useEpoch, useFetchEpoch } from '@/src/providers/epoch';
import { ClusterStatus } from '@/src/utils/cluster';
import { displayTimestampUtc } from '@/src/utils/date';
import {
  getFirstSlotInEpoch,
  getLastSlotInEpoch,
} from '@/src/utils/epoch-schedule';
import { Copy } from 'lucide-react';
import { useEffect } from 'react';
import { Copyable } from '../../common/Copyable';
import { Epoch } from '../../common/Epoch';
import { ErrorCard } from '../../common/ErrorCard';
import { Slot } from '../../common/Slot';

interface EpochDetailsProps {
  epoch: number;
}

export function EpochDetails({ epoch }: EpochDetailsProps) {
  const { status, clusterInfo } = useCluster();

  const epochState = useEpoch(epoch);
  const fetchEpoch = useFetchEpoch();

  // Fetch extra epoch info on load
  useEffect(() => {
    if (!clusterInfo) return;
    const { epochInfo, epochSchedule } = clusterInfo;
    const currentEpoch = epochInfo.epoch;
    if (
      epoch <= currentEpoch &&
      !epochState &&
      status === ClusterStatus.Connected
    )
      fetchEpoch(epoch, currentEpoch, epochSchedule);
  }, [epoch, epochState, clusterInfo, status, fetchEpoch]);

  if (!clusterInfo) {
    return <div>Connecting to cluster</div>;
  }

  const { epochInfo, epochSchedule } = clusterInfo;
  const currentEpoch = epochInfo.epoch;
  if (epoch > currentEpoch) {
    return <ErrorCard text={`Epoch ${epoch} hasn't started yet`} />;
  } else if (!epochState?.data) {
    if (epochState?.status === FetchStatus.FetchFailed) {
      return <ErrorCard text={`Failed to fetch details for epoch ${epoch}`} />;
    }
    return <div>Loading epoch</div>;
  }

  const firstSlot = getFirstSlotInEpoch(epochSchedule, BigInt(epoch));
  const lastSlot = getLastSlotInEpoch(epochSchedule, BigInt(epoch));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Epoch Details</h1>
        <span className="font-mono text-muted-foreground">{epoch}</span>
        <Button variant="outline" size="icon">
          <Copy
            className="h-4 w-4"
            onClick={() => navigator.clipboard.writeText(`${epoch}`)}
          />
        </Button>
      </div>
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid gap-4">
            {epoch > 0 && (
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">
                  Previous Epoch
                </span>
                <div className="flex items-center gap-2">
                  <Epoch epoch={epoch - 1} link />
                </div>
              </div>
            )}

            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Next Epoch</span>
              <div className="flex items-center gap-2">
                {currentEpoch > epoch ? (
                  <Epoch epoch={epoch + 1} link />
                ) : (
                  <span className="font-mono">Epoch in progress</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">First Slot</span>
              <div className="flex items-center gap-2">
                <Copyable text={firstSlot.toString()}>
                  <span className="font-mono">{firstSlot}</span>
                </Copyable>
              </div>
            </div>

            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Last Slot</span>
              <div className="flex items-center gap-2">
                <Copyable text={lastSlot.toString()}>
                  <span className="font-mono">{lastSlot}</span>
                </Copyable>
              </div>
            </div>

            {epochState.data.firstTimestamp ? (
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">
                  First Block Timestamp
                </span>
                <span>
                  {displayTimestampUtc(
                    epochState.data.firstTimestamp * 1000,
                    true
                  )}
                </span>
              </div>
            ) : null}

            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">First Block</span>
              <div className="flex items-center gap-2">
                <Slot slot={epochState.data.firstBlock} link />
              </div>
            </div>

            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-sm text-muted-foreground">Last Block</span>
              <div className="flex items-center gap-2">
                {epochState.data.lastBlock === undefined ? (
                  <span className="font-mono">Block in progress</span>
                ) : (
                  <Slot slot={epochState.data.lastBlock} link />
                )}
              </div>
            </div>

            {epochState.data.lastTimestamp ? (
              <div className="grid grid-cols-[100px,1fr] gap-4">
                <span className="text-sm text-muted-foreground">
                  Last Block Timestamp
                </span>
                <span>
                  {displayTimestampUtc(
                    epochState.data.lastTimestamp * 1000,
                    true
                  )}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
