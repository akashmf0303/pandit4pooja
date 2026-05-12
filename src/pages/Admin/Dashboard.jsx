import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { title: 'Total Bookings', value: '1,240', change: '+12%', icon: Calendar, color: '#3b82f6' },
        { title: 'Total Revenue', value: '₹42.5L', change: '+8%', icon: DollarSign, color: '#22c55e' },
        { title: 'Active Pandits', value: '48', change: '+2', icon: Users, color: '#a855f7' },
        { title: 'Course Enrollments', value: '856', change: '+24%', icon: TrendingUp, color: '#f97316' },
    ];

    const recentBookings = [
        { id: '#B-1024', user: 'Rahul Verma', ritual: 'Rudrabhishek', date: 'Today, 10:00 AM', status: 'Pending', amount: '₹2,100' },
        { id: '#B-1023', user: 'Sneha Gupta', ritual: 'Grah Shanti', date: 'Yesterday', status: 'Confirmed', amount: '₹3,100' },
        { id: '#B-1022', user: 'Amit Patel', ritual: 'Vivah Sanskar', date: '12 Aug', status: 'Completed', amount: '₹11,000' },
    ];

    return (
        <div>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{stat.title}</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a' }}>{stat.value}</h3>
                            </div>
                            <div style={{ padding: '0.75rem', backgroundColor: `${stat.color}20`, borderRadius: '0.5rem', color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 500 }}>{stat.change} <span style={{ color: '#94a3b8', fontWeight: 400 }}>from last month</span></span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Recent Bookings Table */}
                <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#0f172a' }}>Recent Bookings</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Booking ID</th>
                                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>User</th>
                                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Ritual</th>
                                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map(booking => (
                                <tr key={booking.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem 0', color: '#3b82f6', fontWeight: 500 }}>{booking.id}</td>
                                    <td style={{ padding: '1rem 0', color: '#0f172a' }}>{booking.user}</td>
                                    <td style={{ padding: '1rem 0', color: '#64748b' }}>{booking.ritual}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{
                                            padding: '0.25rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600,
                                            backgroundColor: booking.status === 'Completed' ? '#dcfce7' : booking.status === 'Confirmed' ? '#dbeafe' : '#fef9c3',
                                            color: booking.status === 'Completed' ? '#166534' : booking.status === 'Confirmed' ? '#1e40af' : '#854d0e'
                                        }}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 0', fontWeight: 600 }}>{booking.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Quick Actions / Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#0f172a' }}>Pending Approvals</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>Pandit Verification</p>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Acharya Vijay</p>
                                </div>
                                <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Review</button>
                            </div>
                            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>New Course</p>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Navgrah Vidhi</p>
                                </div>
                                <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Review</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default AdminDashboard;
