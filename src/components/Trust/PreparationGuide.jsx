import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import './Trust.css';

const PreparationGuide = () => {
  return (
    <section className="trust-section-bg">
      <div className="prep-guide-container">
        
        <div className="prep-guide-content">
          <h2 className="prep-guide-title">
            How We Prepare Your Ritual
          </h2>
          <p className="prep-guide-description">
            A successful pooja demands absolute purity in materials and profound scriptural accuracy. We handle the entire preparation process so your family can focus purely on devotion.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle2 color="var(--color-accent-primary)" style={{ marginTop: '4px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', color: 'var(--color-text-primary)' }}>Premium Samagri Preparation</h4>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '15px' }}>We source 100% pure, unadulterated sacred materials (samagri) precisely prescribed by the Vedic texts for your specific ritual.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle2 color="var(--color-accent-primary)" style={{ marginTop: '4px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', color: 'var(--color-text-primary)' }}>Ritual Coordination</h4>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '15px' }}>Our team meticulously coordinates the exact Shubh Muhurat, seating arrangements, and Vastu directions prior to the ceremony.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle2 color="var(--color-accent-primary)" style={{ marginTop: '4px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', color: 'var(--color-text-primary)' }}>Personalized Arrangements</h4>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '15px' }}>Every family is unique. We tailor the mantras, Sankalpa, and offerings to respect your specific regional traditions and ancestral lineage.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle2 color="var(--color-accent-primary)" style={{ marginTop: '4px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', color: 'var(--color-text-primary)' }}>Guidance Process</h4>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '15px' }}>From dietary etiquette to post-ritual traditions, Acharya Ankush Shukla personally guides your family at every step.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prep-guide-image-wrapper">
          <img src="/images/real_pooja_samagri.jpg" alt="Authentic Pooja Samagri Preparation" className="prep-guide-img" />
          <div className="prep-guide-image-overlay" />
          <div className="prep-guide-image-text">
            <h3>Pure & Authentic</h3>
            <p>Ensuring complete spiritual accuracy for every ritual.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PreparationGuide;
