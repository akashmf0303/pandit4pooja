import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import Logo from '../Logo/Logo';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' }
  ];

  const poojaOptions = [
    { name: 'Pooja at Home', path: '/poojas-at-home' },
    { name: 'Online Pooja', path: '/online-pooja' },
    { name: 'Festival Poojas', path: '/festival-poojas' },
    { name: 'Astrology Consultation', path: '/astrology-consultation' },
    { name: 'View All Poojas', path: '/poojas' }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        
        <Link to="/" className="navbar-logo">
          <Logo size={40} />
        </Link>

        {/* CENTER/RIGHT: Main Nav */}
        <div className={`navbar-links ${isMobileOpen ? 'mobile-open' : ''}`}>
          
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>

          <div className="nav-dropdown" ref={dropdownRef}>
            <button 
              className={`nav-link dropdown-toggle ${location.pathname.includes('/poojas') ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Poojas <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'none' }} />
            </button>
            
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              {poojaOptions.map((option, idx) => (
                <Link 
                  key={idx} 
                  to={option.path} 
                  className="dropdown-item"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {option.name}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/blogs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Blogs
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>

          {/* Mobile Only Login/CTA inside drawer */}
          <div className="mobile-only-actions">
            {user ? (
              <button onClick={() => navigate((profile?.role === 'admin' || profile?.role === 'super_admin') ? '/admin' : '/dashboard')} className="mobile-btn">
                <User size={18} /> {profile?.full_name || user?.user_metadata?.full_name || 'Dashboard'}
              </button>
            ) : (
              <Link to="/login" className="mobile-btn">
                <User size={18} /> Login
              </Link>
            )}
            <Link to="/booking" className="btn-primary mobile-btn">
              Book a Pooja
            </Link>
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="navbar-actions">
          <div className="desktop-only-actions">
            {user ? (
              <button onClick={() => navigate((profile?.role === 'admin' || profile?.role === 'super_admin') ? '/admin' : '/dashboard')} className="login-btn">
                <User size={18} />
                <span>{(profile?.full_name || user?.user_metadata?.full_name || 'Dashboard').split(' ')[0]}</span>
              </button>
            ) : (
              <Link to="/login" className="login-btn">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
            <Link to="/booking" className="btn-primary cta-btn">
              Book a Pooja
            </Link>
          </div>

          <button 
            className="menu-toggle" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
