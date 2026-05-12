import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import MeetPandit from '../../components/Trust/MeetPandit';
import SpiritualGuidance from '../../components/Trust/SpiritualGuidance';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page slide-up">
      {/* 1. Brand Story Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="subtitle">Our Genesis</span>
            <h1>Preserving the Purity of Vedic Rituals in the Modern World</h1>
            <p className="lead">
              Panditt4Pooja is not a corporate directory of random pandits. It is a personal, deeply spiritual initiative guided by Acharya Ankush Shukla.
            </p>
            <p>
              We saw families struggling to find genuine guidance, worrying about the purity of Samagri, and feeling completely disconnected from rituals because no one explained the Sanskrit mantras to them. We decided to change this. Our single purpose is to help your family perform authentic Vedic ceremonies with absolute transparency, deep understanding, and pure devotion.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Meet Your Pandit */}
      <MeetPandit />

      {/* 3. Spiritual Philosophy */}
      <SpiritualGuidance />

      {/* 4. Contact & Consultation Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>We Are Here to Guide You</h2>
              <p>
                Whether you are unsure about which pooja to perform, need to find an auspicious Muhurat, or have specific family traditions to discuss, our spiritual advisors are ready to help.
              </p>
              
              <div className="contact-methods">
                <div className="contact-method-item">
                  <div className="contact-icon"><Phone size={24} /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 70098 94907</p>
                  </div>
                </div>
                <div className="contact-method-item">
                  <div className="contact-icon"><Mail size={24} /></div>
                  <div>
                    <h4>Email Support</h4>
                    <p>Admin@pooja4panditt.in</p>
                  </div>
                </div>
                <div className="contact-method-item">
                  <div className="contact-icon"><MapPin size={24} /></div>
                  <div>
                    <h4>Headquarters</h4>
                    <p>Shri Satyanarayan Mandir, Ram Bagh Road,<br/>Bathinda, Punjab, 151001</p>
                  </div>
                </div>
              </div>

              <div className="whatsapp-cta">
                <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <MessageCircle size={20} style={{ marginRight: '8px' }} />
                  Chat on WhatsApp
                </a>
                <p className="response-time">Average response time: Under 10 minutes</p>
              </div>
            </div>

            <div className="map-card" style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(110, 38, 14, 0.08)', border: '1px solid rgba(224, 110, 56, 0.1)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.886475657064!2d74.939228!3d30.211786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39173297173bd93b%3A0xc6822c10b0dc68dc!2sShri%20Satyanarayan%20Mandir!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Shri Satyanarayan Mandir Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
