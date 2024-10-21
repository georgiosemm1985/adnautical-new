import { useQuery, useMutation, useQueryClient } from 'react-query';

interface Settings {
  siteName: string;
  contactEmail: string;
  featuredListingsCount: number;
  featuredArticlesCount: number;
  allowUserRegistration: boolean;
  maintenanceMode: boolean;
  emailConfig: {
    type: 'smtp' | 'api';
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    apiKey?: string;
  };
  captchaEnabled: boolean;
  captchaApiKey: string;
  captchaSecretKey: string;
}

const defaultSettings: Settings = {
  siteName: 'AdNautical',
  contactEmail: 'info@adnautical.com',
  featuredListingsCount: 6,
  featuredArticlesCount: 3,
  allowUserRegistration: true,
  maintenanceMode: false,
  emailConfig: {
    type: 'smtp',
    host: '',
    port: 587,
    username: '',
    password: '',
  },
  captchaEnabled: false,
  captchaApiKey: '',
  captchaSecretKey: '',
};

const getSettings = (): Promise<Settings> => {
  return new Promise((resolve) => {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      resolve(JSON.parse(storedSettings));
    } else {
      localStorage.setItem('settings', JSON.stringify(defaultSettings));
      resolve(defaultSettings);
    }
  });
};

const updateSettings = (updatedSettings: Settings): Promise<Settings> => {
  return new Promise((resolve) => {
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
    resolve(updatedSettings);
  });
};

export const useSettings = () => {
  return useQuery<Settings, Error>('settings', getSettings);
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries('settings');
    },
  });
};