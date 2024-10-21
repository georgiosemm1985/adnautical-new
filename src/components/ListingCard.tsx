import React from 'react';
import { Link } from 'react-router-dom';
import { Boat } from '../types';

type ListingCardProps = {
  listing: Boat;
};

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const listingUrl = `/listing/${listing.id}`;

  return (
    <Link to={listingUrl} className="block">
      <div className="card transition duration-300 hover:shadow-lg">
        <div className="h-48 bg-gray-200 relative">
          {listing.images && listing.images.length > 0 ? (
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
          <p className="text-gray-600 mb-2">{listing.location}, {listing.country}</p>
          <p className="text-2xl font-bold text-blue-600">${listing.price.toLocaleString()}</p>
          <button className="mt-4 w-full btn-primary">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;