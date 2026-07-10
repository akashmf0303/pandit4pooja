import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, DollarSign, TrendingUp, TrendingDown, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit, getCountFromServer } from 'firebase/firestore';

const withTimeout = (promise, timeoutMs = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs))
  ]);
};

const translations = {
  English: {
    overviewTitle: "Dashboard Overview",
    overviewSubtitle: "Here's what's happening with your platform today.",
    generateReport: "Generate Report",
    totalBookings: "Total Bookings",
    pendingConsultations: "Pending Consultations",
    registeredUsers: "Registered Users",
    monthlyRevenue: "Monthly Revenue",
    liveDbCount: "Live database count",
    requiresAction: "Requires immediate action",
    totalPlatformUsers: "Total platform users",
    paymentPending: "Payment gateway pending",
    recentBookings: "Recent Booking Requests",
    viewAll: "View All",
    popularRituals: "Popular Rituals (This Week)",
    bookingsSuffix: "Bookings",
    noRecent: "No recent bookings found."
  },
  Hindi: {
    overviewTitle: "डैशबोर्ड सिंहावलोकन",
    overviewSubtitle: "आज आपके प्लेटफॉर्म पर जो हो रहा है उसका विवरण।",
    generateReport: "रिपोर्ट डाउनलोड करें",
    totalBookings: "कुल बुकिंग",
    pendingConsultations: "लंबित परामर्श",
    registeredUsers: "पंजीकृत उपयोगकर्ता",
    monthlyRevenue: "मासिक राजस्व",
    liveDbCount: "लाइव डेटाबेस संख्या",
    requiresAction: "तुरंत कार्रवाई आवश्यक",
    totalPlatformUsers: "कुल प्लेटफॉर्म उपयोगकर्ता",
    paymentPending: "भुगतान गेटवे लंबित",
    recentBookings: "हालिया बुकिंग अनुरोध",
    viewAll: "सभी देखें",
    popularRituals: "लोकप्रिय अनुष्ठान (इस सप्ताह)",
    bookingsSuffix: "बुकिंग",
    noRecent: "कोई हालिया बुकिंग नहीं मिली।"
  },
  Sanskrit: {
    overviewTitle: "अवलोकन फलकम्",
    overviewSubtitle: "अद्य भवतः प्रचालन फलके यत् प्रचलति तस्य वृत्तम्।",
    generateReport: "विवरणपत्रं प्राप्नुत",
    totalBookings: "योग-आरक्षणम्",
    pendingConsultations: "लंबित-विचारविमर्शः",
    registeredUsers: "पंजीकृत-प्रयोक्तारः",
    monthlyRevenue: "मासिक-आयः",
    liveDbCount: "प्रत्यक्ष-संख्या",
    requiresAction: "शीघ्रसंशोधनम् आवश्यकम्",
    totalPlatformUsers: "योग-प्रयोक्तारः",
    paymentPending: "धन-प्रक्रिया अपूर्णा",
    recentBookings: "नूतन-आरक्षण-प्रार्थनाः",
    viewAll: "सर्वं पश्यन्तु",
    popularRituals: "मुख्य-पूजाह्निकम् (सप्ताह-विशिष्टम्)",
    bookingsSuffix: "आरक्षणम्",
    noRecent: "नूतन-आरक्षणं न लब्धम्।"
  }
};

