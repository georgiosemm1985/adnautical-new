import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

const BrokersPage: React.FC = () => {
  const { data: users, isLoading, isError, error } = useUsers();

  useEffect(() => {
    console.log('Users data:', users);
  }, [users]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading brokers: {error?.message}</div>;

  const brokers = users?.filter(user => user.userType === 'broker') || [];

  console.log('Filtered brokers:', brokers);

  if (brokers.length === 0) {
    return <div>No brokers found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Brokers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokers.map(broker => (
          <Link key={broker.id} to={`/broker/${broker.username}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
              {broker.avatar && (
                <img src={broker.avatar} alt={broker.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{broker.name}</h3>
                {broker.businessName && (
                  <p className="text-gray-600 mb-2">{broker.businessName}</p>
                )}
                {broker.location && (
                  <p className="text-gray-600">{broker.location}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrokersPage;
