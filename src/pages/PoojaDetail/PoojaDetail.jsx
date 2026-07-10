import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Home, ChevronRight, CheckCircle2, ShieldCheck, Heart, 
  Sparkles, Leaf, MapPin, CalendarCheck, CreditCard, 
  MessageCircle, ChevronDown, CheckSquare, Users
} from 'lucide-react';
import { poojasData } from '../../data/poojas';
import './PoojaDetail.css';

const PoojaDetail = () => {
  const { slug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);

  // Find the pooja data
  const poojaData = poojasData.find(p => p.id === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!poojaData) {
    return <Navigate to="/poojas" />;
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="pooja-layout">
      {/* 1. HERO SECTION */}
      <section className="pooja-hero">
        <div className="pooja-hero-bg">
          <img src={poojaData.image} alt={poojaData.title} />
        </div>
        <div className="pooja-hero-overlay"></div>
        <div className="container">
          <div className="pooja-hero-content slide-up">
            <div className="breadcrumbs">
              <Link to="/"><Home size={16} /></Link>
              <ChevronRight size={16} />
              <Link to="/poojas">Poojas</Link>
              <ChevronRight size={16} />
              <span>{poojaData.title}</span>
            </div>
            
            <h1 className="pooja-hero-title">{poojaData.title}</h1>
            <p className="pooja-hero-subtitle">{poojaData.subtitle}</p>
            
            <div className="pooja-pricing-badge">
              <span className="label">Starting From</span>
              <span className="price">{poojaData.price}</span>
            </div>
            
            <div className="pooja-hero-actions">
              <Link to={`/booking?pooja=${poojaData.id}`} className="btn-primary">
                Book Consultation
              </Link>
              <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-secondary">
                <MessageCircle size={20} style={{ marginRight: '8px' }} />
                Talk to Pandit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS THIS POOJA */}
      <section className="pooja-section">
        <div className="container">
          <div className="section-title-left">
            <h2 className="section-title">The Spiritual Significance</h2>
          </div>
          <div className="about-pooja-content">
            <p>{poojaData.about}</p>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="pooja-section pooja-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Divine Benefits</h2>
            <p className="section-subtitle">Experience the profound positive impact of this authentic Vedic ritual.</p>
          </div>
          <div className="benefits-grid">
            {poojaData.benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon"><Sparkles size={24} /></div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO SHOULD PERFORM */}
      <section className="pooja-section">
        <div className="container">
          <div className="section-title-left">
            <h2 className="section-title">When to Perform This Puja?</h2>
          </div>
          <div className="audience-list">
            {poojaData.audiences.map((item, idx) => (
              <div key={idx} className="audience-item">
                <div className="audience-item-icon">
                  <CheckCircle2 size={24} />
                </div>
                <div className="audience-item-text">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POOJA PROCESS */}
      <section className="pooja-section pooja-section-alt">
        <div className="container">
          <div className="section-title-left">
            <h2 className="section-title">The Ritual Flow</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '16px 0 40px' }}>
              A step-by-step breakdown of the traditional Vedic procedure.
            </p>
          </div>
          <div className="process-timeline">
            {poojaData.process.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-number">{idx + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INCLUDED SAMAGRI */}
      <section className="pooja-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Premium Samagri Included</h2>
            <p className="section-subtitle">We ensure 100% pure, authentic, and unadulterated materials for maximum spiritual efficacy.</p>
          </div>
          <div className="samagri-grid">
            {poojaData.samagri.map((item, idx) => (
              <div key={idx} className="samagri-item">
                <CheckSquare size={20} className="icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="samagri-note">
            <Leaf size={24} className="icon" />
            <p>Our commitment to purity: We source our Havan materials directly from trusted spiritual vendors, avoiding synthetic incenses or adulterated ghee.</p>
          </div>
        </div>
      </section>

      {/* 7. BOOKING FLOW */}
      <section className="pooja-section pooja-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">A transparent, seamless, and reliable booking experience.</p>
          </div>
          <div className="booking-flow-grid">
            <div className="booking-flow-step">
              <div className="flow-icon-wrapper">
                <CalendarCheck size={32} />
              </div>
              <h4>1. Submit Request</h4>
              <p>Choose your preferred dates and provide basic details.</p>
            </div>
            <div className="booking-flow-step">
              <div className="flow-icon-wrapper">
                <Users size={32} />
              </div>
              <h4>2. Expert Consultation</h4>
              <p>Our Acharya verifies your details and suggests the best Muhurat.</p>
            </div>
            <div className="booking-flow-step">
              <div className="flow-icon-wrapper">
                <CreditCard size={32} />
              </div>
              <h4>3. Confirm & Pay</h4>
              <p>Secure your booking with a transparent digital payment process.</p>
            </div>
            <div className="booking-flow-step">
              <div className="flow-icon-wrapper">
                <Home size={32} />
              </div>
              <h4>4. Ritual Day</h4>
              <p>The Pandit arrives at your home with all required Samagri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CITY AVAILABILITY */}
      <section className="pooja-section">
        <div className="container">
          <div className="section-title-left">
            <h2 className="section-title">Available Cities</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '16px 0 32px' }}>
              We currently offer premium at-home rituals in the following locations:
            </p>
          </div>
          <div className="cities-pills">
            <div className="city-pill"><MapPin size={18} color="var(--color-accent-primary)" /> Bangalore</div>
            <div className="city-pill"><MapPin size={18} color="var(--color-accent-primary)" /> Mumbai</div>
            <div className="city-pill"><MapPin size={18} color="var(--color-accent-primary)" /> Delhi NCR</div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="pooja-section pooja-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {poojaData.faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <ChevronDown className="faq-icon" size={24} />
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. RELATED POOJAS */}
      <section className="pooja-section">
        <div className="container">
          <div className="section-title-left">
            <h2 className="section-title">Related Rituals</h2>
          </div>
          <div className="pooja-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {poojaData.related.map((pooja, idx) => (
              <div key={idx} className="pooja-card">
                <div className="pooja-image-wrapper">
                  <img src={pooja.image} alt={pooja.title} />
                </div>
                <div className="pooja-content">
                  <h3>{pooja.title}</h3>
                  <div className="pooja-price">
                    <span>Starts from</span>
                    <strong>{pooja.price}</strong>
                  </div>
                  <Link to={`/poojas/${pooja.slug}`} className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CONVERSION */}
      <section className="pooja-section pooja-section-alt">
        <div className="container">
          <div className="final-cta">
            <div className="final-cta-content">
              <h2>Ready to invite divine blessings?</h2>
              <p>Our experts are ready to guide you in organizing a deeply spiritual and authentic Vedic ceremony for your family.</p>
              <div className="hero-buttons" style={{ justifyContent: 'center' }}>
                <Link to={`/booking?pooja=${poojaData.id}`} className="btn-primary" style={{ backgroundColor: 'white', color: 'var(--color-accent-secondary)', borderColor: 'white' }}>
                  Book Consultation Now
                </Link>
                <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}>
                  <MessageCircle size={20} style={{ marginRight: '8px' }} />
                  Talk on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoojaDetail;
