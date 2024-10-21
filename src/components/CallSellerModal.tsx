import React from 'react';
import { X, Phone } from 'lucide-react';

interface CallSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

const CallSellerModal: React.FC<CallSellerModalProps> = ({ isOpen, onClose, phoneNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Call Seller</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="text-center">
          <p className="mb-4">You can reach the seller at:</p>
          <a
            href={`tel:${phoneNumber}`}
            className="text-3xl font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center"
          >
            <Phone size={24} className="mr-2" />
            {phoneNumber}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallSellerModal;