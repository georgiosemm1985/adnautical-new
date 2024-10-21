import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash, Plus, Image } from 'lucide-react';
import { Boat } from '../../types';
import { useBoats, useDeleteBoat } from '../../hooks/useBoats';

const ListingsManager: React.FC = () => {
  const { data: listings, isLoading, isError } = useBoats();
  const deleteBoatMutation = useDeleteBoat();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading listings</div>;

  const handleEditListing = (id: number) => {
    navigate(`/admin/listings/edit/${id}`);
  };

  const handleDeleteListing = (id: number) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      deleteBoatMutation.mutate(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };

  const handleAddListing = () => {
    navigate('/admin/listings/add');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Listings</h2>
        <button
          onClick={handleAddListing}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Listing
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings?.map((listing: Boat) => (
              <tr key={listing.id} className="border-b">
                <td className="py-2 px-4">
                  {listing.images && listing.images.length > 0 ? (
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title} 
                      className="w-12 h-12 object-cover rounded" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Image size={24} className="text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="py-2 px-4">{listing.title}</td>
                <td className="py-2 px-4">${listing.price.toLocaleString()}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEditListing(listing.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this listing?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsManager;