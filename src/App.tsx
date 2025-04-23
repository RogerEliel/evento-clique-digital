
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import EsqueciSenha from './pages/EsqueciSenha';
import PublicGalleryPage from './pages/gallery/[token]';
import DashboardIndex from './pages/dashboard/Index';
import DashboardLogin from './pages/dashboard/Login';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/gallery/:token" element={<PublicGalleryPage />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard">
          <Route index element={<DashboardIndex />} />
          <Route path="login" element={<DashboardLogin />} />
          <Route path="register" element={<DashboardRegister />} />
          <Route path="esqueci-senha" element={<DashboardForgotPassword />} />
          
          {/* Photographer routes */}
          <Route path="photographer" element={<DashboardLayout userType="photographer" />}>
            <Route index element={<PhotographerDashboard />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="gallery" element={<PhotographerGalleryPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
          
          {/* Client routes */}
          <Route path="client" element={<DashboardLayout userType="client" />}>
            <Route index element={<div>Client Dashboard</div>} />
            <Route path="my-events" element={<MyEventsPage />} />
            <Route path="my-gallery" element={<MyGallery />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
