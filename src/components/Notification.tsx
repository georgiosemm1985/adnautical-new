import React from 'react';
import { X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Notification: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`mb-2 p-4 rounded-md shadow-md flex items-center justify-between ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;