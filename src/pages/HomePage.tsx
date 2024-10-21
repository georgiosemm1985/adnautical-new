import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Anchor, LifeBuoy, Wind } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import ListingCard from '../components/ListingCard';
import { useBoats } from '../hooks/useBoats';
import { useArticles } from '../hooks/useArticles';
import { useSettings } from '../hooks/useSettings';

const HomePage: React.FC = () => {
  const { data: boats, isLoading: isLoadingBoats, isError: isErrorBoats } = useBoats();
  const { data: articles, isLoading: isLoadingArticles, isError: isErrorArticles } = useArticles();
  const { data: settings } = useSettings();

  if (isLoadingBoats || isLoadingArticles) return <div>Loading...</div>;
  if (isErrorBoats || isErrorArticles) return <div>Error loading data</div>;

  const featuredListingsCount = settings?.featuredListingsCount || 3;
  const featuredArticlesCount = settings?.featuredArticlesCount || 3;

  return (
    <div className="bg-gray-100">
      <div className="relative bg-blue-600 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Luxury yacht on the ocean"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-6 text-center">Find Your Perfect Boat</h1>
          <p className="text-xl mb-8 text-center">Discover a wide range of boats for sale on AdNautical</p>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <SearchForm />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boats?.slice(0, featuredListingsCount).map((boat) => (
            <ListingCard key={boat.id} listing={boat} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/listings" className="btn-primary text-lg px-8 py-3">
            View All Listings
          </Link>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose AdNautical?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Anchor size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Browse through thousands of boats from trusted sellers worldwide.</p>
            </div>
            <div className="text-center">
              <LifeBuoy size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Our team of boating experts is here to help you find the perfect vessel.</p>
            </div>
            <div className="text-center">
              <Wind size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Smooth Sailing</h3>
              <p className="text-gray-600">Easy-to-use platform for buying, selling, and researching boats.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles?.slice(0, featuredArticlesCount).map((post) => (
            <div key={post.id} className="card transition duration-300 hover:shadow-lg">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline font-semibold">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/blog" className="btn-primary text-lg px-8 py-3">
            View All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;