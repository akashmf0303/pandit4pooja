import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { Menu, X, Flame, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
=======
import { Menu, X, Flame } from 'lucide-react';
>>>>>>> f15c08f954c540ec431eac2872b7575068031edc

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
<<<<<<< HEAD
    const { user, profile, signOut } = useAuth();
=======
>>>>>>> f15c08f954c540ec431eac2872b7575068031edc

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Courses', path: '/courses' },
        { name: 'About', path: '/about' },
    ];

    return (
        <header className="header" style={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--color-border-gold)' : '1px solid transparent',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease',
            boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px'
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <img src="/logo.png" alt="Pandit 4 Pooja Logo" style={{ height: '48px', width: '48px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-heading)', fontWeight: 'bold', color: '#1e293b' }}>
                        Pandit 4 Pooja
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="nav-link"
                            style={{
                                fontWeight: 500,
                                color: 'var(--color-text-main)',
                                fontSize: '0.95rem',
                                letterSpacing: '0.02em',
                                position: 'relative',
                                opacity: location.pathname === link.path ? 1 : 0.8
                            }}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'var(--color-primary)',
                                    borderRadius: '2px'
                                }} />
                            )}
                        </Link>
                    ))}
<<<<<<< HEAD
                    
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} style={{ color: 'var(--color-text-main)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <User size={18} /> {profile?.full_name?.split(' ')[0] || 'Dashboard'}
                            </Link>
                            <button onClick={signOut} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <LogOut size={18} />
                            </button>
                            <Link to="/book" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                                Book a Puja
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to="/login" style={{ color: 'var(--color-text-main)', textDecoration: 'none', fontWeight: 500 }}>
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                                Sign Up
                            </Link>
                        </div>
                    )}
=======
                    <Link to="/book" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                        Book a Puja
                    </Link>
>>>>>>> f15c08f954c540ec431eac2872b7575068031edc
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    style={{ display: 'block', background: 'none', border: 'none', color: 'var(--color-text-main)' }}
                    className="mobile-menu-btn"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-background)',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                padding: '0.75rem',
                                fontWeight: 500,
                                color: 'var(--color-text-main)',
                                borderBottom: '1px solid var(--color-border-gold)'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
<<<<<<< HEAD
                    {user ? (
                        <>
                            <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', fontWeight: 500, color: 'var(--color-text-main)', borderBottom: '1px solid var(--color-border-gold)' }}>
                                Dashboard
                            </Link>
                            <button onClick={() => { signOut(); setIsMenuOpen(false); }} style={{ padding: '0.75rem', fontWeight: 500, color: 'var(--color-text-main)', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--color-border-gold)' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', fontWeight: 500, color: 'var(--color-text-main)', borderBottom: '1px solid var(--color-border-gold)' }}>
                            Login / Sign Up
                        </Link>
                    )}
=======
>>>>>>> f15c08f954c540ec431eac2872b7575068031edc
                    <Link
                        to="/book"
                        className="btn btn-primary"
                        onClick={() => setIsMenuOpen(false)}
                        style={{ textAlign: 'center', marginTop: '0.5rem' }}
                    >
                        Book a Puja
                    </Link>
                </nav>
            )}
            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
        </header>
    );
};

export default Header;
