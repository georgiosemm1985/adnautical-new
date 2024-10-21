import React, { useState } from 'react';
import { Plus, Edit, Trash, Upload } from 'lucide-react';
import { BlogPost, BlogCategory } from '../../types';
import { useArticles, useAddArticle, useUpdateArticle, useDeleteArticle } from '../../hooks/useArticles';
import { useBlogCategories } from '../../hooks/useBlogCategories';
import { useNotification } from '../../context/NotificationContext';
import Select from 'react-select';

const ArticlesManager: React.FC = () => {
  const { data: articles, isLoading, isError } = useArticles();
  const addArticleMutation = useAddArticle();
  const updateArticleMutation = useUpdateArticle();
  const deleteArticleMutation = useDeleteArticle();
  const { addNotification } = useNotification();
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;

  const handleAddArticle = () => {
    const newArticle: Omit<BlogPost, 'id'> = {
      title: 'New Article',
      excerpt: 'New article excerpt',
      content: 'New article content',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      image: '',
      categoryId: 1, // Default category ID
      seoTitle: '',
      seoDescription: '',
    };
    addArticleMutation.mutate(newArticle, {
      onSuccess: (addedArticle) => {
        addNotification('Article added successfully!', 'success');
        setEditingArticle(addedArticle);
      },
      onError: () => {
        addNotification('Failed to add article. Please try again.', 'error');
      },
    });
  };

  const handleEditArticle = (article: BlogPost) => {
    setEditingArticle(article);
  };

  const handleDeleteArticle = (id: number) => {
    deleteArticleMutation.mutate(id, {
      onSuccess: () => {
        addNotification('Article deleted successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to delete article. Please try again.', 'error');
      },
    });
  };

  const handleSaveArticle = (updatedArticle: BlogPost) => {
    updateArticleMutation.mutate(updatedArticle, {
      onSuccess: () => {
        addNotification('Article updated successfully!', 'success');
        setEditingArticle(null);
      },
      onError: () => {
        addNotification('Failed to update article. Please try again.', 'error');
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleAddArticle}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
      >
        <Plus size={20} className="mr-2" />
        Add New Article
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.map(article => (
          <div key={article.id} className="bg-white p-4 rounded-md shadow">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEditArticle(article)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteArticle(article.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingArticle && (
        <ArticleEditForm
          article={editingArticle}
          onSave={handleSaveArticle}
          onCancel={() => setEditingArticle(null)}
        />
      )}
    </div>
  );
};

const ArticleEditForm: React.FC<{
  article: BlogPost;
  onSave: (article: BlogPost) => void;
  onCancel: () => void;
}> = ({ article, onSave, onCancel }) => {
  const [editedArticle, setEditedArticle] = useState(article);
  const [previewImage, setPreviewImage] = useState<string | null>(article.image);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { data: categories } = useBlogCategories();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedArticle({ ...editedArticle, [name]: value });
  };

  const handleCategoryChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setEditedArticle({ ...editedArticle, categoryId: selectedOption.value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setEditedArticle({ ...editedArticle, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedArticle);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-md shadow">
      <h3 className="text-xl font-semibold mb-4">{article.id ? 'Edit Article' : 'Add New Article'}</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editedArticle.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="excerpt" className="block mb-1 font-medium">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={editedArticle.excerpt}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-1 font-medium">Content</label>
        <textarea
          id="content"
          name="content"
          value={editedArticle.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          rows={6}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="seoTitle" className="block mb-1 font-medium">SEO Title</label>
        <input
          type="text"
          id="seoTitle"
          name="seoTitle"
          value={editedArticle.seoTitle || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="seoDescription" className="block mb-1 font-medium">SEO Description</label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          value={editedArticle.seoDescription || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Image</label>
        <div className="flex items-center">
          <div
            className="w-48 h-32 bg-gray-200 cursor-pointer overflow-hidden"
            onClick={handleImageClick}
          >
            {previewImage ? (
              <img src={previewImage} alt="Article image" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Upload size={24} className="text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <span className="ml-4 text-sm text-gray-600">Click to upload a new image</span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-1 font-medium">Category</label>
        <Select
          id="category"
          value={categories?.find(cat => cat.id === editedArticle.categoryId)}
          onChange={handleCategoryChange}
          options={categories?.map(cat => ({ value: cat.id, label: cat.name }))}
          className="w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ArticlesManager;
