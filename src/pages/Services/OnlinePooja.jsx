import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Globe2, HeartHandshake } from 'lucide-react';
import { poojasData } from '../../data/poojas';
import EducationalTrust from '../../components/Trust/EducationalTrust';
import ConsultationModal from '../../components/Modal/ConsultationModal';
import './Services.css';

const OnlinePooja = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter or take a subset of poojas for this page
  const featuredPoojas = poojasData.slice(1, 4);

  return (
    <div className="service-page theme-online slide-up">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <span className="service-subtitle">Digital Devotion, Global Reach</span>
            <h1>Global Online e-Poojas</h1>
            <p className="lead">
              Distance should never be a barrier to devotion. Join our expert Acharyas via high-definition video calls to perform sacred rituals from anywhere in the world, with perfect adherence to Vedic timing.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/booking" className="btn-primary">
                Book an Online Pooja
              </Link>
              <button onClick={() => setIsModalOpen(true)} className="btn-secondary" style={{ border: '2px solid var(--color-accent-primary)', color: 'var(--color-text-primary)' }}>
                WhatsApp Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Block */}
      <section className="feature-block">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><Video size={32} /></div>
              <h3>HD Video Experience</h3>
              <p>Crystal clear audio and video ensure you hear every mantra and witness every offering clearly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Globe2 size={32} /></div>
              <h3>NRI & Global Support</h3>
              <p>We accommodate global timezones, ensuring the Muhurat aligns perfectly with your location.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><HeartHandshake size={32} /></div>
              <h3>Interactive Guidance</h3>
              <p>The Acharya will guide your family step-by-step through the Sankalpa and offerings on your end.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poojas */}
      <section className="container section">
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: 'var(--color-accent-secondary)', marginBottom: '48px', fontFamily: 'var(--font-heading)' }}>
          Most Requested Online Rituals
        </h2>
        <div className="service-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {featuredPoojas.map((pooja) => (
            <div key={pooja.id} className="pooja-card">
              <div className="pooja-image-wrapper">
                <img src={pooja.image} alt={pooja.title} />
              </div>
              <div className="pooja-content">
                <h3>{pooja.title}</h3>
                <p style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pooja.about}</p>
                <div className="pooja-price">
                  <span>Starts from</span>
                  <strong>{pooja.price}</strong>
                </div>
                <Link to={`/poojas/${pooja.id}`} className="btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Trust */}
      <EducationalTrust />

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default OnlinePooja;
