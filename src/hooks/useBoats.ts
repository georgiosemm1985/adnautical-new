import { useQuery, useMutation, useQueryClient } from 'react-query';
import { boats as initialBoats } from '../mockData';
import { Boat } from '../types';

const getBoats = (): Promise<Boat[]> => {
  console.log('getBoats function called');
  const storedBoats = localStorage.getItem('boats');
  if (!storedBoats) {
    console.log('No stored boats found, using initial boats');
    localStorage.setItem('boats', JSON.stringify(initialBoats));
    return Promise.resolve(initialBoats);
  }
  console.log('Stored boats found:', JSON.parse(storedBoats));
  return Promise.resolve(JSON.parse(storedBoats));
};

const updateBoat = (updatedBoat: Boat): Promise<Boat> => {
  console.log('Updating boat:', updatedBoat);
  return getBoats().then(boats => {
    const updatedBoats = boats.map(boat => boat.id === updatedBoat.id ? updatedBoat : boat);
    localStorage.setItem('boats', JSON.stringify(updatedBoats));
    console.log('Boat updated successfully:', updatedBoat);
    return updatedBoat;
  });
};

const addBoat = (newBoat: Omit<Boat, 'id'>): Promise<Boat> => {
  console.log('Adding new boat:', newBoat);
  return getBoats().then(boats => {
    const boatWithId = { ...newBoat, id: Math.max(0, ...boats.map(b => b.id)) + 1 };
    const updatedBoats = [...boats, boatWithId];
    localStorage.setItem('boats', JSON.stringify(updatedBoats));
    console.log('New boat added successfully:', boatWithId);
    return boatWithId;
  });
};

const deleteBoat = (id: number): Promise<void> => {
  console.log('Deleting boat with id:', id);
  return getBoats().then(boats => {
    const updatedBoats = boats.filter(boat => boat.id !== id);
    localStorage.setItem('boats', JSON.stringify(updatedBoats));
    console.log('Boat deleted successfully');
  });
};

export const useBoats = () => {
  return useQuery<Boat[], Error>('boats', getBoats, {
    onSuccess: (data) => {
      console.log('useBoats query successful, data:', data);
    },
    onError: (error) => {
      console.error('useBoats query error:', error);
    },
  });
};

export const useUpdateBoat = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBoat, {
    onSuccess: (updatedBoat) => {
      console.log('Boat updated successfully:', updatedBoat);
      queryClient.invalidateQueries('boats');
    },
    onError: (error) => {
      console.error('Error updating boat:', error);
    },
  });
};

export const useAddBoat = () => {
  const queryClient = useQueryClient();
  return useMutation(addBoat, {
    onSuccess: (newBoat) => {
      console.log('New boat added successfully:', newBoat);
      queryClient.invalidateQueries('boats');
    },
    onError: (error) => {
      console.error('Error adding new boat:', error);
    },
  });
};

export const useDeleteBoat = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBoat, {
    onSuccess: () => {
      console.log('Boat deleted successfully');
      queryClient.invalidateQueries('boats');
    },
    onError: (error) => {
      console.error('Error deleting boat:', error);
    },
  });
};
