import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Edit, Trash, Upload } from 'lucide-react';
import { useUsers, useUpdateUser, useAddUser, useDeleteUser } from '../../hooks/useUsers';
import { User as UserType } from '../../types';
import { useNotification } from '../../context/NotificationContext';

const UsersManager: React.FC = () => {
  const { userType } = useParams<{ userType: string }>();
  const { data: users, isLoading, isError } = useUsers();
  const updateUserMutation = useUpdateUser();
  const addUserMutation = useAddUser();
  const deleteUserMutation = useDeleteUser();
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const { addNotification } = useNotification();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  const filteredUsers = users?.filter(user => {
    switch (userType) {
      case 'buyers':
        return user.userType === 'buyer';
      case 'sellers':
        return user.userType === 'privateSeller';
      case 'brokers':
        return user.userType === 'broker';
      default:
        return true;
    }
  });

  const handleAddUser = () => {
    const newUser: Omit<UserType, 'id'> = {
      name: '',
      email: '',
      userType: userType === 'buyers' ? 'buyer' : userType === 'sellers' ? 'privateSeller' : 'broker',
      avatar: '',
      username: '',
      phone: '',
      location: '',
    };
    addUserMutation.mutate(newUser as UserType, {
      onSuccess: (addedUser) => {
        setEditingUser(addedUser);
        addNotification('New user added successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to add new user. Please try again.', 'error');
      },
    });
  };

  const handleEditUser = (user: UserType) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        addNotification('User deleted successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to delete user. Please try again.', 'error');
      },
    });
  };

  const handleSaveUser = (updatedUser: UserType) => {
    updateUserMutation.mutate(updatedUser, {
      onSuccess: () => {
        setEditingUser(null);
        addNotification('User updated successfully!', 'success');
      },
      onError: () => {
        addNotification('Failed to update user. Please try again.', 'error');
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {userType === 'buyers' ? 'Buyers' : userType === 'sellers' ? 'Sellers' : 'Brokers'}
      </h2>
      <button
        onClick={handleAddUser}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
      >
        <Plus size={20} className="mr-2" />
        Add New {userType === 'buyers' ? 'Buyer' : userType === 'sellers' ? 'Seller' : 'Broker'}
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers?.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex items-center mb-2">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{user.phone}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEditUser(user)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingUser && (
        <UserEditForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

const UserEditForm: React.FC<{
  user: UserType;
  onSave: (user: UserType) => void;
  onCancel: () => void;
}> = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [previewImage, setPreviewImage] = useState<string | null>(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setEditedUser({ ...editedUser, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-md shadow">
      <h3 className="text-xl font-semibold mb-4">{user.id ? 'Edit User' : 'Add New User'}</h3>
      <div className="mb-4">
        <label className="block mb-1">Avatar</label>
        <div className="flex items-center">
          <div
            className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
            onClick={handleImageClick}
          >
            {previewImage ? (
              <img src={previewImage} alt="User avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Upload size={24} className="text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <span className="ml-4 text-sm text-gray-600">Click to upload a new image</span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-1">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={editedUser.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={editedUser.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UsersManager;
