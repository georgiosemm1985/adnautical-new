import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;