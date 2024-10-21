import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, Users, FileText, Settings, BookOpen, ChevronDown, ChevronUp, Sliders, FileEdit, Menu } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const [usersSubmenuOpen, setUsersSubmenuOpen] = useState(false);
  const [blogSubmenuOpen, setBlogSubmenuOpen] = useState(false);
  const [settingsSubmenuOpen, setSettingsSubmenuOpen] = useState(false);
  const [pagesSubmenuOpen, setPagesSubmenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-2">
          <NavItem to="/admin/categories" icon={<Layers />} label="Categories" />
          <li>
            <button
              onClick={() => setUsersSubmenuOpen(!usersSubmenuOpen)}
              className="flex items-center justify-between w-full p-2 rounded-md transition duration-200 hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Users className="mr-2" />
                <span>Users</span>
              </div>
              {usersSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {usersSubmenuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <NavItem to="/admin/users/buyers" label="Buyers" />
                <NavItem to="/admin/users/sellers" label="Sellers" />
                <NavItem to="/admin/users/brokers" label="Brokers" />
              </ul>
            )}
          </li>
          <NavItem to="/admin/listings" icon={<FileText />} label="Listings" />
          <li>
            <button
              onClick={() => setBlogSubmenuOpen(!blogSubmenuOpen)}
              className="flex items-center justify-between w-full p-2 rounded-md transition duration-200 hover:bg-gray-700"
            >
              <div className="flex items-center">
                <BookOpen className="mr-2" />
                <span>Blog</span>
              </div>
              {blogSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {blogSubmenuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <NavItem to="/admin/blog/posts" label="Posts" />
                <NavItem to="/admin/blog/categories" label="Categories" />
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => setPagesSubmenuOpen(!pagesSubmenuOpen)}
              className="flex items-center justify-between w-full p-2 rounded-md transition duration-200 hover:bg-gray-700"
            >
              <div className="flex items-center">
                <FileEdit className="mr-2" />
                <span>Pages</span>
              </div>
              {pagesSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {pagesSubmenuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <NavItem to="/admin/pages" label="All Pages" />
                <NavItem to="/admin/pages/create" label="Create Page" />
              </ul>
            )}
          </li>
          <NavItem to="/admin/menu" icon={<Menu />} label="Menu Manager" />
          <li>
            <button
              onClick={() => setSettingsSubmenuOpen(!settingsSubmenuOpen)}
              className="flex items-center justify-between w-full p-2 rounded-md transition duration-200 hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Settings className="mr-2" />
                <span>Settings</span>
              </div>
              {settingsSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {settingsSubmenuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <NavItem to="/admin/settings/general" label="General" />
                <NavItem to="/admin/settings/email" label="Email" />
                <NavItem to="/admin/settings/captcha" label="Captcha" />
                <NavItem to="/admin/settings/appearance" label="Appearance" />
                <NavItem to="/admin/settings/homepage" label="Homepage" />
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const NavItem: React.FC<{ to: string; icon?: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 w-full p-2 rounded-md transition duration-200 ${
          isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
        }`
      }
    >
      {icon && icon}
      <span>{label}</span>
    </NavLink>
  </li>
);

export default AdminSidebar;