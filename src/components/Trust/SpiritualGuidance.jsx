import React from 'react';
import './Trust.css';

const SpiritualGuidance = () => {
  return (
    <section className="trust-section-bg" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '64px', color: 'var(--color-accent-primary)', marginBottom: '16px', lineHeight: '1' }}>
          ॐ
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--color-accent-secondary)', lineHeight: '1.4', marginBottom: '24px' }}>
          "Dharmo Rakshati Rakshitah"
        </h2>
        
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', fontStyle: 'italic', marginBottom: '40px' }}>
          (Dharma protects those who protect Dharma)
        </p>

        <p style={{ color: 'var(--color-text-primary)', fontSize: '16px', lineHeight: '1.8' }}>
          At Panditt4Pooja, we believe that preserving our ancient Vedic rituals is not just about tradition—it is about maintaining the energetic balance of our homes, our families, and our minds. When you perform a ritual with pure devotion and authentic guidance, the universe always responds.
        </p>
      </div>
    </section>
  );
};

export default SpiritualGuidance;
