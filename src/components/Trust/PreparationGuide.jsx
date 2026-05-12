import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import './Trust.css';

const PreparationGuide = () => {
  return (
    <section className="trust-section-bg">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', color: 'var(--color-accent-secondary)', marginBottom: '16px' }}>
            How We Prepare Your Ritual
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', lineHeight: '1.6', marginBottom: '32px' }}>
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

        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(110, 38, 14, 0.1)' }}>
          <img src="/images/real_pooja_samagri.jpg" alt="Authentic Pooja Samagri Preparation" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '500px', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', color: 'white' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 8px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Pure & Authentic</h3>
            <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>Ensuring complete spiritual accuracy for every ritual.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PreparationGuide;
