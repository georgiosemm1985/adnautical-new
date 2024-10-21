import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useCategories } from '../hooks/useCategories';

type SearchFormData = {
  keywords: string;
  category: { value: string; label: string } | null;
  minPrice: string;
  maxPrice: string;
  location: string;
};

const SearchForm: React.FC = () => {
  const { register, handleSubmit, control } = useForm<SearchFormData>();
  const navigate = useNavigate();
  const { data: categories, isLoading } = useCategories();

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...(categories?.map(category => ({ value: category.slug, label: category.name })) || []),
  ];

  const onSubmit = (data: SearchFormData) => {
    const searchParams = new URLSearchParams();
    if (data.keywords) searchParams.append('keywords', data.keywords);
    if (data.category?.value) searchParams.append('category', data.category.value);
    if (data.minPrice) searchParams.append('minPrice', data.minPrice);
    if (data.maxPrice) searchParams.append('maxPrice', data.maxPrice);
    if (data.location) searchParams.append('location', data.location);
    navigate(`/listings?${searchParams.toString()}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Keywords"
          {...register('keywords')}
          className="input"
        />
        <Controller
          name="category"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              className="w-full"
              placeholder="Select Category"
              isClearable
              styles={{
                control: (base) => ({
                  ...base,
                  height: '42px',
                  borderRadius: '0.375rem',
                }),
              }}
            />
          )}
        />
        <input
          type="text"
          placeholder="Location"
          {...register('location')}
          className="input"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Min Price"
          {...register('minPrice')}
          className="input"
        />
        <input
          type="number"
          placeholder="Max Price"
          {...register('maxPrice')}
          className="input"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center text-lg font-semibold"
      >
        <Search size={24} className="mr-2" />
        Search Boats
      </button>
    </form>
  );
};

export default SearchForm;