import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li><Link to="/brokers" className="text-blue-600 hover:text-blue-800">Brokers</Link></li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2023 Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
