import { SearchHeader } from '@/src/components/complex/txs/SearchHeader';
import { TransactionDetails } from '@/src/components/complex/txs/TransactionDetails';
import { TransactionsProvider } from '@/src/providers/transactions';
import { Metadata } from 'next';

interface PageProps {
  signature: string;
}

export const metadata: Metadata = {
  title: 'Dora | Transaction Details',
  description:
    'View detailed information about a transaction on the SOON blockchain.',
};

export default async function TransactionPage({
  params,
}: {
  params: Promise<PageProps>;
}) {
  const signature = (await params).signature;

  return (
    <TransactionsProvider>
      <div className="min-h-screen bg-background">
        <SearchHeader />
        <main className="container mx-auto px-4 py-8">
          <TransactionDetails signature={signature} />
        </main>
      </div>
    </TransactionsProvider>
  );
}
