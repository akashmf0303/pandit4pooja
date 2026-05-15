import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import PoojaDetail from './pages/PoojaDetail/PoojaDetail';
import { Poojas } from './pages/Placeholders';
import About from './pages/About/About';
import BlogHome from './pages/Blog/BlogHome';
import BlogArticle from './pages/Blog/BlogArticle';
import PoojaAtHome from './pages/Services/PoojaAtHome';
import OnlinePooja from './pages/Services/OnlinePooja';
import FestivalPoojas from './pages/Services/FestivalPoojas';
import AstrologyConsultation from './pages/Services/AstrologyConsultation';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import BookingFlow from './pages/Booking/BookingFlow';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminLayout from './pages/Admin/AdminLayout';
import DashboardOverview from './pages/Admin/views/DashboardOverview';
import BookingManagement from './pages/Admin/views/BookingManagement';
import PoojaManagement from './pages/Admin/views/PoojaManagement';
import PanditManagement from './pages/Admin/views/PanditManagement';
import MuhuratManagement from './pages/Admin/views/MuhuratManagement';
import ContentManagement from './pages/Admin/views/ContentManagement';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Scroll to top component to ensure new pages start at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#2d3748',
            color: '#fff',
            border: '1px solid rgba(224, 110, 56, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#38a169',
              secondary: '#fff',
            },
          },
        }} />
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="poojas-at-home" element={<PoojaAtHome />} />
          <Route path="online-pooja" element={<OnlinePooja />} />
          <Route path="festival-poojas" element={<FestivalPoojas />} />
          <Route path="astrology-consultation" element={<AstrologyConsultation />} />
          <Route path="poojas" element={<Poojas />} />
          <Route path="poojas/:slug" element={<PoojaDetail />} />
          <Route path="blogs" element={<BlogHome />} />
          <Route path="blogs/:slug" element={<BlogArticle />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Booking Flow */}
          <Route path="booking" element={
            <ProtectedRoute>
              <BookingFlow />
            </ProtectedRoute>
          } />
          
          {/* Protected User Dashboard */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Home />} />
        </Route>
        
        {/* Admin Routes outside main Layout to avoid standard header/footer */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="poojas" element={<PoojaManagement />} />
          <Route path="pandits" element={<PanditManagement />} />
          <Route path="muhurats" element={<MuhuratManagement />} />
          <Route path="content" element={<ContentManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;
