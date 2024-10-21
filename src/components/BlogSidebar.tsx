import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { BlogCategory } from '../types';

interface BlogSidebarProps {
  categories: BlogCategory[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ categories }) => {
  const { data: articles } = useArticles();

  const recentArticles = articles?.slice(0, 5) || [];

  return (
    <div className="w-full md:w-1/3 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories?.map(category => (
            <li key={category.id}>
              <Link to={`/blog/category/${category.slug}`} className="text-blue-600 hover:underline">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
        <ul className="space-y-4">
          {recentArticles.map(article => (
            <li key={article.id}>
              <Link to={`/blog/${article.id}`} className="text-blue-600 hover:underline">
                {article.title}
              </Link>
              <p className="text-sm text-gray-600">{article.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;