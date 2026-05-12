import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, DollarSign, TrendingUp, TrendingDown, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeUsers: 0,
    pendingConsultations: 0,
    recentBookings: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch total bookings
        const { count: bookingsCount, error: bCountError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        // Fetch pending consultations
        const { count: pendingCount, error: pCountError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Pending Consultation');

        // Fetch active users
        const { count: usersCount, error: uCountError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch recent bookings with user details
        const { data: recent, error: recentError } = await supabase
          .from('bookings')
          .select('id, pooja_name, status, user_id, profiles(full_name)')
          .order('created_at', { ascending: false })
          .limit(5);

        if (!bCountError && !uCountError && !recentError) {
          setStats({
            totalBookings: bookingsCount || 0,
            activeUsers: usersCount || 0,
            pendingConsultations: pendingCount || 0,
            recentBookings: recent || []
          });
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
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
    <div className="slide-up">
      <div className="admin-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Here's what's happening with your platform today.</p>
        </div>
        <button className="btn-admin-primary">
          Generate Report
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <Calendar size={20} className="status-info" style={{ background: 'transparent' }} />
            <span>Total Bookings</span>
          </div>
          <div className="metric-value">{stats.totalBookings}</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            Live database count
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <Clock size={20} className="status-warning" style={{ background: 'transparent', color: 'var(--admin-warning)' }} />
            <span>Pending Consultations</span>
          </div>
          <div className="metric-value">{stats.pendingConsultations}</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            Requires immediate action
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <Users size={20} style={{ color: 'var(--admin-accent)' }} />
            <span>Registered Users</span>
          </div>
          <div className="metric-value">{stats.activeUsers}</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            Total platform users
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <DollarSign size={20} className="status-success" style={{ background: 'transparent', color: 'var(--admin-success)' }} />
            <span>Monthly Revenue</span>
          </div>
          <div className="metric-value">₹0</div>
          <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '8px' }}>
            Payment gateway pending
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Recent Booking Requests</h3>
            <Link to="/admin/bookings" className="btn-admin-action">View All</Link>
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
                      No recent bookings found.
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
            <h3>Popular Rituals (This Week)</h3>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>1. Griha Pravesh Puja</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>42 Bookings</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>2. Satyanarayan Katha</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>38 Bookings</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>3. Maha Mrityunjaya Jaap</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>24 Bookings</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: 'var(--admin-text-primary)' }}>4. Rudrabhishek</span>
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: '14px' }}>18 Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
