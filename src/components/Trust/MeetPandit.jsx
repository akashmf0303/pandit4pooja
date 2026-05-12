import React, { useState } from 'react';
import ConsultationModal from '../Modal/ConsultationModal';
import './Trust.css';

const MeetPandit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="trust-section-bg">
      <div className="meet-pandit-container">
        <div className="pandit-image-wrapper">
          <img 
            src="/images/ankush_latest.jpg" 
            alt="Acharya Ankush Shukla" 
            className="pandit-image"
          />
        </div>
        
          <div className="pandit-content">
          <span className="pandit-title">Your Spiritual Guide</span>
          <h2>Acharya Ankush Shukla</h2>
          
          <p className="pandit-quote">
            "A pooja is not a transaction; it is a sacred connection. My purpose is to help your family perform these rituals with complete understanding, devotion, and purity."
          </p>
          
          <p className="pandit-bio">
            Born into a lineage of Vedic scholars, Acharya Ankush Shukla personally guides every ceremony booked on our platform. Rather than managing a vast, impersonal network, he ensures that every pooja is conducted with absolute scriptural accuracy and emotional warmth.
            <br/><br/>
            Whether you are seeking a detailed Kundli reading, a complex Vastu correction, or a simple Ganesha Pooja at home, he will patiently explain the significance of every mantra so your family feels truly connected to the divine process.
          </p>
          
          <div className="pandit-credentials" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px', marginBottom: '32px' }}>
            <div className="cred-item">
              <span className="cred-value" style={{ fontSize: '18px', fontWeight: '600' }}>Languages</span>
              <span className="cred-label" style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Hindi, Sanskrit, English</span>
            </div>
            <div className="cred-item">
              <span className="cred-value" style={{ fontSize: '18px', fontWeight: '600' }}>Specialties</span>
              <span className="cred-label" style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Kundli, Vastu, Havan</span>
            </div>
            <div className="cred-item">
              <span className="cred-value" style={{ fontSize: '18px', fontWeight: '600' }}>Experience</span>
              <span className="cred-label" style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>20+ Years Vedic Study</span>
            </div>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Schedule Consultation
          </button>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default MeetPandit;
