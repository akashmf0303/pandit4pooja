import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import './Trust.css';

const TrustPillars = () => {
  return (
    <section className="trust-section-bg" style={{ paddingTop: 0 }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', color: 'var(--color-accent-secondary)', marginBottom: '16px' }}>
          Personally Guided Spiritual Experiences
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', lineHeight: '1.6' }}>
          We believe that inviting a pandit into your home is a deeply personal matter. That is why we focus on absolute authenticity rather than mass scale.
        </p>
      </div>

      <div className="trust-pillars-grid">
        <div className="trust-pillar-card">
          <div className="trust-icon-wrapper">
            <ShieldCheck size={32} />
          </div>
          <h3>Curated Vedic Scholars</h3>
          <p>
            We do not operate a massive directory. Every pandit who performs a ritual under our name is personally vetted and trained by Acharya Ankush Shukla to ensure deep knowledge and pure intent.
          </p>
        </div>

        <div className="trust-pillar-card">
          <div className="trust-icon-wrapper">
            <Leaf size={32} />
          </div>
          <h3>100% Pure Samagri</h3>
          <p>
            We do not cut corners. From pure cow ghee to authentic medicinal herbs for the Havan, we ensure every element offered to the fire is of the highest energetic quality.
          </p>
        </div>

        <div className="trust-pillar-card">
          <div className="trust-icon-wrapper">
            <HeartHandshake size={32} />
          </div>
          <h3>Transparent & Calm Process</h3>
          <p>
            No hidden costs, no aggressive upselling, and no confusion. We guide you through the preparation step-by-step so your family can focus entirely on devotion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustPillars;
