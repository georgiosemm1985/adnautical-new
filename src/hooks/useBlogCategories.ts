import { useQuery, useMutation, useQueryClient } from 'react-query';
import { blogCategories as initialBlogCategories } from '../mockData';
import { BlogCategory } from '../types';

const getBlogCategories = (): Promise<BlogCategory[]> => {
  return new Promise((resolve) => {
    const storedCategories = localStorage.getItem('blogCategories');
    if (storedCategories) {
      resolve(JSON.parse(storedCategories));
    } else {
      localStorage.setItem('blogCategories', JSON.stringify(initialBlogCategories));
      resolve(initialBlogCategories);
    }
  });
};

const updateBlogCategory = (updatedCategory: BlogCategory): Promise<BlogCategory> => {
  return getBlogCategories().then(categories => {
    const updatedCategories = categories.map(category => category.id === updatedCategory.id ? updatedCategory : category);
    localStorage.setItem('blogCategories', JSON.stringify(updatedCategories));
    return updatedCategory;
  });
};

const addBlogCategory = (newCategory: Omit<BlogCategory, 'id'>): Promise<BlogCategory> => {
  return getBlogCategories().then(categories => {
    const categoryWithId = { ...newCategory, id: Math.max(0, ...categories.map(c => c.id)) + 1 };
    const updatedCategories = [...categories, categoryWithId];
    localStorage.setItem('blogCategories', JSON.stringify(updatedCategories));
    return categoryWithId;
  });
};

const deleteBlogCategory = (id: number): Promise<void> => {
  return getBlogCategories().then(categories => {
    const updatedCategories = categories.filter(category => category.id !== id);
    localStorage.setItem('blogCategories', JSON.stringify(updatedCategories));
  });
};

export const useBlogCategories = () => {
  return useQuery<BlogCategory[], Error>('blogCategories', getBlogCategories);
};

export const useUpdateBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBlogCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogCategories');
    },
  });
};

export const useAddBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(addBlogCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogCategories');
    },
  });
};

export const useDeleteBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBlogCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogCategories');
    },
  });
};