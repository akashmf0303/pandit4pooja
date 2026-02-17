import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

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
                    <Link to="/book" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                        Book a Puja
                    </Link>
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
