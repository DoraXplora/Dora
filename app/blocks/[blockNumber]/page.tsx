import { BlockDetails } from '@/src/components/complex/blocks/block-details';
import { Navbar } from '@/src/components/complex/navbar';
import { SearchHeader } from '@/src/components/complex/txs/search-header';

interface PageProps {
  params: {
    blockNumber: string;
  };
}

export default function BlockPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <BlockDetails blockNumber={params.blockNumber} />
      </main>
    </div>
  );
}
