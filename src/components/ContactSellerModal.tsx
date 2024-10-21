import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSettings } from '../hooks/useSettings';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingTitle: string;
  sellerEmail: string;
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({ isOpen, onClose, listingTitle, sellerEmail }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { addNotification } = useNotification();
  const { data: settings } = useSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual email sending logic here
    console.log('Sending email to:', sellerEmail);
    console.log('Email content:', { name, email, message, listingTitle });

    // Simulating email sent
    addNotification('Your message has been sent to the seller!', 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contact Seller</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              required
            ></textarea>
          </div>
          {settings?.captchaEnabled && (
            <ReCAPTCHA
              sitekey={settings.captchaApiKey}
              onChange={(value) => setCaptchaValue(value)}
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={settings?.captchaEnabled && !captchaValue}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSellerModal;