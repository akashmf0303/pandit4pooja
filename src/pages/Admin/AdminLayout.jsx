import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  BookOpen, 
  Users, 
  CalendarDays, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Moon,
  Sun,
  Bell
} from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
  const { signOut, user, profile, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: <LayoutDashboard size={20} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: 'Poojas', path: '/admin/poojas', icon: <BookOpen size={20} /> },
    { name: 'Pandits', path: '/admin/pandits', icon: <Users size={20} /> },
    { name: 'Muhurats', path: '/admin/muhurats', icon: <CalendarDays size={20} /> },
    { name: 'Content', path: '/admin/content', icon: <FileText size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <h2>Panditt4Pooja</h2>
            <span>Operations Portal</span>
          </div>
          <button className="icon-btn mobile-menu-toggle" onClick={() => setIsMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--admin-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
              {(profile?.full_name || user?.user_metadata?.full_name || 'A').charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--admin-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {profile?.full_name || user?.user_metadata?.full_name || 'Admin'}
              </div>
              <div style={{ 
                fontSize: '11px', 
                color: isSuperAdmin ? '#fff' : 'var(--admin-text-secondary)',
                backgroundColor: isSuperAdmin ? 'var(--admin-accent)' : 'rgba(0,0,0,0.05)',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-block',
                marginTop: '4px',
                fontWeight: isSuperAdmin ? '600' : '500'
              }}>
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-admin-outline" style={{ width: '100%', justifyContent: 'center' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="icon-btn mobile-menu-toggle" onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div style={{ marginLeft: 'auto' }} className="admin-topbar-actions">
            <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle Dark Mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="icon-btn" style={{ position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: 'var(--admin-danger)', borderRadius: '50%' }}></span>
            </button>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
