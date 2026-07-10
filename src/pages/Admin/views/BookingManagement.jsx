import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { collection, query, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Pending Consult': return 'status-pending';
    case 'Muhurat Confirmed': return 'status-info';
    case 'Confirmed': return 'status-confirmed';
    case 'Completed': return 'status-confirmed';
    default: return '';
  }
};

const withTimeout = (promise, timeoutMs = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs))
  ]);
};

const translations = {
  English: {
    title: "Booking Management",
    subtitle: "Process requests, confirm muhurats, and assign pandits.",
    filters: "Filters",
    exportCsv: "Export CSV",
    searchPlaceholder: "Search by Booking ID, Customer, or Phone...",
    colDetails: "Booking Details",
    colRitual: "Ritual & Location",
    colSchedule: "Schedule",
    colStatus: "Status",
    colActions: "Actions",
    noBookings: "No bookings found in the database.",
    manage: "Manage",
    manageStatusTitle: "Manage Booking Status",
    updateForId: "Update status for Booking ID:",
    selectStatus: "Select Status",
    cancel: "Cancel",
    saveStatus: "Save Status",
    saving: "Saving...",
    all: "All Statuses",
    awaitingMuhurat: "Awaiting Muhurat"
  },
  Hindi: {
    title: "बुकिंग प्रबंधन",
    subtitle: "अनुरोधों को स्वीकारें, मुहूर्त तय करें, और पंडित नियुक्त करें।",
    filters: "फ़िल्टर",
    exportCsv: "सीएसवी निर्यात",
    searchPlaceholder: "बुकिंग आईडी, ग्राहक या फोन द्वारा खोजें...",
    colDetails: "बुकिंग विवरण",
    colRitual: "अनुष्ठान एवं स्थान",
    colSchedule: "समय-सारणी",
    colStatus: "स्थिति",
    colActions: "कार्रवाई",
    noBookings: "डेटाबेस में कोई बुकिंग नहीं मिली।",
    manage: "प्रबंधन",
    manageStatusTitle: "बुकिंग स्थिति प्रबंधित करें",
    updateForId: "बुकिंग आईडी के लिए स्थिति बदलें:",
    selectStatus: "स्थिति चुनें",
    cancel: "रद्द करें",
    saveStatus: "स्थिति सहेजें",
    saving: "सहेज रहा है...",
    all: "सभी स्थितियाँ",
    awaitingMuhurat: "मुहूर्त की प्रतीक्षा"
  },
  Sanskrit: {
    title: "आरक्षण-व्यवस्थापनम्",
    subtitle: "आरक्षण-प्रार्थनाः परिशोधयन्तु, मुहूर्तं निर्धारयन्तु, आचार्यान् नियोजयन्तु च।",
    filters: "शोधकम्",
    exportCsv: "पट्टिका-निर्यातम्",
    searchPlaceholder: "आरक्षण-क्रमाङ्कः, ग्राहकः वा दूरभाषेण अन्वेषणम्...",
    colDetails: "आरक्षण-विवरणम्",
    colRitual: "अनुष्ठानम् स्थानं च",
    colSchedule: "समय-तालिका",
    colStatus: "स्थितिः",
    colActions: "प्रचालनम्",
    noBookings: "आरक्षण-विवरणं न प्राप्तम्।",
    manage: "प्रबन्धः",
    manageStatusTitle: "आरक्षण-स्थिति-परिवर्तनम्",
    updateForId: "अस्य आरक्षण-क्रमाङ्कस्य स्थितिं परिवर्तयन्तु:",
    selectStatus: "स्थितिं चिनोतु",
    cancel: "निरस्तीकरणम्",
    saveStatus: "स्थितिं रक्षतु",
    saving: "रक्षणं प्रचलति...",
    all: "सर्वाः स्थितयः",
    awaitingMuhurat: "मुहूर्त-प्रतीक्षा"
  }
};

