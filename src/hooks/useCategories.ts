import { useQuery, useMutation, useQueryClient } from 'react-query';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const initialCategories: Category[] = [
  { id: 1, name: 'Sailboats', slug: 'sailboats', description: 'Wind-powered vessels' },
  { id: 2, name: 'Motor Boats', slug: 'motor-boats', description: 'Engine-powered boats' },
  { id: 3, name: 'Yachts', slug: 'yachts', description: 'Luxury vessels' },
];

const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      resolve(JSON.parse(storedCategories));
    } else {
      localStorage.setItem('categories', JSON.stringify(initialCategories));
      resolve(initialCategories);
    }
  });
};

const updateCategory = (updatedCategory: Category): Promise<Category> => {
  return getCategories().then(categories => {
    const updatedCategories = categories.map(category => category.id === updatedCategory.id ? updatedCategory : category);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    return updatedCategory;
  });
};

const addCategory = (newCategory: Omit<Category, 'id'>): Promise<Category> => {
  return getCategories().then(categories => {
    const categoryWithId = { ...newCategory, id: Math.max(0, ...categories.map(c => c.id)) + 1 };
    const updatedCategories = [...categories, categoryWithId];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    return categoryWithId;
  });
};

const deleteCategory = (id: number): Promise<void> => {
  return getCategories().then(categories => {
    const updatedCategories = categories.filter(category => category.id !== id);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  });
};

export const useCategories = () => {
  return useQuery<Category[], Error>('categories', getCategories);
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};