import toast from 'react-hot-toast';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('English');
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeUsers: 0,
    pendingConsultations: 0,
    recentBookings: []
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('admin_language') || 'English';
    setLang(savedLang);

    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_language') || 'English');
    };
    window.addEventListener('admin_language_changed', handleLangChange);
    return () => window.removeEventListener('admin_language_changed', handleLangChange);
  }, []);

  const handleGenerateReport = () => {
    if (stats.totalBookings === 0) {
      toast.error('No booking records available to generate report.');
      return;
    }
    const headers = ['Report Date', 'Total Bookings', 'Pending Consultations', 'Active Users'];
    const rows = [
      [new Date().toLocaleDateString(), stats.totalBookings, stats.pendingConsultations, stats.activeUsers]
    ];
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `platform_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Platform status report generated and downloaded!');
  };

  const t = translations[lang] || translations.English;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Load from localStorage first for instant display / fallback
      const localKey = 'bookings_all_fallback';
      const localData = localStorage.getItem(localKey);
      let localBookings = localData ? JSON.parse(localData) : [];
      
      // Calculate initial stats from local bookings
      const localPendingCount = localBookings.filter(b => b.status === 'Pending Consult' || b.status === 'Pending').length;
      
      setStats({
        totalBookings: localBookings.length,
        activeUsers: localBookings.length > 0 ? new Set(localBookings.map(b => b.userId || b.user_id)).size : 0,
        pendingConsultations: localPendingCount,
        recentBookings: localBookings.slice(0, 5).map(b => ({
          id: b.bookingId || b.id,
          ...b,
          profiles: { full_name: b.contact?.fullName || b.profiles?.full_name || 'Guest User' }
        }))
      });

      try {
        const bookingsCol = collection(db, 'bookings');
        const profilesCol = collection(db, 'profiles');

        // Fetch total bookings
        const totalBookingsSnap = await withTimeout(getCountFromServer(bookingsCol), 2000);
        const bookingsCount = totalBookingsSnap.data().count;

        // Fetch pending consultations
        const pendingQuery = query(bookingsCol, where('status', 'in', ['Pending Consult', 'Pending Consultation', 'Pending']));
        const pendingSnap = await withTimeout(getCountFromServer(pendingQuery), 2000);
        const pendingCount = pendingSnap.data().count;

        // Fetch active users
        const profilesSnap = await withTimeout(getCountFromServer(profilesCol), 2000);
        const usersCount = profilesSnap.data().count;

        // Fetch recent bookings with user details
        const recentQuery = query(bookingsCol, orderBy('created_at', 'desc'), limit(5));
        const recentSnap = await withTimeout(getDocs(recentQuery), 2500);
        
        const recent = [];
        for (const docSnapshot of recentSnap.docs) {
          const bookingData = docSnapshot.data();
          const userId = bookingData.user_id || bookingData.userId;
          
          let profileName = 'Unknown User';
          if (userId) {
            const profileSnap = await withTimeout(getDoc(doc(db, 'profiles', userId)), 2000);
            if (profileSnap.exists()) {
              profileName = profileSnap.data().full_name || 'Unknown User';
            }
          } else {
            profileName = bookingData.contact?.fullName || 'Guest User';
          }
          
          recent.push({
            id: docSnapshot.id,
            ...bookingData,
            profiles: {
              full_name: profileName
            }
          });
        }

        // Merge local storage items if they are not in the Firestore database yet (e.g. offline sandbox testing)
        const mergedMap = new Map();
        localBookings.forEach(b => mergedMap.set(b.bookingId || b.id, {
          id: b.bookingId || b.id,
          ...b,
          profiles: { full_name: b.contact?.fullName || b.profiles?.full_name || 'Guest User' }
        }));
        recent.forEach(b => mergedMap.set(b.bookingId || b.id, b));
        
        const mergedRecent = Array.from(mergedMap.values());
        mergedRecent.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));

        setStats({
          totalBookings: Math.max(bookingsCount || 0, localBookings.length),
          activeUsers: Math.max(usersCount || 0, new Set(localBookings.map(b => b.userId || b.user_id)).size),
          pendingConsultations: Math.max(pendingCount || 0, localPendingCount),
          recentBookings: mergedRecent.slice(0, 5)
        });
      } catch (err) {
        console.warn("[ADMIN DASHBOARD] Error querying firestore, showing local storage only:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--admin-accent)" />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="admin-header">
        <div>
          <h1>{t.overviewTitle}</h1>
          <p>{t.overviewSubtitle}</p>
        </div>
        <button onClick={handleGenerateReport} className="btn-admin-primary">
          {t.generateReport}
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <Calendar size={20} className="status-info" style={{ background: 'transparent' }} />
            <span>{t.totalBookings}</span>
          </div>
          <div className="metric-value">{stats.totalBookings}</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            {t.liveDbCount}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <Clock size={20} className="status-warning" style={{ background: 'transparent', color: 'var(--admin-warning)' }} />
            <span>{t.pendingConsultations}</span>
          </div>
          <div className="metric-value">{stats.pendingConsultations}</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            {t.requiresAction}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <Users size={20} style={{ color: 'var(--admin-accent)' }} />
            <span>{t.registeredUsers}</span>
          </div>
          <div className="metric-value">{stats.activeUsers}</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            {t.totalPlatformUsers}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <DollarSign size={20} className="status-success" style={{ background: 'transparent', color: 'var(--admin-success)' }} />
            <span>{t.monthlyRevenue}</span>
          </div>
          <div className="metric-value">₹0</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            {t.paymentPending}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>{t.recentBookings}</h3>
            <Link to="/admin/bookings" className="btn-admin-action">{t.viewAll}</Link>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-secondary)' }}>
                      {t.noRecent}
                    </td>
                  </tr>
                ) : (
                  stats.recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td style={{ fontWeight: '500' }}>{booking.id.substring(0, 8).toUpperCase()}</td>
                      <td>{booking.profiles?.full_name || 'Unknown User'}</td>
                      <td><span className={`status-badge status-${booking.status.toLowerCase().includes('pending') ? 'pending' : 'confirmed'}`}>{booking.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>{t.popularRituals}</h3>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>1. Griha Pravesh Puja</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>42 {t.bookingsSuffix}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>2. Satyanarayan Katha</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>38 {t.bookingsSuffix}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>3. Maha Mrityunjaya Jaap</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>24 {t.bookingsSuffix}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>4. Rudrabhishek</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>18 {t.bookingsSuffix}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
