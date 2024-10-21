import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoats, useUpdateBoat, useAddBoat } from '../hooks/useBoats';
import { useUsers } from '../hooks/useUsers';
import { useCategories } from '../hooks/useCategories';
import { Boat, User } from '../types';
import { useNotification } from '../context/NotificationContext';
import Select from 'react-select';
import ImageUpload from '../components/ImageUpload';

const EditListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: boats } = useBoats();
  const { data: users } = useUsers();
  const { data: categories } = useCategories();
  const updateBoatMutation = useUpdateBoat();
  const addBoatMutation = useAddBoat();
  const { addNotification } = useNotification();
  const [listing, setListing] = useState<Partial<Boat>>({
    title: '',
    price: 0,
    location: '',
    country: '',
    images: [],
    length: 0,
    width: 0,
    depth: 0,
    engine: '',
    year: new Date().getFullYear(),
    condition: '',
    description: '',
    sellerId: 1,
    category: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
  });
  const [slugError, setSlugError] = useState('');
  const [sellerOptions, setSellerOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    if (id && boats) {
      const foundListing = boats.find(boat => boat.id === Number(id));
      if (foundListing) {
        setListing(foundListing);
      }
    }
  }, [boats, id]);

  useEffect(() => {
    if (users) {
      const options = users
        .filter(user => user.userType === 'broker' || user.userType === 'privateSeller')
        .map(user => ({
          value: user.id,
          label: `${user.name} (${user.userType === 'broker' ? 'Broker' : 'Private Seller'})`
        }));
      setSellerOptions(options);
      console.log('Seller options:', options); // Add this line
    }
  }, [users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setListing(prev => ({ ...prev, [name]: name === 'price' || name === 'year' || name === 'length' || name === 'width' || name === 'depth' ? Number(value) : value }));

    if (name === 'slug') {
      const slugExists = boats?.some(boat => boat.slug === value && boat.id !== Number(id));
      setSlugError(slugExists ? 'This slug already exists' : '');
    }
  };

  const handleSellerChange = (selectedOption: any) => {
    console.log('Selected seller:', selectedOption);
    setListing(prev => ({ ...prev, sellerId: selectedOption.value }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setListing(prev => ({ ...prev, images: [...prev.images!, imageUrl] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slugError) {
      addNotification('Please fix the slug error before submitting.', 'error');
      return;
    }

    const boatData = {
      ...listing,
      slug: listing.slug || listing.title?.toLowerCase().replace(/\s+/g, '-'),
    } as Boat;

    if (id) {
      updateBoatMutation.mutate(boatData, {
        onSuccess: () => {
          addNotification('Listing updated successfully!', 'success');
          navigate('/admin/listings');
        },
        onError: () => {
          addNotification('Failed to update listing. Please try again.', 'error');
        },
      });
    } else {
      addBoatMutation.mutate(boatData, {
        onSuccess: () => {
          addNotification('New listing added successfully!', 'success');
          navigate('/admin/listings');
        },
        onError: () => {
          addNotification('Failed to add new listing. Please try again.', 'error');
        },
      });
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit' : 'Add'} Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={listing.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={listing.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={listing.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-1 font-medium">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={listing.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="length" className="block mb-1 font-medium">Length</label>
          <input
            type="number"
            id="length"
            name="length"
            value={listing.length}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="width" className="block mb-1 font-medium">Width</label>
          <input
            type="number"
            id="width"
            name="width"
            value={listing.width}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="depth" className="block mb-1 font-medium">Depth</label>
          <input
            type="number"
            id="depth"
            name="depth"
            value={listing.depth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="engine" className="block mb-1 font-medium">Engine</label>
          <input
            type="text"
            id="engine"
            name="engine"
            value={listing.engine}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="year" className="block mb-1 font-medium">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={listing.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="condition" className="block mb-1 font-medium">Condition</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={listing.condition}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={listing.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={listing.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="seoTitle" className="block mb-1 font-medium">SEO Title</label>
          <input
            type="text"
            id="seoTitle"
            name="seoTitle"
            value={listing.seoTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="seoDescription" className="block mb-1 font-medium">SEO Description</label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            value={listing.seoDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Images</label>
          <ImageUpload onImageUpload={handleImageUpload} multiple={true} />
          <div className="mt-2 flex flex-wrap gap-2">
            {listing.images?.map((image, index) => (
              <img key={index} src={image} alt={`Listing image ${index + 1}`} className="w-24 h-24 object-cover rounded" />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="sellerId" className="block mb-1 font-medium">Seller</label>
          <Select
            id="sellerId"
            name="sellerId"
            value={sellerOptions.find(option => option.value === listing.sellerId)}
            onChange={handleSellerChange}
            options={sellerOptions}
            className="w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default EditListingPage;
