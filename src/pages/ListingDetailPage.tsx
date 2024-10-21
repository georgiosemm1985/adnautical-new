import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { useBoats } from '../hooks/useBoats';
import { useUsers } from '../hooks/useUsers';
import { Boat, User } from '../types';
import ListingCard from '../components/ListingCard';
import ContactSellerModal from '../components/ContactSellerModal';
import CallSellerModal from '../components/CallSellerModal';

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: boats, isLoading: isLoadingBoats, isError: isErrorBoats } = useBoats();
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();
  const [listing, setListing] = useState<Boat | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [relatedBoats, setRelatedBoats] = useState<Boat[]>([]);

  useEffect(() => {
    if (boats && id) {
      const foundListing = boats.find(boat => boat.id === parseInt(id, 10));
      setListing(foundListing || null);

      if (foundListing) {
        const related = boats
          .filter(boat => boat.id !== foundListing.id && boat.category === foundListing.category)
          .slice(0, 3);
        setRelatedBoats(related);
      }
    }
  }, [boats, id]);

  useEffect(() => {
    if (listing && users) {
      const foundSeller = users.find(user => user.id === listing.sellerId);
      setSeller(foundSeller || null);
    }
  }, [listing, users]);

  if (isLoadingBoats || isLoadingUsers) return <div>Loading...</div>;
  if (isErrorBoats || isErrorUsers) return <div>Error loading listing details</div>;
  if (!listing) return <div>Listing not found</div>;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/listings" className="text-blue-600 hover:underline">
          ← Back to Listings
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img
              src={listing.images[currentImageIndex]}
              alt={`${listing.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${listing.title} - Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  index === currentImageIndex ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${listing.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-4">
            {listing.location}, {listing.country}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Specifications</h2>
            <ul className="list-disc list-inside">
              <li>Length: {listing.length} ft</li>
              <li>Width: {listing.width} ft</li>
              <li>Depth: {listing.depth} ft</li>
              <li>Engine: {listing.engine}</li>
              <li>Year: {listing.year}</li>
              <li>Condition: {listing.condition}</li>
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{listing.description}</p>
          </div>
          {seller && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
              <div className="flex items-center mb-2">
                <img src={seller.avatar} alt={seller.name} className="w-12 h-12 object-cover rounded-full mr-4" />
                <div>
                  <span className="font-semibold">{seller.name}</span>
                  <p className="text-gray-600">{seller.userType === 'broker' ? seller.businessName : 'Private Seller'}</p>
                </div>
              </div>
              {seller.userType === 'broker' && (
                <div className="mb-4">
                  <p><strong>License Number:</strong> {seller.licenseNumber}</p>
                  <p><strong>Years of Experience:</strong> {seller.yearsOfExperience}</p>
                  <p><strong>Specialties:</strong> {seller.specialties?.join(', ')}</p>
                  {seller.website && (
                    <p>
                      <strong>Website:</strong>{' '}
                      <a href={seller.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {seller.website}
                      </a>
                    </p>
                  )}
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  <Mail size={20} className="mr-2" />
                  Contact Seller
                </button>
                <button
                  onClick={() => setIsCallModalOpen(true)}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                >
                  <Phone size={20} className="mr-2" />
                  Call Seller
                </button>
                {seller.userType === 'broker' && seller.website && (
                  <a
                    href={seller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                  >
                    <Globe size={20} className="mr-2" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Boats Section */}
      {relatedBoats.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Boats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBoats.map((boat) => (
              <ListingCard key={boat.id} listing={boat} />
            ))}
          </div>
        </div>
      )}

      {seller && (
        <>
          <ContactSellerModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            listingTitle={listing.title}
            sellerEmail={seller.email}
          />
          <CallSellerModal
            isOpen={isCallModalOpen}
            onClose={() => setIsCallModalOpen(false)}
            phoneNumber={seller.phone}
          />
        </>
      )}
    </div>
  );
};

export default ListingDetailPage;