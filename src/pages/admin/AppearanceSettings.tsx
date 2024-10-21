import React, { useState } from 'react';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import { useNotification } from '../../context/NotificationContext';
import ImageUpload from '../../components/ImageUpload';

const AppearanceSettings: React.FC = () => {
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();
  const { addNotification } = useNotification();
  const [appearance, setAppearance] = useState({
    logo: settings?.logo || '',
    favicon: settings?.favicon || '',
    siteTitle: settings?.siteTitle || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppearance(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl: string, type: 'logo' | 'favicon') => {
    setAppearance(prev => ({ ...prev, [type]: imageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(
      { ...settings, ...appearance },
      {
        onSuccess: () => {
          addNotification('Appearance settings updated successfully!', 'success');
        },
        onError: () => {
          addNotification('Failed to update appearance settings. Please try again.', 'error');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Appearance Settings</h2>
      
      <div>
        <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700">
          Site Title
        </label>
        <input
          type="text"
          id="siteTitle"
          name="siteTitle"
          value={appearance.siteTitle}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <ImageUpload onImageUpload={(url) => handleImageUpload(url, 'logo')} />
        {appearance.logo && (
          <img src={appearance.logo} alt="Site Logo" className="mt-2 h-12 object-contain" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Favicon</label>
        <ImageUpload onImageUpload={(url) => handleImageUpload(url, 'favicon')} />
        {appearance.favicon && (
          <img src={appearance.favicon} alt="Favicon" className="mt-2 h-8 w-8 object-contain" />
        )}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Appearance Settings
      </button>
    </form>
  );
};

export default AppearanceSettings;