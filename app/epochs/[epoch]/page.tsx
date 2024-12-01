import { EpochProvider } from '@/src/providers/epoch';
import { Metadata } from 'next';
import EpochPageClient from './page-client';

interface PageProps {
  epoch: string;
}

export const metadata: Metadata = {
  title: 'Dora | Epoch Details',
  description:
    'View detailed information about an epoch on the SOON blockchain.',
};

export default async function BlockPage({
  params,
}: {
  params: Promise<PageProps>;
}) {
  const epoch = Number((await params).epoch);

  return (
    <EpochProvider>
      <EpochPageClient epoch={epoch} />
    </EpochProvider>
  );
}
