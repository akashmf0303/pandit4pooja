import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, CheckCircle2, ChevronRight, FileText, CalendarPlus, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const withTimeout = (promise, timeoutMs = 3000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs))
  ]);
};

const UserDashboard = () => {
  const { user, profile, isAdmin, signOut, updateProfile } = useAuth();
  
  // Fetch real bookings from Firestore and LocalStorage
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const localKey = `bookings_${user.uid}`;
      const localData = localStorage.getItem(localKey);
      let localBookings = localData ? JSON.parse(localData) : [];

      if (localBookings.length > 0) {
        localBookings.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
        setBookings(localBookings);
        setLoadingBookings(false);
      }

      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await withTimeout(getDocs(q), 3000);
        const firestoreBookings = [];
        querySnapshot.forEach((doc) => {
          firestoreBookings.push({ id: doc.id, ...doc.data() });
        });

        // Merge to avoid duplicates
        const mergedMap = new Map();
        localBookings.forEach(b => mergedMap.set(b.bookingId || b.id, b));
        firestoreBookings.forEach(b => mergedMap.set(b.bookingId || b.id, b));

        const mergedList = Array.from(mergedMap.values());
        localStorage.setItem(localKey, JSON.stringify(mergedList));

        mergedList.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
        setBookings(mergedList);
      } catch (err) {
        console.warn('[DASHBOARD] Error querying firestore, showing local storage only:', err);
        if (localBookings.length === 0) {
          const local = localStorage.getItem(localKey);
          if (local) {
            const list = JSON.parse(local);
            list.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
            setBookings(list);
          }
        }
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    dob: '',
    tob: '',
    pob: ''
  });

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || user?.user_metadata?.full_name || '',
        phone: profile.phone || '',
        dob: profile.dob || '',
        tob: profile.tob || '',
        pob: profile.pob || ''
      });
    }
  }, [profile, user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    const { error } = await updateProfile(formData);
    setIsSavingProfile(false);
    if (!error) {
      setIsEditingProfile(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#faf9f7' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '32px', color: 'var(--color-accent-secondary)', fontFamily: 'var(--font-heading)' }}>My Spiritual Journey</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Manage your rituals, bookings, and profile.</p>
          </div>
          <button onClick={signOut} className="btn-outline" style={{ padding: '10px 20px' }}>Logout</button>
        </div>
        
        <div className="dashboard-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--color-text-primary)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px' }}>Active Bookings</h3>
            
            {loadingBookings ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <Loader2 className="animate-spin" size={32} color="var(--color-accent-primary)" />
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid rgba(110, 38, 14, 0.1)', textAlign: 'center' }}>
                <CalendarPlus size={48} color="var(--color-accent-primary)" style={{ margin: '0 auto 16px', opacity: 0.8 }} />
                <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>No Active Bookings</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>You haven't booked any poojas yet. Start your spiritual journey today.</p>
                <Link to="/poojas" className="btn-primary" style={{ display: 'inline-block' }}>Explore Poojas</Link>
              </div>
            ) : (
              bookings.map(booking => (
                <div key={booking.bookingId || booking.id} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid rgba(110, 38, 14, 0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{booking.bookingId || booking.id}</span>
                      <h4 style={{ fontSize: '20px', marginTop: '4px' }}>{booking.pooja_name || booking.poojaTitle || booking.pooja}</h4>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(224, 110, 56, 0.1)', color: 'var(--color-accent-primary)', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                      <Clock size={16} style={{ animation: booking.status === 'Pending Consult' ? 'pulse 2s infinite' : 'none' }} /> {booking.status}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '24px', color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {booking.booking_date || booking.schedule?.date || booking.date || 'Awaiting Muhurat'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={16} /> ₹{booking.amount || booking.basePrice}</span>
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={`/poojas/${booking.poojaId}`} className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px', textDecoration: 'none' }}>
                      View Details <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid rgba(110, 38, 14, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', margin: 0 }}>Profile Details</h4>
                {isEditingProfile && (
                  <button onClick={() => setIsEditingProfile(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                )}
              </div>
              
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Full Name</label>
                    <input type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Date of Birth</label>
                      <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Time of Birth</label>
                      <input type="time" value={formData.tob} onChange={(e) => setFormData({...formData, tob: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Place of Birth</label>
                    <input type="text" value={formData.pob} onChange={(e) => setFormData({...formData, pob: e.target.value})} placeholder="City, State" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={isSavingProfile} style={{ marginTop: '8px', padding: '10px' }}>
                    {isSavingProfile ? <Loader2 className="animate-spin" size={18} /> : 'Save Profile'}
                  </button>
                </form>
              ) : (
                <>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><strong>Name:</strong> {profile?.full_name || user?.user_metadata?.full_name || 'Spiritual Seeker'}</p>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><strong>Email:</strong> {user?.email}</p>
                  {profile?.phone && <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><strong>Phone:</strong> {profile.phone}</p>}
                  {profile?.dob && <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><strong>DOB:</strong> {profile.dob}</p>}
                  {profile?.tob && <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><strong>TOB:</strong> {profile.tob}</p>}
                  {profile?.pob && <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><strong>POB:</strong> {profile.pob}</p>}
                  <button onClick={() => setIsEditingProfile(true)} className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px', marginTop: '16px', width: '100%' }}>Edit Profile</button>
                </>
              )}
            </div>
            
            <div style={{ background: 'var(--color-accent-secondary)', color: 'white', padding: '24px', borderRadius: '16px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Need Assistance?</h4>
              <p style={{ fontSize: '14px', marginBottom: '20px', color: 'rgba(255,255,255,0.8)' }}>Our spiritual advisors are available 24/7 to help you with your booking.</p>
              <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-primary" style={{ backgroundColor: 'white', color: 'var(--color-accent-secondary)', width: '100%', textAlign: 'center', padding: '10px' }}>
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
