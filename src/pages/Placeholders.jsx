import React from 'react';

import { Link } from 'react-router-dom';

import { poojasData } from '../data/poojas';

const createPlaceholder = (title, description) => {
  return () => (
    <div className="container section slide-up" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: 'var(--color-accent-secondary)', marginBottom: '16px' }}>{title}</h1>
      <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', maxWidth: '600px' }}>{description}</p>
      <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '32px' }}>
        Chat on WhatsApp
      </a>
    </div>
  );
};

export const Poojas = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: 'var(--color-bg-primary)', minHeight: '80vh' }}>
      <div className="container slide-up">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '48px', color: 'var(--color-accent-secondary)', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>All Poojas</h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Explore our comprehensive list of authentic Vedic rituals for your home and office.
          </p>
        </div>
        
        <div className="pooja-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {poojasData.map((pooja, index) => (
            <div key={index} className="pooja-card">
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
      </div>
    </div>
  );
};
