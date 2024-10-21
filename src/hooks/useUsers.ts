import { useQuery, useMutation, useQueryClient } from 'react-query';
import { users as initialUsers } from '../mockData';
import { User } from '../types';

const getUsers = (): Promise<User[]> => {
  return Promise.resolve(JSON.parse(localStorage.getItem('users') || JSON.stringify(initialUsers)));
};

const updateUser = (updatedUser: User): Promise<User> => {
  const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(initialUsers));
  const updatedUsers = users.map((user: User) => user.id === updatedUser.id ? updatedUser : user);
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return Promise.resolve(updatedUser);
};

const addUser = (newUser: Omit<User, 'id'>): Promise<User> => {
  const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(initialUsers));
  const userWithId = { ...newUser, id: Math.max(...users.map((u: User) => u.id)) + 1 };
  const updatedUsers = [...users, userWithId];
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return Promise.resolve(userWithId);
};

const deleteUser = (id: number): Promise<void> => {
  const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(initialUsers));
  const updatedUsers = users.filter((user: User) => user.id !== id);
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return Promise.resolve();
};

export const useUsers = () => {
  return useQuery<User[], Error>('users', getUsers);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};