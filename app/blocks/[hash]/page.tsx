import { BlockDetails } from '@/src/components/complex/blocks/BlockDetails';
import { SearchHeader } from '@/src/components/complex/txs/SearchHeader';
import { Metadata } from 'next';

interface PageProps {
  hash: string;
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
  const hash = (await params).hash;

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <BlockDetails hash={hash} />
      </main>
    </div>
  );
}
