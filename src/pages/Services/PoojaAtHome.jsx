import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldCheck, Flower2 } from 'lucide-react';
import { poojasData } from '../../data/poojas';
import TrustPillars from '../../components/Trust/TrustPillars';
import PreparationGuide from '../../components/Trust/PreparationGuide';
import './Services.css';

const PoojaAtHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter or take a subset of poojas for this page (assuming all in current mock data are at-home)
  const featuredPoojas = poojasData.slice(0, 6);

  return (
    <div className="service-page theme-home slide-up">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <span className="service-subtitle">Sacred Ceremonies at Your Doorstep</span>
            <h1>Authentic Pooja at Home</h1>
            <p className="lead">
              Experience the divine presence in the comfort of your own home. Our verified Vedic Acharyas bring complete devotion, perfect pronunciation, and 100% pure Samagri right to your doorstep.
            </p>
            <Link to="/booking" className="btn-primary">
              Book a Home Pooja
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Block */}
      <section className="feature-block">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={32} color="var(--color-accent-primary)" /></div>
              <h3>Verified Scholars</h3>
              <p>Every Acharya is strictly vetted for their Vedic knowledge, background, and spiritual discipline.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Flower2 size={32} color="var(--color-accent-primary)" /></div>
              <h3>100% Pure Samagri</h3>
              <p>We source authentic, unadulterated pooja materials directly from trusted spiritual centers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Home size={32} color="var(--color-accent-primary)" /></div>
              <h3>Zero Preparation Stress</h3>
              <p>We manage everything from setup to clean-up. You simply focus on your family's devotion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poojas */}
      <section className="container section">
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: 'var(--color-accent-secondary)', marginBottom: '48px', fontFamily: 'var(--font-heading)' }}>
          Popular Home Rituals
        </h2>
        <div className="service-grid">
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

      {/* Trust & Preparation */}
      <TrustPillars />
      <PreparationGuide />
    </div>
  );
};

export default PoojaAtHome;
