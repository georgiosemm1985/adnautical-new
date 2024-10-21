import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useBoats } from '../hooks/useBoats';
import ListingCard from '../components/ListingCard';

const BrokerDetailPage: React.FC = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();
  const { data: boats, isLoading: isLoadingBoats, isError: isErrorBoats } = useBoats();

  useEffect(() => {
    console.log('BrokerDetailPage rendered');
    console.log('Identifier param:', identifier);
    console.log('Users data:', users);
    console.log('Boats data:', boats);
  }, [identifier, users, boats]);

  if (isLoadingUsers || isLoadingBoats) return <div>Loading...</div>;
  if (isErrorUsers || isErrorBoats) return <div>Error loading broker information</div>;

  const broker = users?.find(user => 
    (user.username === identifier || user.id.toString() === identifier) && user.userType === 'broker'
  );
  console.log('Found broker:', broker);

  if (!broker) return <div>Broker not found</div>;

  const brokerListings = boats?.filter(boat => boat.sellerId === broker.id) || [];
  console.log('Broker listings:', brokerListings);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <img src={broker.avatar} alt={broker.name} className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{broker.name}</h1>
            <p className="text-xl text-gray-600 mb-2">{broker.businessName}</p>
            <p className="text-gray-600">{broker.location}</p>
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            <Mail size={20} className="mr-2" />
            Email Broker
          </button>
          <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
            <Phone size={20} className="mr-2" />
            Call Broker
          </button>
        </div>
        <p className="text-gray-700">{broker.email}</p>
        <p className="text-gray-700">{broker.phone}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Listings by {broker.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokerListings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      {brokerListings.length === 0 && (
        <p className="text-gray-600">This broker currently has no listings.</p>
      )}
    </div>
  );
};

export default BrokerDetailPage;
