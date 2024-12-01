import { BlockProvider } from '@/src/providers/block';
import { StatsProvider } from '@/src/providers/stats';
import { Metadata } from 'next';
import TransactionsPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Dora | Transactions Details',
  description:
    'View detailed information about transactions on the SOON blockchain.',
};

export default function TransactionsPage() {
  return (
    <StatsProvider>
      <BlockProvider>
        <TransactionsPageClient />
      </BlockProvider>
    </StatsProvider>
  );
}
