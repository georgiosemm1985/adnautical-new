import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import { useNotification } from '../../context/NotificationContext';

const CaptchaSettings: React.FC = () => {
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();
  const { addNotification } = useNotification();
  const [captchaConfig, setCaptchaConfig] = useState({
    captchaEnabled: settings?.captchaEnabled || false,
    captchaApiKey: settings?.captchaApiKey || '',
    captchaSecretKey: settings?.captchaSecretKey || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCaptchaConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(
      { ...settings, ...captchaConfig },
      {
        onSuccess: () => {
          addNotification('Captcha settings updated successfully!', 'success');
        },
        onError: () => {
          addNotification('Failed to update captcha settings. Please try again.', 'error');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Captcha Settings</h2>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="captchaEnabled"
            checked={captchaConfig.captchaEnabled}
            onChange={handleChange}
            className="mr-2"
          />
          Enable Captcha
        </label>
      </div>
      {captchaConfig.captchaEnabled && (
        <>
          <div>
            <label htmlFor="captchaApiKey" className="block mb-1 font-medium">Captcha API Key</label>
            <input
              type="text"
              id="captchaApiKey"
              name="captchaApiKey"
              value={captchaConfig.captchaApiKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="captchaSecretKey" className="block mb-1 font-medium">Captcha Secret Key</label>
            <input
              type="text"
              id="captchaSecretKey"
              name="captchaSecretKey"
              value={captchaConfig.captchaSecretKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <Save size={20} className="mr-2" />
        Save Captcha Settings
      </button>
    </form>
  );
};

export default CaptchaSettings;