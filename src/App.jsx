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
