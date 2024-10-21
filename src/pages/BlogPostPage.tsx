import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogSidebar from '../components/BlogSidebar';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog post</div>;

  const post = articles?.find((p) => p.id === parseInt(id!, 10));

  if (!post) return <div>Blog post not found. <Link to="/blog">Back to Blog</Link></div>;

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <div className="flex justify-between items-center text-gray-600 mb-6">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
            <div className="prose max-w-none">
              <p>{post.content}</p>
            </div>
            <div className="mt-8">
              <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
            </div>
          </div>
        </div>
        <BlogSidebar />
      </div>
    </div>
  );
};

export default BlogPostPage;