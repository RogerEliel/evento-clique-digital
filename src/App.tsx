
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Index from './pages/Index';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import EsqueciSenha from './pages/EsqueciSenha';
import PublicGalleryPage from './pages/gallery/[token]';
import DashboardIndex from './pages/dashboard/Index';
import DashboardRegister from './pages/dashboard/Register';
import DashboardForgotPassword from './pages/dashboard/ForgotPassword';
import { DashboardLayout } from './layouts/DashboardLayout';
import EventsPage from './pages/dashboard/photographer/Events';
import PhotographerGalleryPage from './pages/dashboard/photographer/Gallery';
import ClientsPage from './pages/dashboard/photographer/Clients';
import SubscriptionPage from './pages/dashboard/photographer/Subscription';
import ProfilePage from './pages/dashboard/photographer/Profile';
import OrdersPage from './pages/dashboard/photographer/Orders';
import AnalyticsPage from './pages/dashboard/photographer/Analytics';
import MyEventsPage from './pages/dashboard/client/MyEvents';
import MyGallery from './pages/dashboard/client/MyGallery';
import ClientProfile from './pages/dashboard/client/Profile';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster";
import { PhotographerDashboard } from './pages/dashboard/photographer/Index';
import ReportsPage from './pages/dashboard/photographer/Reports';
import Settings from './pages/dashboard/photographer/Settings';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { AdminLayout } from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UsersPage from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import SearchPhotographers from './pages/SearchPhotographers';
import ForPhotographers from './pages/ForPhotographers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/gallery/:token" element={<PublicGalleryPage />} />
        
        {/* Novas rotas adicionadas */}
        <Route path="/buscar-fotografos" element={<SearchPhotographers />} />
        <Route path="/para-fotografos" element={<ForPhotographers />} />

        {/* Dashboard */}
        <Route path="/dashboard">
          <Route index element={<DashboardIndex />} />
          <Route path="register" element={<DashboardRegister />} />
          <Route path="esqueci-senha" element={<DashboardForgotPassword />} />

          {/* Redirecionamento opcional para manter compatibilidade */}
          <Route path="login" element={<Navigate to="/login" />} />

          {/* Dashboard Fotógrafo */}
          <Route
            path="photographer"
            element={
              <PrivateRoute userType="photographer">
                <DashboardLayout userType="photographer">
                  <Outlet />
                </DashboardLayout>
              </PrivateRoute>
            }
          >
            <Route index element={<PhotographerDashboard />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="gallery" element={<PhotographerGalleryPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Dashboard Cliente */}
          <Route
            path="client"
            element={
              <PrivateRoute userType="client">
                <DashboardLayout userType="client">
                  <Outlet />
                </DashboardLayout>
              </PrivateRoute>
            }
          >
            <Route index element={<div>Client Dashboard</div>} />
            <Route path="my-events" element={<MyEventsPage />} />
            <Route path="my-gallery" element={<MyGallery />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>
        </Route>

        {/* Admin Panel Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
