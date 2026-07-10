import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
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
  Bell,
  Globe,
  Edit2
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

const withTimeout = (promise, timeoutMs = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs))
  ]);
};

const AdminLayout = () => {
  const { signOut, user, profile, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Language State
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Profile Edit State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [adminDisplayName, setAdminDisplayName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('admin_language');
    if (savedLang) {
      setSelectedLanguage(savedLang);
    }
  }, []);

  // Set local display name on load
  useEffect(() => {
    const savedName = localStorage.getItem('admin_name') || profile?.full_name || user?.user_metadata?.full_name || 'Admin User';
    setAdminDisplayName(savedName);
    const savedPhone = localStorage.getItem('admin_phone') || profile?.phone || '';
    setAdminPhone(savedPhone);
  }, [profile, user]);

  // Load notifications and poll for changes
  const loadNotifications = () => {
    try {
      const data = localStorage.getItem('admin_notifications');
      const list = data ? JSON.parse(data) : [];
      setNotifications(list);
      setUnreadCount(list.filter(n => !n.read).length);
    } catch (e) {
      console.warn('Failed to load notifications:', e);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark all as read
      try {
        const updatedList = notifications.map(n => ({ ...n, read: true }));
        localStorage.setItem('admin_notifications', JSON.stringify(updatedList));
        setNotifications(updatedList);
        setUnreadCount(0);
      } catch (e) {
        console.warn('Failed to mark notifications read:', e);
      }
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    localStorage.setItem('admin_language', lang);
    window.dispatchEvent(new Event('admin_language_changed'));
    toast.success(`Admin interface language set to ${lang}`);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!adminDisplayName.trim()) {
      toast.error('Admin name is required.');
      return;
    }

    setIsSavingProfile(true);
    try {
      // 1. Try updating Firestore if logged in
      if (user?.uid) {
        const docRef = doc(db, 'profiles', user.uid);
        await withTimeout(setDoc(docRef, { 
          full_name: adminDisplayName, 
          phone: adminPhone 
        }, { merge: true }), 2500);
      }
    } catch (err) {
      console.warn('[ADMIN] Failed to update profile in Firestore:', err);
    }

    // 2. Update local storage profile attributes
    localStorage.setItem('admin_name', adminDisplayName);
    localStorage.setItem('admin_phone', adminPhone);
    toast.success('Admin profile updated successfully!');
    setShowProfileModal(false);
    setIsSavingProfile(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const translations = {
    English: {
      dashboard: 'Dashboard',
      bookings: 'Bookings',
      poojas: 'Poojas',
      pandits: 'Pandits',
      muhurats: 'Muhurats',
      content: 'Content',
      operationsPortal: 'Operations Portal',
      logout: 'Logout',
      displayName: 'Admin Display Name *',
      phoneNumber: 'Contact Phone Number',
      editProfile: 'Customize Admin Profile',
      cancel: 'Cancel',
      saveSettings: 'Save Settings',
      saving: 'Saving...'
    },
    Hindi: {
      dashboard: 'डैशबोर्ड',
      bookings: 'बुकिंग्स',
      poojas: 'पूजा सूची',
      pandits: 'पंडित सूची',
      muhurats: 'शुभ मुहूर्त',
      content: 'ब्लॉग व कंटेंट',
      operationsPortal: 'ऑपरेशन्स पोर्टल',
      logout: 'लॉगआउट',
      displayName: 'प्रशासक का नाम *',
      phoneNumber: 'संपर्क फोन नंबर',
      editProfile: 'प्रशासक प्रोफ़ाइल अनुकूलित करें',
      cancel: 'रद्द करें',
      saveSettings: 'सेटिंग्स सहेजें',
      saving: 'सहेज रहा है...'
    },
    Sanskrit: {
      dashboard: 'मुख्यपट्टिका',
      bookings: 'आरक्षण-विवरणम्',
      poojas: 'पूजा-अनुष्ठानम्',
      pandits: 'आचार्याः',
      muhurats: 'शुभमुहूर्तः',
      content: 'लेखसंग्रहः',
      operationsPortal: 'प्रचालनद्वारम्',
      logout: 'निर्गमनम्',
      displayName: 'प्रबन्धकस्य नाम *',
      phoneNumber: 'सम्पर्कभाषभाष्या',
      editProfile: 'विवरणसंशोधनम्',
      cancel: 'निरस्तीकरणम्',
      saveSettings: 'परिवर्तनानि रक्षन्तु',
      saving: 'रक्षणं प्रचलति...'
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  const navItems = [
    { name: t.dashboard, path: '/admin', end: true, icon: <LayoutDashboard size={20} /> },
    { name: t.bookings, path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: t.poojas, path: '/admin/poojas', icon: <BookOpen size={20} /> },
    { name: t.pandits, path: '/admin/pandits', icon: <Users size={20} /> },
    { name: t.muhurats, path: '/admin/muhurats', icon: <CalendarDays size={20} /> },
    { name: t.content, path: '/admin/content', icon: <FileText size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <h2>Pandit4Pooja</h2>
            <span>{t.operationsPortal}</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', marginBottom: '16px' }}>
            <div 
              onClick={() => setShowProfileModal(true)}
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--admin-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', cursor: 'pointer', position: 'relative' }}
              title="Edit Profile"
            >
              {adminDisplayName.charAt(0).toUpperCase()}
              <Edit2 size={10} style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', padding: '1px', borderRadius: '50%', color: 'var(--admin-text-primary)' }} />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setShowProfileModal(true)}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--admin-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {adminDisplayName}
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
            <LogOut size={18} /> {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="icon-btn mobile-menu-toggle" onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }} className="admin-topbar-actions">
            
            {/* Language Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--admin-border)', padding: '6px 12px', borderRadius: '8px', background: 'var(--admin-bg-panel)' }}>
              <Globe size={16} color="var(--admin-text-secondary)" />
              <select 
                value={selectedLanguage}
                onChange={handleLanguageChange}
                style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--admin-text-primary)', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Sanskrit">संस्कृतम् (Sanskrit)</option>
              </select>
            </div>

            <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle Dark Mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notification Bell with interactive dropdown */}
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={handleNotificationClick} style={{ position: 'relative' }} title="Notifications">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: 'var(--admin-danger)', borderRadius: '50%' }}></span>
                )}
              </button>
              
              {showNotifications && (
                <div style={{ position: 'absolute', top: '40px', right: 0, background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', borderRadius: '12px', width: '320px', maxHeight: '400px', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 100000, padding: '8px 0' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--admin-border)', fontWeight: '600', color: 'var(--admin-text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Live Notifications</span>
                    <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
                      <X size={16} />
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--admin-text-secondary)', fontSize: '13px' }}>
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--admin-border)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px', background: n.read ? 'transparent' : 'rgba(224,110,56,0.04)' }}>
                        <div style={{ color: 'var(--admin-text-primary)' }}>{n.message}</div>
                        <div style={{ fontSize: '11px', color: 'var(--admin-text-secondary)' }}>{n.time}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>

      {/* Admin Profile Modal */}
      {showProfileModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)', padding: '20px' }}>
          <form onSubmit={handleSaveProfile} style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', color: 'var(--admin-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', margin: 0, color: 'var(--admin-accent)', fontFamily: 'var(--font-heading)' }}>{t.editProfile}</h3>
              <button type="button" onClick={() => setShowProfileModal(false)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.displayName}</label>
                <input 
                  type="text"
                  value={adminDisplayName}
                  onChange={(e) => setAdminDisplayName(e.target.value)}
                  placeholder="e.g. Acharya Ankush Shukla"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.phoneNumber}</label>
                <input 
                  type="tel"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="btn-admin-outline" 
                style={{ padding: '10px 20px' }}
                disabled={isSavingProfile}
              >
                {t.cancel}
              </button>
              <button 
                type="submit"
                className="btn-admin-primary" 
                style={{ padding: '10px 20px' }}
                disabled={isSavingProfile}
              >
                {isSavingProfile ? t.saving : t.saveSettings}
              </button>
            </div>
          </form>
        </div>
      )}

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
