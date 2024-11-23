import { SearchHeader } from '@/src/components/complex/txs/search-header';
import { TransactionDetails } from '@/src/components/complex/txs/transaction-details';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Dora | Transaction Details',
  description:
    'View detailed information about a transaction on the SOON blockchain.',
};

export default function TransactionPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <TransactionDetails id={params.id} />
      </main>
    </div>
  );
}
