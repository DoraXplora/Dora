import { BlocksTable } from '@/src/components/complex/blocks/BlocksTable';
import { SearchHeader } from '@/src/components/complex/txs/SearchHeader';

export default function BlocksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Blocks</h1>
        <BlocksTable />
      </main>
    </div>
  );
}
