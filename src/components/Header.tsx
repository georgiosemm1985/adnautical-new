import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-wrap justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <Anchor size={32} />
            <span>AdNautical</span>
          </Link>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/listings" className="text-gray-600 hover:text-blue-600">Boats for Sale</Link>
            <Link to="/brokers" className="text-gray-600 hover:text-blue-600">Boat Brokers</Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
            {isAdminAuthenticated ? (
              <>
                <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin Dashboard</Link>
                <button onClick={handleAdminLogout} className="flex items-center text-gray-600 hover:text-blue-600">
                  <LogOut size={20} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
                <Link to="/admin-login" className="text-gray-600 hover:text-blue-600">Admin</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;