import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo size={40} />
            </Link>
            <p>
              Experience the divine presence with our authentic Vedic rituals and experienced Pandits. 
              Your trusted partner for all spiritual services across India.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/poojas">All Poojas</Link></li>
              <li><Link to="/online-poojas">Online e-Poojas</Link></li>
              <li><Link to="/astrology">Astrology</Link></li>
              <li><Link to="/blogs">Spiritual Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/poojas-at-home">Pooja at Home</Link></li>
              <li><Link to="/online-pooja">Online Pooja</Link></li>
              <li><Link to="/festival-poojas">Festival Poojas</Link></li>
              <li><Link to="/astrology-consultation">Astrology Consultation</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-item">
              <Phone size={20} className="contact-icon" />
              <span>+91 70098 94907</span>
            </div>
            <div className="contact-item">
              <Mail size={20} className="contact-icon" />
              <span>Admin@pooja4panditt.in</span>
            </div>
            <div className="contact-item">
              <MapPin size={20} className="contact-icon" />
              <span>Shri Satyanarayan Mandir, Ram Bagh Road,<br/>Bathinda, Punjab, 151001</span>
            </div>
            
            <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '16px' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Panditt4Pooja. All Rights Reserved. Bringing spirituality home, authentically.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
