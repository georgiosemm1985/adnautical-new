import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useBlogCategories, useUpdateBlogCategory, useAddBlogCategory, useDeleteBlogCategory } from '../../hooks/useBlogCategories';
import { useNotification } from '../../context/NotificationContext';
import { BlogCategory } from '../../types';

const BlogCategoriesManager: React.FC = () => {
  const { data: categories, isLoading, isError } = useBlogCategories();
  const updateCategoryMutation = useUpdateBlogCategory();
  const addCategoryMutation = useAddBlogCategory();
  const deleteCategoryMutation = useDeleteBlogCategory();
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const { addNotification } = useNotification();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog categories</div>;

  const handleAddCategory = () => {
    const newCategory: Omit<BlogCategory, 'id'> = {
      name: 'New Category',
      slug: '',
    };
    addCategoryMutation.mutate(newCategory, {
      onSuccess: (addedCategory) => {
        setEditingCategory(addedCategory);
        addNotification('New blog category added successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to add new blog category. Please try again.', 'error');
      },
    });
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategory(category);
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id, {
      onSuccess: () => {
        addNotification('Blog category deleted successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to delete blog category. Please try again.', 'error');
      },
    });
  };

  const handleSaveCategory = (updatedCategory: BlogCategory) => {
    updateCategoryMutation.mutate(updatedCategory, {
      onSuccess: () => {
        setEditingCategory(null);
        addNotification('Blog category updated successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to update blog category. Please try again.', 'error');
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Categories</h2>
      <button
        onClick={handleAddCategory}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
      >
        <Plus size={20} className="mr-2" />
        Add New Category
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map(category => (
          <div key={category.id} className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">Slug: {category.slug}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEditCategory(category)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingCategory && (
        <CategoryEditForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setEditingCategory(null)}
          existingSlugs={categories?.map(c => c.slug) || []}
        />
      )}
    </div>
  );
};

const CategoryEditForm: React.FC<{
  category: BlogCategory;
  onSave: (category: BlogCategory) => void;
  onCancel: () => void;
  existingSlugs: string[];
}> = ({ category, onSave, onCancel, existingSlugs }) => {
  const [editedCategory, setEditedCategory] = useState(category);
  const [slugError, setSlugError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCategory({ ...editedCategory, [name]: value });

    if (name === 'slug') {
      const slugExists = existingSlugs.includes(value) && value !== category.slug;
      setSlugError(slugExists ? 'This slug already exists' : '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slugError) {
      onSave(editedCategory);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-md shadow">
      <h3 className="text-xl font-semibold mb-4">{category.id ? 'Edit Category' : 'Add New Category'}</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedCategory.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block mb-1">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={editedCategory.slug}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${slugError ? 'border-red-500' : ''}`}
          required
        />
        {slugError && <p className="text-red-500 text-sm mt-1">{slugError}</p>}
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
          disabled={!!slugError}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BlogCategoriesManager;