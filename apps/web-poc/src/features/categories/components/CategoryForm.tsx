import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TransactionType } from '@/shared/constants/transaction-types';
import { useCreateCategoryMutation } from '@/store/api/categoriesApi';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useToast } from '@/shared/hooks/useToast';
import { extractErrorMessage } from '@/shared/utils/api-error';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.nativeEnum(TransactionType),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onSuccess: () => void;
}

const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const { toast } = useToast();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: TransactionType.EXPENSE,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory(data).unwrap();
      toast({
        title: 'Success',
        description: 'Category created successfully!',
      });
      onSuccess();
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: extractErrorMessage(
          error,
          'Failed to create category. Please try again.',
        ),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

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

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
