import { BlockProvider } from '@/src/providers/block';
import { Metadata } from 'next';
import BlockPageClient from './page-client';

interface PageProps {
  slot: string;
}

export const metadata: Metadata = {
  title: 'Dora | Block Details',
  description:
    'View detailed information about a block on the SOON blockchain.',
};

export default async function BlockPage({
  params,
}: {
  params: Promise<PageProps>;
}) {
  const slotNumber = Number((await params).slot);

  return (
    <BlockProvider>
      <BlockPageClient slot={slotNumber} />
    </BlockProvider>
  );
}
