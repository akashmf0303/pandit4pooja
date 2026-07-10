import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, CalendarHeart } from 'lucide-react';
import { poojasData } from '../../data/poojas';
import './Services.css';

const FestivalPoojas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter or take a subset of poojas for this page
  const featuredPoojas = poojasData.slice(2, 5);

  return (
    <div className="service-page theme-festival slide-up">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <span className="service-subtitle">Celebrate with Authentic Devotion</span>
            <h1>Seasonal & Festival Poojas</h1>
            <p className="lead">
              From Diwali Lakshmi Pooja to Navratri Chandi Homa, ensure your family's festive celebrations are blessed by authentic Vedic rituals, performed exactly as prescribed in the Shastras.
            </p>
            <Link to="/booking" className="btn-primary" style={{ backgroundColor: '#e53e3e', borderColor: '#e53e3e', boxShadow: '0 4px 15px rgba(229, 62, 62, 0.2)' }}>
              Explore Festival Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Block */}
      <section className="feature-block">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><CalendarHeart size={32} /></div>
              <h3>Auspicious Timings</h3>
              <p>We ensure your festival pooja is strictly aligned with the most powerful seasonal Muhurats.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Sparkles size={32} /></div>
              <h3>Complete Samagri</h3>
              <p>Festivals require rare and specific samagri. We handle the entire sourcing process for you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Users size={32} /></div>
              <h3>Family Focused</h3>
              <p>Our Acharyas actively involve every family member, explaining the cultural significance of the festival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poojas */}
      <section className="container section">
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: '#c53030', marginBottom: '48px', fontFamily: 'var(--font-heading)' }}>
          Upcoming Festival Rituals
        </h2>
        <div className="service-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {featuredPoojas.map((pooja) => (
            <Link key={pooja.id} to={`/poojas/${pooja.id}`} className="pooja-card" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                <div className="btn-outline" style={{ textAlign: 'center' }}>
                  View Details
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FestivalPoojas;
