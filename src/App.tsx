import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/EsqueciSenha";

// Dashboard pages
import DashboardIndex from "./pages/dashboard/Index";
import DashboardLogin from "./pages/dashboard/Login";
import DashboardRegister from "./pages/dashboard/Register";
import ForgotPassword from "./pages/dashboard/ForgotPassword";

// Photographer dashboard pages
import { DashboardLayout } from "./layouts/DashboardLayout";
import EventsPage from "./pages/dashboard/photographer/Events";
import GalleryPage from "./pages/dashboard/photographer/Gallery";
import ClientsPage from "./pages/dashboard/photographer/Clients";
import ProfilePage from "./pages/dashboard/photographer/Profile";

// Client dashboard pages
import MyEventsPage from "./pages/dashboard/client/MyEvents";
import MyGalleryPage from "./pages/dashboard/client/MyGallery";
import ClientProfilePage from "./pages/dashboard/client/Profile";

// Create a client for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main website routes */}
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/cadastro-convidado" element={<Cadastro />} /> {/* Temporariamente redireciona para cadastro padrão */}
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/dashboard/login" element={<DashboardLogin />} />
          <Route path="/dashboard/register" element={<DashboardRegister />} />
          <Route path="/dashboard/forgot-password" element={<ForgotPassword />} />
          
          {/* Photographer dashboard routes */}
          <Route path="/dashboard/photographer" element={<DashboardLayout userType="photographer" />}>
            <Route index element={<EventsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          {/* Client dashboard routes */}
          <Route path="/dashboard/client" element={<DashboardLayout userType="client" />}>
            <Route index element={<MyEventsPage />} />
            <Route path="my-events" element={<MyEventsPage />} />
            <Route path="my-gallery" element={<MyGalleryPage />} />
            <Route path="profile" element={<ClientProfilePage />} />
          </Route>
          
          {/* Add the gallery route */}
          <Route path="/gallery/:token" element={<GalleryPage />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
