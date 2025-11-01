import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from '../../../store/api/transactionsApi';
import { useGetCategoriesQuery } from '../../../store/api/categoriesApi';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { Label } from '../../../shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui/select';
import { useToast } from '../../../shared/hooks/useToast';
import { extractErrorMessage } from '../../../shared/utils/api-error';

const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.number().positive('Amount must be positive'),
  categoryId: z.string().min(1, 'Please select a category'),
  description: z.string().optional(),
  date: z.string(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSuccess: () => void;
  transactionId?: string;
}

const TransactionForm = ({
  onSuccess,
  transactionId,
}: TransactionFormProps) => {
  const { toast } = useToast();
  const { data: categories } = useGetCategoriesQuery({});
  const [createTransaction, { isLoading: isCreating }] =
    useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();

  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'EXPENSE',
      date: new Date().toISOString().split('T')[0],
      description: '',
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const payload = {
        ...data,
        date: new Date(data.date),
        description: data.description || '',
      };
      if (transactionId) {
        await updateTransaction({ id: transactionId, data: payload }).unwrap();
        toast({
          title: 'Success',
          description: 'Transaction updated successfully!',
        });
      } else {
        await createTransaction(payload).unwrap();
        toast({
          title: 'Success',
          description: 'Transaction created successfully!',
        });
      }
      onSuccess();
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: extractErrorMessage(
          error,
          'Failed to save transaction. Please try again.',
        ),
      });
    }
  };

  const incomeCategories = categories?.filter((c) => c.type === 'INCOME') || [];
  const expenseCategories =
    categories?.filter((c) => c.type === 'EXPENSE') || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INCOME">Income</SelectItem>
                <SelectItem value="EXPENSE">Expense</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {incomeCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                {expenseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-sm text-destructive">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register('date')} />
        {errors.date && (
          <p className="text-sm text-destructive">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Input id="description" {...register('description')} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : transactionId ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
