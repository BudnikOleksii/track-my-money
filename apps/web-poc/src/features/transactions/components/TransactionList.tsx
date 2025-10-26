import { useDeleteTransactionMutation } from '../../../store/api/transactionsApi';
import { useGetCategoriesQuery } from '../../../store/api/categoriesApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/ui/table';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../shared/ui/card';
import { Button } from '../../../shared/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../shared/utils/cn';

interface TransactionListProps {
  transactions: any[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const { data: categories } = useGetCategoriesQuery({});
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id).unwrap();
      } catch (error) {
        console.error('Failed to delete transaction', error);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories?.find((c) => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Transactions</CardTitle>
          <CardDescription>
            Get started by creating your first transaction
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium',
                    transaction.type === 'INCOME'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  )}
                >
                  {transaction.type}
                </span>
              </TableCell>
              <TableCell>{getCategoryName(transaction.categoryId)}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    'font-semibold',
                    transaction.type === 'INCOME'
                      ? 'text-green-600'
                      : 'text-red-600',
                  )}
                >
                  {transaction.type === 'INCOME' ? '+' : '-'}$
                  {transaction.amount.toFixed(2)}
                </span>
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {transaction.description || '-'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
