import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePages, useCreatePage, useUpdatePage } from '../../hooks/usePages';
import { Page } from '../../types';

const PageFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pages } = usePages();
  const createPage = useCreatePage();
  const updatePage = useUpdatePage();

  const [page, setPage] = useState<Omit<Page, 'id'>>({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    if (id && pages) {
      const existingPage = pages.find(p => p.id === parseInt(id));
      if (existingPage) setPage(existingPage);
    }
  }, [id, pages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPage(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updatePage.mutate({ ...page, id: parseInt(id) }, {
        onSuccess: () => navigate('/admin/pages'),
      });
    } else {
      createPage.mutate(page, {
        onSuccess: () => navigate('/admin/pages'),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-1">{id ? 'Edit' : 'Create'} Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={page.title}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block mb-1">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={page.slug}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            name="content"
            value={page.content}
            onChange={handleChange}
            className="input"
            rows={10}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="metaTitle" className="block mb-1">Meta Title</label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={page.metaTitle}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="metaDescription" className="block mb-1">Meta Description</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={page.metaDescription}
            onChange={handleChange}
            className="input"
            rows={3}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'} Page
        </button>
      </form>
    </div>
  );
};

export default PageFormPage;
