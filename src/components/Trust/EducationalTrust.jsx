import React from 'react';
import { BookOpen, Sprout, Flame } from 'lucide-react';
import './Trust.css';

const EducationalTrust = () => {
  return (
    <section className="trust-section-dark">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', marginBottom: '16px' }}>
          Understanding the Power of Rituals
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: '1.6' }}>
          We believe in educating families about the deep science and intention behind our traditions. A pooja is not mere symbolism; it is an active recalibration of energy.
        </p>
      </div>

      <div className="social-proof-grid">
        <div className="edu-card">
          <div className="edu-stars" style={{ color: 'var(--color-accent-primary)', marginBottom: '16px' }}>
            <Flame size={28} />
          </div>
          <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>The Science of Havan</h3>
          <p className="edu-text">
            When specific medicinal herbs (Samagri) are offered into the fire along with rhythmic Sanskrit chanting, they release volatile oils and vibrations that purify the air and calm the mind. It is an ancient atmospheric science.
          </p>
        </div>

        <div className="edu-card">
          <div className="edu-stars" style={{ color: 'var(--color-accent-primary)', marginBottom: '16px' }}>
            <BookOpen size={28} />
          </div>
          <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>The Power of Sankalpa</h3>
          <p className="edu-text">
            Every ritual begins with a Sankalpa—a focused statement of intention. By stating your name, lineage (Gotra), and exact time and place, you energetically anchor the benefits of the pooja to your specific family line.
          </p>
        </div>

        <div className="edu-card">
          <div className="edu-stars" style={{ color: 'var(--color-accent-primary)', marginBottom: '16px' }}>
            <Sprout size={28} />
          </div>
          <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>Karmic Realignment</h3>
          <p className="edu-text">
            Rituals like Navgrah Shanti are designed to balance cosmic energies. They do not magically erase challenges, but they create a spiritually resilient mindset, allowing you to navigate life's obstacles with clarity and grace.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationalTrust;
