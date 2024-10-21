import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import { useNotification } from '../../context/NotificationContext';

const HomepageEditor: React.FC = () => {
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();
  const { addNotification } = useNotification();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (settings?.homepageContent) {
      setContent(settings.homepageContent);
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(
      { ...settings, homepageContent: content },
      {
        onSuccess: () => {
          addNotification('Homepage content updated successfully!', 'success');
        },
        onError: () => {
          addNotification('Failed to update homepage content. Please try again.', 'error');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Homepage Content Editor</h2>
      
      <ReactQuill theme="snow" value={content} onChange={setContent} />

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Homepage Content
      </button>
    </form>
  );
};

export default HomepageEditor;