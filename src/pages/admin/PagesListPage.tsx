import React from 'react';
import { Link } from 'react-router-dom';
import { usePages, useDeletePage } from '../../hooks/usePages';

const PagesListPage: React.FC = () => {
  const { data: pages, isLoading, isError } = usePages();
  const deletePage = useDeletePage();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading pages</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-1">Pages</h1>
      <Link to="/admin/pages/new" className="btn btn-primary mb-4">Create New Page</Link>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Slug</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages?.map(page => (
            <tr key={page.id}>
              <td>{page.title}</td>
              <td>{page.slug}</td>
              <td>
                <Link to={`/admin/pages/edit/${page.id}`} className="btn btn-secondary mr-2">Edit</Link>
                <button 
                  onClick={() => deletePage.mutate(page.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagesListPage;
