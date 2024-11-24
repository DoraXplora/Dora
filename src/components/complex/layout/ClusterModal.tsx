'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { Button, buttonVariants } from '@components/ui/button';
import {
  useCluster,
  useClusterModal,
  useUpdateCustomUrl,
} from '@providers/cluster';
import { useDebounceCallback } from '@react-hook/debounce';
import {
  Cluster,
  clusterName,
  CLUSTERS,
  clusterSlug,
  ClusterStatus,
} from '@utils/cluster';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { Input } from '@components/ui/input';
import { CheckCircle } from 'lucide-react';

const ClusterModalDeveloperSettings = dynamic(
  () => import('./ClusterModalDeveloperSettings'),
  { ssr: false }
);

export function ClusterModal() {
  const [show, setShow] = useClusterModal();
  const { name } = useCluster();

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant="destructive" size="default">
          <span>{name}</span>
          <CheckCircle className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only*">Choose a Cluster</SheetTitle>
        <h2 className="text-center mb-4 mt-4">Choose a Cluster</h2>
        <ClusterToggle />
        <ClusterModalDeveloperSettings />
      </SheetContent>
    </Sheet>
  );
}

type InputProps = { activeSuffix: string; active: boolean };
function CustomClusterInput({ activeSuffix, active }: InputProps) {
  const { customUrl } = useCluster();
  const updateCustomUrl = useUpdateCustomUrl();
  const [editing, setEditing] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const btnClass = active
    ? `border-${activeSuffix} text-${activeSuffix}`
    : 'btn-white';

  const onUrlInput = useDebounceCallback((url: string) => {
    updateCustomUrl(url);
    if (url.length > 0) {
      const nextSearchParams = new URLSearchParams(searchParams?.toString());
      nextSearchParams.set('customUrl', url);
      const nextQueryString = nextSearchParams.toString();
      router.push(`${pathname}${nextQueryString ? `?${nextQueryString}` : ''}`);
    }
  }, 500);

  const inputTextClass = editing ? '' : 'text-muted';
  return (
    <>
      <Link
        className={`mb-3 ${buttonVariants({ variant: 'outline' })} ${btnClass}`}
        href={{
          query: {
            cluster: 'custom',
            ...(customUrl.length > 0 ? { customUrl } : null),
          },
        }}
      >
        Custom RPC URL
      </Link>
      {active && (
        <Input
          type="url"
          defaultValue={customUrl}
          className={`form-control ${inputTextClass}`}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          onInput={(e) => onUrlInput(e.currentTarget.value)}
        />
      )}
    </>
  );
}

function assertUnreachable(_x: never): never {
  throw new Error('Unreachable!');
}

function ClusterToggle() {
  const { status, cluster } = useCluster();

  let activeSuffix = '';
  switch (status) {
    case ClusterStatus.Connected:
      activeSuffix = 'primary';
      break;
    case ClusterStatus.Connecting:
      activeSuffix = 'warning';
      break;
    case ClusterStatus.Failure:
      activeSuffix = 'danger';
      break;
    default:
      assertUnreachable(status);
  }
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col gap-y-3 mb-4">
      {CLUSTERS.filter((net) => !(net === Cluster.MainnetBeta)).map(
        (net, index) => {
          const active = net === cluster;
          if (net === Cluster.Custom)
            return (
              <CustomClusterInput
                key={index}
                activeSuffix={activeSuffix}
                active={active}
              />
            );

          const btnClass = active
            ? `border-${activeSuffix} text-${activeSuffix}`
            : 'btn-white';

          const nextSearchParams = new URLSearchParams(
            searchParams?.toString()
          );
          const slug = clusterSlug(net);
          if (slug !== 'mainnet-beta') {
            nextSearchParams.set('cluster', slug);
          } else {
            nextSearchParams.delete('cluster');
          }
          const nextQueryString = nextSearchParams.toString();
          const clusterUrl = `${pathname}${
            nextQueryString ? `?${nextQueryString}` : ''
          }`;
          return (
            <Link
              key={index}
              className={`${btnClass} ${buttonVariants({
                variant: 'outline',
              })}`}
              href={clusterUrl}
            >
              {clusterName(net)}
            </Link>
          );
        }
      )}
    </div>
  );
}
