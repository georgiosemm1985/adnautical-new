import React, { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAddPage } from '../../hooks/usePages';
import { useNotification } from '../../context/NotificationContext';
import ImageUpload from '../../components/ImageUpload';

interface PageFormData {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
}

const ReactQuillWrapper = forwardRef<ReactQuill, ReactQuill.ReactQuillProps>((props, ref) => {
  return <ReactQuill ref={ref} {...props} />;
});

const CreatePage: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<PageFormData>();
  const [content, setContent] = useState('');
  const addPage = useAddPage();
  const { addNotification } = useNotification();

  const onSubmit = (data: PageFormData) => {
    addPage.mutate(
      { ...data, content },
      {
        onSuccess: () => {
          addNotification('Page created successfully!', 'success');
        },
        onError: () => {
          addNotification('Failed to create page. Please try again.', 'error');
        },
      }
    );
  };

  const handleImageUpload = (imageUrl: string) => {
    setValue('featuredImage', imageUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <ReactQuillWrapper theme="snow" value={content} onChange={setContent} />
      </div>

      <div>
        <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700">
          SEO Title
        </label>
        <input
          type="text"
          id="seoTitle"
          {...register('seoTitle')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700">
          SEO Description
        </label>
        <textarea
          id="seoDescription"
          {...register('seoDescription')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Featured Image</label>
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Page
      </button>
    </form>
  );
};

export default CreatePage;