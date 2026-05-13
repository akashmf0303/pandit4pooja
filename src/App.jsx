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
import ProtectedRoute from './components/Auth/ProtectedRoute';
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
          <ProtectedRoute requireRole="admin">
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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import BookPuja from './pages/BookPuja';

import Services from './pages/Services';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';

import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminResourceManager from './pages/Admin/ResourceManager';
import DesignSystem from './pages/DesignSystem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="book" element={<BookPuja />} />
          <Route path="design-system" element={<DesignSystem />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminResourceManager />} />
          <Route path="services" element={<AdminResourceManager />} />
          <Route path="pandits" element={<AdminResourceManager />} />
          <Route path="courses" element={<AdminResourceManager />} />
          <Route path="payments" element={<AdminResourceManager />} />
          <Route path="users" element={<AdminResourceManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
