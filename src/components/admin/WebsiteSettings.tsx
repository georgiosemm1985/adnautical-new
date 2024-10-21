import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

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

const WebsiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
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
  });

  const { addNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEmailConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      emailConfig: {
        ...prev.emailConfig,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save settings
    console.log('Saving settings:', settings);
    addNotification('Settings saved successfully!', 'success');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="siteName" className="block mb-1 font-medium">Site Name</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block mb-1 font-medium">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="featuredListingsCount" className="block mb-1 font-medium">Featured Listings Count</label>
            <input
              type="number"
              id="featuredListingsCount"
              name="featuredListingsCount"
              value={settings.featuredListingsCount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="12"
              required
            />
          </div>
          <div>
            <label htmlFor="featuredArticlesCount" className="block mb-1 font-medium">Featured Articles Count</label>
            <input
              type="number"
              id="featuredArticlesCount"
              name="featuredArticlesCount"
              value={settings.featuredArticlesCount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="12"
              required
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="allowUserRegistration"
                checked={settings.allowUserRegistration}
                onChange={handleChange}
                className="mr-2"
              />
              Allow User Registration
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="mr-2"
              />
              Maintenance Mode
            </label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Email Configuration</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="emailConfigType" className="block mb-1 font-medium">Email Configuration Type</label>
            <select
              id="emailConfigType"
              name="type"
              value={settings.emailConfig.type}
              onChange={handleEmailConfigChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="smtp">SMTP</option>
              <option value="api">API</option>
            </select>
          </div>
          {settings.emailConfig.type === 'smtp' ? (
            <>
              <div>
                <label htmlFor="emailHost" className="block mb-1 font-medium">SMTP Host</label>
                <input
                  type="text"
                  id="emailHost"
                  name="host"
                  value={settings.emailConfig.host}
                  onChange={handleEmailConfigChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="emailPort" className="block mb-1 font-medium">SMTP Port</label>
                <input
                  type="number"
                  id="emailPort"
                  name="port"
                  value={settings.emailConfig.port}
                  onChange={handleEmailConfigChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="emailUsername" className="block mb-1 font-medium">SMTP Username</label>
                <input
                  type="text"
                  id="emailUsername"
                  name="username"
                  value={settings.emailConfig.username}
                  onChange={handleEmailConfigChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="emailPassword" className="block mb-1 font-medium">SMTP Password</label>
                <input
                  type="password"
                  id="emailPassword"
                  name="password"
                  value={settings.emailConfig.password}
                  onChange={handleEmailConfigChange}
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
                value={settings.emailConfig.apiKey}
                onChange={handleEmailConfigChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Captcha Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="captchaEnabled"
                checked={settings.captchaEnabled}
                onChange={handleChange}
                className="mr-2"
              />
              Enable Captcha
            </label>
          </div>
          {settings.captchaEnabled && (
            <>
              <div>
                <label htmlFor="captchaApiKey" className="block mb-1 font-medium">Captcha API Key</label>
                <input
                  type="text"
                  id="captchaApiKey"
                  name="captchaApiKey"
                  value={settings.captchaApiKey}
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
                  value={settings.captchaSecretKey}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <Save size={20} className="mr-2" />
        Save Settings
      </button>
    </form>
  );
};

export default WebsiteSettings;