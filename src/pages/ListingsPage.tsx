import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ListingCard from '../components/ListingCard';
import { Boat } from '../types';
import { Sliders, Grid, List } from 'lucide-react';
import { useBoats } from '../hooks/useBoats';
import { useCategories } from '../hooks/useCategories';
import Breadcrumbs from '../components/Breadcrumbs';
import { countries } from '../data/countries';

const ListingsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: boats, isLoading, isError } = useBoats();
  const { data: categories } = useCategories();
  const [filteredBoats, setFilteredBoats] = useState<Boat[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState({
    keywords: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      keywords: searchParams.get('keywords') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      location: searchParams.get('location') || '',
    };
    setFilters(newFilters);
  }, [location.search]);

  useEffect(() => {
    if (boats) {
      let filtered = [...boats];

      if (filters.keywords) {
        const keywords = filters.keywords.toLowerCase().split(' ');
        filtered = filtered.filter(boat =>
          keywords.every(keyword =>
            boat.title.toLowerCase().includes(keyword) ||
            boat.description.toLowerCase().includes(keyword)
          )
        );
      }

      if (filters.category) {
        filtered = filtered.filter(boat => boat.category === filters.category);
      }

      if (filters.minPrice) {
        filtered = filtered.filter(boat => boat.price >= parseInt(filters.minPrice));
      }

      if (filters.maxPrice) {
        filtered = filtered.filter(boat => boat.price <= parseInt(filters.maxPrice));
      }

      if (filters.location) {
        filtered = filtered.filter(boat =>
          boat.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      setFilteredBoats(filtered);
    }
  }, [boats, filters]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
    navigate(`/listings?${searchParams.toString()}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading listings</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-8 ">
        <div className="w-full md:w-64">
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="keywords" className="block mb-1">Keywords</label>
                <input
                  type="text"
                  id="keywords"
                  value={filters.keywords}
                  onChange={(e) => handleFilterChange('keywords', e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-1">Category</label>
                <Select
                  options={categories?.map(cat => ({ value: cat.slug, label: cat.name })) || []}
                  value={{ value: filters.category, label: categories?.find(cat => cat.slug === filters.category)?.name || '' }}
                  onChange={(selected) => handleFilterChange('category', selected?.value || '')}
                  isClearable
                />
              </div>
              <div>
                <label htmlFor="minPrice" className="block mb-1">Min Price</label>
                <input
                  type="number"
                  id="minPrice"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block mb-1">Max Price</label>
                <input
                  type="number"
                  id="maxPrice"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="location" className="block mb-1">Location</label>
                <input
                  type="text"
                  id="location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input"
                />
              </div>
              <button
                onClick={applyFilters}
                className="btn-primary w-full"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        <div className=" card p-6 mb-8 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Boat Listings</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden btn-secondary flex items-center"
              >
                <Sliders size={20} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoats.map(boat => (
                <ListingCard key={boat.id} listing={boat} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBoats.map(boat => (
                <ListingListItem key={boat.id} listing={boat} />
              ))}
            </div>
          )}
          {filteredBoats.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No listings found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ListingListItem: React.FC<{ listing: Boat }> = ({ listing }) => {
  return (
    <div className="card p-4 flex">
      <img src={listing.images[0]} alt={listing.title} className="w-32 h-32 object-cover rounded-md mr-4" />
      <div>
        <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
        <p className="text-gray-600 mb-2">{listing.location}, {listing.country}</p>
        <p className="text-2xl font-bold text-blue-600">${listing.price.toLocaleString()}</p>
        <button className="mt-2 btn-primary">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ListingsPage;