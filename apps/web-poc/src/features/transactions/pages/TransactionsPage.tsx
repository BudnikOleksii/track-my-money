import { useState } from 'react';
import { useGetTransactionsQuery } from '../../../store/api/transactionsApi';
import TransactionList from '../components/TransactionList';
import BalanceCard from '../components/BalanceCard';
import TransactionForm from '../components/TransactionForm';
import { Button } from '../../../shared/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui/dialog';

const TransactionsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useGetTransactionsQuery({ page: 1, limit: 50 });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <BalanceCard />

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      ) : (
        <TransactionList transactions={data?.data || []} />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsPage;
