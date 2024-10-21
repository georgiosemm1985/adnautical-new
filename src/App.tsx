import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import CategoriesManager from './components/admin/CategoriesManager';
import UsersManager from './components/admin/UsersManager';
import ListingsManager from './components/admin/ListingsManager';
import ArticlesManager from './components/admin/ArticlesManager';
import BlogCategoriesManager from './components/admin/BlogCategoriesManager';
import WebsiteSettings from './components/admin/WebsiteSettings';
import EmailSettings from './pages/admin/EmailSettings';
import CaptchaSettings from './pages/admin/CaptchaSettings';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLoginPage from './pages/AdminLoginPage';
import EditListingPage from './pages/EditListingPage';
import BrokersPage from './pages/BrokersPage';
import BrokerDetailPage from './pages/BrokerDetailPage';
import CreatePage from './pages/admin/CreatePage';
import MenuManager from './pages/admin/MenuManager';
import AppearanceSettings from './pages/admin/AppearanceSettings';
import HomepageEditor from './pages/admin/HomepageEditor';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/listing/:id" element={<ListingDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/category/:categorySlug" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route path="/brokers" element={<BrokersPage />} />
                <Route path="/broker/:identifier" element={<BrokerDetailPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="categories" element={<CategoriesManager />} />
                  <Route path="users/:userType" element={<UsersManager />} />
                  <Route path="listings" element={<ListingsManager />} />
                  <Route path="listings/edit/:id" element={<EditListingPage />} />
                  <Route path="listings/add" element={<EditListingPage />} />
                  <Route path="blog/posts" element={<ArticlesManager />} />
                  <Route path="blog/categories" element={<BlogCategoriesManager />} />
                  <Route path="pages" element={<ListingsManager />} /> {/* Replace with PagesManager when created */}
                  <Route path="pages/create" element={<CreatePage />} />
                  <Route path="menu" element={<MenuManager />} />
                  <Route path="settings/general" element={<WebsiteSettings />} />
                  <Route path="settings/email" element={<EmailSettings />} />
                  <Route path="settings/captcha" element={<CaptchaSettings />} />
                  <Route path="settings/appearance" element={<AppearanceSettings />} />
                  <Route path="settings/homepage" element={<HomepageEditor />} />
                </Route>
              </Routes>
            </main>
            <Footer />
            <Notification />
          </div>
        </Router>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