import toast from 'react-hot-toast';

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [lang, setLang] = useState('English');

  useEffect(() => {
    const savedLang = localStorage.getItem('admin_language') || 'English';
    setLang(savedLang);

    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_language') || 'English');
    };
    window.addEventListener('admin_language_changed', handleLangChange);
    return () => window.removeEventListener('admin_language_changed', handleLangChange);
  }, []);

  const t = translations[lang] || translations.English;

  const fetchBookings = async () => {
    try {
      // Load local fallback list first
      const localKey = 'bookings_all_fallback';
      const localData = localStorage.getItem(localKey);
      let localBookings = localData ? JSON.parse(localData) : [];
      
      const mappedLocal = localBookings.map(b => ({
        id: b.bookingId || b.id,
        ...b,
        profiles: {
          full_name: b.contact?.fullName || b.profiles?.full_name || 'Guest User',
          phone: b.contact?.whatsappNumber || b.profiles?.phone || ''
        }
      }));
      
      if (mappedLocal.length > 0 && loading) {
        mappedLocal.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
        setBookings(mappedLocal);
        setLoading(false);
      }

      const bookingsCol = collection(db, 'bookings');
      const q = query(bookingsCol, orderBy('created_at', 'desc'));
      const querySnapshot = await withTimeout(getDocs(q), 2500);
      
      const fetchedBookings = [];
      for (const docSnapshot of querySnapshot.docs) {
        const bookingData = docSnapshot.data();
        const userId = bookingData.user_id || bookingData.userId;
        
        let profileData = { full_name: 'Unknown User', phone: '' };
        if (userId) {
          const profileSnap = await withTimeout(getDoc(doc(db, 'profiles', userId)), 2000);
          if (profileSnap.exists()) {
            const pd = profileSnap.data();
            profileData = {
              full_name: pd.full_name || 'Unknown User',
              phone: pd.phone || ''
            };
          }
        } else {
          profileData = {
            full_name: bookingData.contact?.fullName || 'Guest User',
            phone: bookingData.contact?.whatsappNumber || ''
          };
        }
        
        fetchedBookings.push({
          id: docSnapshot.id,
          ...bookingData,
          profiles: profileData
        });
      }

      // Merge local storage items if they are not in the Firestore database yet
      const mergedMap = new Map();
      mappedLocal.forEach(b => mergedMap.set(b.id, b));
      fetchedBookings.forEach(b => mergedMap.set(b.id || b.bookingId, b));
      
      const mergedList = Array.from(mergedMap.values());
      mergedList.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));

      setBookings(mergedList);
    } catch (error) {
      console.warn("[ADMIN] Error querying firestore, showing local storage only:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedBooking) return;
    setIsUpdating(true);
    const bookingId = selectedBooking.id || selectedBooking.bookingId;
    const userId = selectedBooking.userId || selectedBooking.user_id;

    // 1. Try updating Firestore
    try {
      const docRef = doc(db, 'bookings', bookingId);
      await setDoc(docRef, { status: newStatus }, { merge: true });
    } catch (err) {
      console.warn('[ADMIN] Failed to update status in Firestore:', err);
    }

    // 2. Update localStorage keys
    try {
      // Update global fallback list
      const globalKey = 'bookings_all_fallback';
      const globalData = localStorage.getItem(globalKey);
      if (globalData) {
        const list = JSON.parse(globalData);
        const idx = list.findIndex(b => (b.bookingId || b.id) === bookingId);
        if (idx !== -1) {
          list[idx].status = newStatus;
          localStorage.setItem(globalKey, JSON.stringify(list));
        }
      }

      // Update specific user's local bookings
      if (userId) {
        const userKey = `bookings_${userId}`;
        const userData = localStorage.getItem(userKey);
        if (userData) {
          const list = JSON.parse(userData);
          const idx = list.findIndex(b => (b.bookingId || b.id) === bookingId);
          if (idx !== -1) {
            list[idx].status = newStatus;
            localStorage.setItem(userKey, JSON.stringify(list));
          }
        }
      }
      
      toast.success('Booking status updated successfully!');
      setSelectedBooking(null);
      
      // Reload bookings to reflect the status change
      fetchBookings();
    } catch (localErr) {
      console.error('[ADMIN] Failed to update local storage status:', localErr);
      toast.error('Failed to update status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) {
      toast.error('No booking records to export.');
      return;
    }
    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Ritual', 'Date', 'Status'];
    const rows = bookings.map(b => [
      b.id,
      b.profiles?.full_name || 'Guest',
      b.profiles?.phone || '',
      b.pooja_name || b.poojaTitle || '',
      b.booking_date || b.schedule?.date || 'Awaiting Muhurat',
      b.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Bookings exported to CSV successfully!');
  };

  const filteredBookings = bookings.filter(b => {
    const term = searchTerm.toLowerCase();
    const custName = (b.profiles?.full_name || '').toLowerCase();
    const custPhone = (b.profiles?.phone || '').toLowerCase();
    const id = (b.id || '').toLowerCase();
    const matchesSearch = custName.includes(term) || custPhone.includes(term) || id.includes(term);
    const matchesFilter = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
        <Loader2 className="animate-spin" size={48} color="var(--admin-accent)" />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="admin-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowFiltersDropdown(!showFiltersDropdown)} className="btn-admin-outline">
            <Filter size={18} /> {t.filters}
          </button>
          <button onClick={handleExportCSV} className="btn-admin-primary">
            {t.exportCsv}
          </button>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-header" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
            />
          </div>

          {showFiltersDropdown && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--admin-bg)', borderRadius: '8px', border: '1px solid var(--admin-border)' }} className="slide-up">
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--admin-text-secondary)' }}>{t.selectStatus}:</span>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg-panel)', color: 'var(--admin-text-primary)', fontSize: '13px' }}
              >
                <option value="All">{t.all}</option>
                <option value="Pending Consult">Pending Consult</option>
                <option value="Muhurat Confirmed">Muhurat Confirmed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t.colDetails}</th>
                <th>{t.colRitual}</th>
                <th>{t.colSchedule}</th>
                <th>{t.colStatus}</th>
                <th>{t.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>
                    {t.noBookings}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--admin-accent)', marginBottom: '4px' }}>{b.id.substring(0, 8).toUpperCase()}</div>
                      <div style={{ fontWeight: '500' }}>{b.profiles?.full_name || 'Unknown User'}</div>
                      <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)' }}>{b.profiles?.phone || 'No phone'}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{b.pooja_name || b.poojaTitle}</div>
                      <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)' }}>Online/Remote</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--admin-text-secondary)' }}>
                        <Calendar size={14} /> {b.booking_date || b.schedule?.date || t.awaitingMuhurat}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(b.status)}`}>{b.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { setSelectedBooking(b); setNewStatus(b.status); }} className="btn-admin-action" title="Edit Booking">{t.manage}</button>
                        {b.profiles?.phone && (
                          <a href={`https://wa.me/${b.profiles.phone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="btn-admin-action" style={{ background: '#25D366', color: 'white' }} title="WhatsApp Customer">
                            <MessageCircle size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="mobile-card-view">
          {filteredBookings.length === 0 && (
             <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>
               {t.noBookings}
             </div>
          )}
          {filteredBookings.map(b => (
            <div key={b.id} className="mobile-booking-card">
              <div className="mbc-header">
                <div>
                  <div className="mbc-id">{b.id.substring(0, 8).toUpperCase()}</div>
                  <div className="mbc-customer">{b.profiles?.full_name || 'Unknown User'}</div>
                </div>
                <span className={`status-badge ${getStatusBadge(b.status)}`} style={{ fontSize: '10px' }}>{b.status}</span>
              </div>
              <div className="mbc-details">
                <div><strong>Ritual:</strong> {b.pooja_name || b.poojaTitle}</div>
                <div><strong>Date:</strong> {b.booking_date || b.schedule?.date || t.awaitingMuhurat}</div>
                <div><strong>Phone:</strong> {b.profiles?.phone || 'N/A'}</div>
              </div>
              <div className="mbc-actions">
                <button onClick={() => { setSelectedBooking(b); setNewStatus(b.status); }} className="btn-admin-outline" style={{ justifyContent: 'center' }}>{t.manage}</button>
                {b.profiles?.phone && (
                  <a href={`https://wa.me/${b.profiles.phone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="btn-admin-primary" style={{ background: '#25D366', justifyContent: 'center' }}>
                    <MessageCircle size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manage Status Modal */}
      {selectedBooking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)', padding: '20px', overflowY: 'auto' }}>
          <div style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', color: 'var(--admin-text-primary)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--admin-accent)', fontFamily: 'var(--font-heading)' }}>{t.manageStatusTitle}</h3>
            <p style={{ color: 'var(--admin-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>{t.updateForId} <strong>{selectedBooking.id.substring(0, 8).toUpperCase()}</strong></p>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--admin-text-secondary)' }}>{t.selectStatus}</label>
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
              >
                <option value="Pending Consult">Pending Consult</option>
                <option value="Muhurat Confirmed">Muhurat Confirmed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="btn-admin-outline" 
                style={{ padding: '10px 20px' }}
                disabled={isUpdating}
              >
                {t.cancel}
              </button>
              <button 
                onClick={handleUpdateStatus}
                className="btn-admin-primary" 
                style={{ padding: '10px 20px' }}
                disabled={isUpdating}
              >
                {isUpdating ? t.saving : t.saveStatus}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
