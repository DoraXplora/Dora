import { SearchHeader } from '@/src/components/complex/txs/search-header';
import { TransactionsTable } from '@/src/components/complex/txs/transactions-table';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Transactions</h1>
        <TransactionsTable />
      </main>
    </div>
  );
}