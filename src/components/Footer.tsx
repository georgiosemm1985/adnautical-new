import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AdNautical</h3>
            <p className="text-gray-400">Find your perfect boat today!</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/listings" className="text-gray-400 hover:text-white">Boats for Sale</a></li>
              <li><a href="/brokers" className="text-gray-400 hover:text-white">Boat Brokers</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Boat Loans</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Boat Transport</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sell Your Boat</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@adnautical.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 AdNautical. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;