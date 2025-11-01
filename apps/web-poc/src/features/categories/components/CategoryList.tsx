import { Trash2 } from 'lucide-react';

import { useDeleteCategoryMutation } from '@/store/api/categoriesApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface CategoryListProps {
  categories: any[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Categories</CardTitle>
          <CardDescription>
            Get started by creating your first category
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Income Categories</CardTitle>
          <CardDescription>Categories for tracking income</CardDescription>
        </CardHeader>
        <CardContent>
          {incomeCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No income categories yet
            </p>
          ) : (
            <div className="space-y-2">
              {incomeCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn('h-3 w-3 rounded-full', 'bg-green-500')}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Categories for tracking expenses</CardDescription>
        </CardHeader>
        <CardContent>
          {expenseCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No expense categories yet
            </p>
          ) : (
            <div className="space-y-2">
              {expenseCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn('h-3 w-3 rounded-full', 'bg-red-500')} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryList;
