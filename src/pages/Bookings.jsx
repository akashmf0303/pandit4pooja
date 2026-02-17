import React from 'react';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';

const Bookings = () => {
    const upcomingBookings = [
        {
            id: 1,
            ritual: 'Satyanarayan Katha',
            date: '24 Aug, 2026',
            time: '10:00 AM',
            location: 'Home (Offline)',
            pandit: 'Acharya Ramanuj',
            status: 'Confirmed'
        }
    ];

    const pastBookings = [
        {
            id: 101,
            ritual: 'Grah Shanti Pujan',
            date: '15 Jul, 2026',
            time: '09:00 AM',
            location: 'Online (Zoom)',
            pandit: 'Pandit Sharma Ji',
            status: 'Completed'
        }
    ];

    return (
        <div style={{ padding: '4rem 0 6rem', backgroundColor: 'var(--color-surface)', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Bookings</h1>

                {/* Upcoming Section */}
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Upcoming Rituals</h2>
                {upcomingBookings.map(booking => (
                    <div key={booking.id} className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--color-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>{booking.ritual}</h3>
                            <span style={{
                                backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.25rem 0.75rem',
                                borderRadius: '1rem', fontSize: '0.85rem', fontWeight: 600
                            }}>
                                {booking.status}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} />
                                <span>{booking.date} at {booking.time}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} />
                                <span>{booking.location}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={18} />
                                <span>Pandit: {booking.pandit}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>View Details</button>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }}>Reschedule</button>
                        </div>
                    </div>
                ))}

                {/* Past Section */}
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text-muted)', marginTop: '3rem' }}>Past Rituals</h2>
                {pastBookings.map(booking => (
                    <div key={booking.id} className="card" style={{ marginBottom: '1rem', opacity: 0.8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{booking.ritual}</h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{booking.date}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Performed by {booking.pandit} • {booking.location}</p>
                        <button style={{ color: 'var(--color-primary)', background: 'none', border: 'none', padding: 0, marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            Download Receipt
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Bookings;
