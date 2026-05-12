import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Pending Consult': return 'status-pending';
    case 'Muhurat Confirmed': return 'status-info';
    case 'Confirmed': return 'status-confirmed';
    case 'Completed': return 'status-confirmed';
    default: return '';
  }
};

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*, profiles(full_name, phone)')
        .order('created_at', { ascending: false });

      if (data) setBookings(data);
      if (error) console.error("Error fetching bookings:", error);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(b => {
    const term = searchTerm.toLowerCase();
    const custName = (b.profiles?.full_name || '').toLowerCase();
    const custPhone = (b.profiles?.phone || '').toLowerCase();
    const id = (b.id || '').toLowerCase();
    return custName.includes(term) || custPhone.includes(term) || id.includes(term);
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
        <Loader2 className="animate-spin" size={48} color="var(--admin-accent)" />
      </div>
    );
  }

  return (
    <div className="slide-up">
      <div className="admin-header">
        <div>
          <h1>Booking Management</h1>
          <p>Process requests, confirm muhurats, and assign pandits.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-admin-outline"><Filter size={18} /> Filters</button>
          <button className="btn-admin-primary">Export CSV</button>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-header" style={{ padding: '16px 24px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by Booking ID, Customer, or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking Details</th>
                <th>Ritual & Location</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>
                    No bookings found in the database.
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
                      <div style={{ fontWeight: '500' }}>{b.pooja_name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)' }}>Online/Remote</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--admin-text-secondary)' }}>
                        <Calendar size={14} /> {b.booking_date}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(b.status)}`}>{b.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-admin-action" title="Edit Booking">Manage</button>
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
               No bookings found.
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
                <div><strong>Ritual:</strong> {b.pooja_name}</div>
                <div><strong>Date:</strong> {b.booking_date}</div>
                <div><strong>Phone:</strong> {b.profiles?.phone || 'N/A'}</div>
              </div>
              <div className="mbc-actions">
                <button className="btn-admin-outline" style={{ justifyContent: 'center' }}>Manage</button>
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
    </div>
  );
};

export default BookingManagement;
