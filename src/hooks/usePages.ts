import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Page } from '../types';

const getPages = async (): Promise<Page[]> => {
  const pages = localStorage.getItem('pages');
  return pages ? JSON.parse(pages) : [];
};

const createPage = async (page: Omit<Page, 'id'>): Promise<Page> => {
  const pages = await getPages();
  const newPage = { ...page, id: Date.now() };
  const updatedPages = [...pages, newPage];
  localStorage.setItem('pages', JSON.stringify(updatedPages));
  return newPage;
};

const updatePage = async (page: Page): Promise<Page> => {
  const pages = await getPages();
  const updatedPages = pages.map(p => p.id === page.id ? page : p);
  localStorage.setItem('pages', JSON.stringify(updatedPages));
  return page;
};

const deletePage = async (id: number): Promise<void> => {
  const pages = await getPages();
  const updatedPages = pages.filter(p => p.id !== id);
  localStorage.setItem('pages', JSON.stringify(updatedPages));
};

export const usePages = () => useQuery<Page[], Error>('pages', getPages);

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  return useMutation(createPage, {
    onSuccess: () => queryClient.invalidateQueries('pages'),
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePage, {
    onSuccess: () => queryClient.invalidateQueries('pages'),
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePage, {
    onSuccess: () => queryClient.invalidateQueries('pages'),
  });
};

// For backwards compatibility
export const useAddPage = useCreatePage;
