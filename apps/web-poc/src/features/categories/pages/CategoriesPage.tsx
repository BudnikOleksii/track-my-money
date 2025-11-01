import { useState } from 'react';
import { Plus } from 'lucide-react';

import { useGetCategoriesQuery } from '../../../store/api/categoriesApi';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import { Button } from '../../../shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui/dialog';

const CategoriesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: categories, isLoading } = useGetCategoriesQuery({});

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      ) : (
        <CategoryList categories={categories || []} />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <CategoryForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesPage;
