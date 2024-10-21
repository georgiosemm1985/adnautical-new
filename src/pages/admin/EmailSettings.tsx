import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import { useNotification } from '../../context/NotificationContext';

const EmailSettings: React.FC = () => {
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();
  const { addNotification } = useNotification();
  const [emailConfig, setEmailConfig] = useState(settings?.emailConfig || {
    type: 'smtp',
    host: '',
    port: 587,
    username: '',
    password: '',
    apiKey: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmailConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(
      { ...settings, emailConfig },
      {
        onSuccess: () => {
          addNotification('Email settings updated successfully!', 'success');
        },
        onError: () => {
          addNotification('Failed to update email settings. Please try again.', 'error');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Email Configuration</h2>
      <div>
        <label htmlFor="emailConfigType" className="block mb-1 font-medium">Email Configuration Type</label>
        <select
          id="emailConfigType"
          name="type"
          value={emailConfig.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="smtp">SMTP</option>
          <option value="api">API</option>
        </select>
      </div>
      {emailConfig.type === 'smtp' ? (
        <>
          <div>
            <label htmlFor="emailHost" className="block mb-1 font-medium">SMTP Host</label>
            <input
              type="text"
              id="emailHost"
              name="host"
              value={emailConfig.host}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="emailPort" className="block mb-1 font-medium">SMTP Port</label>
            <input
              type="number"
              id="emailPort"
              name="port"
              value={emailConfig.port}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="emailUsername" className="block mb-1 font-medium">SMTP Username</label>
            <input
              type="text"
              id="emailUsername"
              name="username"
              value={emailConfig.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="emailPassword" className="block mb-1 font-medium">SMTP Password</label>
            <input
              type="password"
              id="emailPassword"
              name="password"
              value={emailConfig.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      ) : (
        <div>
          <label htmlFor="emailApiKey" className="block mb-1 font-medium">API Key</label>
          <input
            type="text"
            id="emailApiKey"
            name="apiKey"
            value={emailConfig.apiKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <Save size={20} className="mr-2" />
        Save Email Settings
      </button>
    </form>
  );
};

export default EmailSettings;