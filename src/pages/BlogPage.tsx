import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useBlogCategories } from '../hooks/useBlogCategories';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogSidebar from '../components/BlogSidebar';

const BlogPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { data: blogPosts, isLoading: isLoadingPosts, isError: isErrorPosts } = useArticles();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useBlogCategories();
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    if (blogPosts && categories) {
      if (categorySlug) {
        const category = categories.find(cat => cat.slug === categorySlug);
        if (category) {
          setFilteredPosts(blogPosts.filter(post => post.categoryId === category.id));
        } else {
          setFilteredPosts([]);
        }
      } else {
        setFilteredPosts(blogPosts);
      }
    }
  }, [blogPosts, categories, categorySlug]);

  if (isLoadingPosts || isLoadingCategories) return <div>Loading...</div>;
  if (isErrorPosts || isErrorCategories) return <div>Error loading blog data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="card p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6">
              {categorySlug 
                ? `${categories?.find(cat => cat.slug === categorySlug)?.name || 'Category'} Posts`
                : 'AdNautical Blog'}
            </h1>
            {filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="card transition duration-300 hover:shadow-lg">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="btn-primary inline-block"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-8">No blog posts found in this category.</p>
            )}
          </div>
        </div>
        <BlogSidebar categories={categories || []} />
      </div>
    </div>
  );
};

export default BlogPage;