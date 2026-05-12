import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#1A1A1A', color: '#fff', padding: '5rem 0 2rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>

                {/* Brand Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src="/logo.png" alt="Pandit 4 Pooja Logo" style={{ height: '48px', width: '48px', objectFit: 'contain' }} />
                        <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-heading)', fontWeight: 'bold', color: '#fff' }}>Pandit 4 Pooja</span>
                    </div>
                    <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.8', maxWidth: '300px' }}>
                        Restoring the sanctity of ancient traditions. We connect you with certified Pandits for authentic Hawan, Anushthan, and Vedic learning.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Facebook size={20} color="#cbd5e1" style={{ cursor: 'pointer' }} />
                        <Twitter size={20} color="#cbd5e1" style={{ cursor: 'pointer' }} />
                        <Instagram size={20} color="#cbd5e1" style={{ cursor: 'pointer' }} />
                        <Youtube size={20} color="#cbd5e1" style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                {/* Quick Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8' }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/bookings">Book a Pandit</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact Us</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Phone size={18} color="var(--color-primary)" />
                            <span>+91 80903 51145</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Mail size={18} color="var(--color-primary)" />
                            <span>panditt4pooja@gmail.com</span>
                        </li>
                    </ul>
                </div>


            </div>
            <div className="container" style={{
                borderTop: '1px solid #333', marginTop: '4rem', paddingTop: '2rem',
                textAlign: 'center', color: '#666', fontSize: '0.85rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
            }}>
                <span>&copy; {new Date().getFullYear()} Pandit 4 Pooja. All rights reserved.</span>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Terms of Service</Link>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
