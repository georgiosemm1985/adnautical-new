import { useQuery, useMutation, useQueryClient } from 'react-query';

interface MenuItem {
  id: string;
  type: 'page' | 'article' | 'custom';
  label: string;
  url: string;
}

const getMenuItems = (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    const storedMenuItems = localStorage.getItem('menuItems');
    if (storedMenuItems) {
      resolve(JSON.parse(storedMenuItems));
    } else {
      const initialMenuItems: MenuItem[] = [];
      localStorage.setItem('menuItems', JSON.stringify(initialMenuItems));
      resolve(initialMenuItems);
    }
  });
};

const updateMenuItems = (menuItems: MenuItem[]): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    resolve(menuItems);
  });
};

export const useMenuItems = () => {
  return useQuery<MenuItem[], Error>('menuItems', getMenuItems);
};

export const useUpdateMenuItems = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMenuItems, {
    onSuccess: () => {
      queryClient.invalidateQueries('menuItems');
    },
  });
};