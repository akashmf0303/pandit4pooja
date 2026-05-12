import React, { useEffect, useState } from 'react';
import { Compass, BookOpen, Clock } from 'lucide-react';
import SpiritualGuidance from '../../components/Trust/SpiritualGuidance';
import ConsultationModal from '../../components/Modal/ConsultationModal';
import './Services.css';

const AstrologyConsultation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page theme-astrology slide-up">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <span className="service-subtitle">Vedic Wisdom & Planetary Guidance</span>
            <h1>Spiritual & Astrological Consultation</h1>
            <p className="lead">
              Seek profound clarity for your life's journey. Our expert Vedic Astrologers provide deep Kundli analysis, Muhurat selection, and Dosha remedies based on ancient Jyotish Shastra.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ backgroundColor: '#f6ad55', color: '#1a202c', border: 'none', boxShadow: '0 4px 15px rgba(246, 173, 85, 0.2)' }}>
                Consult an Astrologer
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
              <div className="feature-icon"><Compass size={32} /></div>
              <h3>Kundli & Dosha Analysis</h3>
              <p>Comprehensive reading of your birth chart to understand planetary alignments and karmic paths.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Clock size={32} /></div>
              <h3>Muhurat Selection</h3>
              <p>Find the most auspicious time (Shubh Muhurat) for marriages, business launches, or property purchases.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><BookOpen size={32} /></div>
              <h3>Vedic Remedies</h3>
              <p>Receive authentic, practical remedies including specific mantras, gemstones, and targeted poojas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Guidance (Advisory context) */}
      <SpiritualGuidance />

      {/* Consultation Process */}
      <section className="container section">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: '#2d3748', padding: '64px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
            How Our Consultation Works
          </h2>
          <p style={{ color: '#a0aec0', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px' }}>
            We do not believe in fear-based astrology. Our approach is purely advisory, grounded in the ancient Vedic belief that karma and awareness can navigate any planetary influence. Share your birth details securely via WhatsApp, and our Acharya will schedule a dedicated 45-minute audio or video session with you.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ backgroundColor: '#f6ad55', color: '#1a202c', border: 'none' }}>
            Schedule Session via WhatsApp
          </button>
        </div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AstrologyConsultation;
