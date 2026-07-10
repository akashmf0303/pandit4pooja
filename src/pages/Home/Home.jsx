import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Heart, Clock, Globe, 
  CheckCircle, Video, MessageCircle, Star, Quote, 
  ChevronDown, ChevronUp, Users, CalendarCheck, FileText, MapPin
} from 'lucide-react';
import MeetPandit from '../../components/Trust/MeetPandit';
import TrustPillars from '../../components/Trust/TrustPillars';
import PreparationGuide from '../../components/Trust/PreparationGuide';
import EducationalTrust from '../../components/Trust/EducationalTrust';
import SpiritualGuidance from '../../components/Trust/SpiritualGuidance';
import RitualMoments from '../../components/Trust/RitualMoments';
import { poojasData } from '../../data/poojas';
import ConsultationModal from '../../components/Modal/ConsultationModal';
import './Home.css';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const featuredPoojas = poojasData.filter(p => [
    'griha-pravesh-puja', 
    'satyanarayan-katha', 
    'mahamrityunjaya-jaap', 
    'navgrah-shanti-pujan', 
    'sundarkand-path', 
    'lakshmi-ganesh-pujan'
  ].includes(p.id));

  const faqs = [
    {
      question: "Are the pandits verified?",
      answer: "Yes. All our pandits are experienced, background-verified, and trained in authentic Vedic rituals and traditions."
    },
    {
      question: "Do you provide all the necessary Pooja Samagri?",
      answer: "Yes. We can arrange complete pooja samagri based on the ritual requirements, so you don’t have to worry about preparations."
    },
    {
      question: "How does the Online e-Pooja work for NRIs?",
      answer: "NRIs can book poojas online and participate live through video call. Our pandits perform the rituals on your behalf with full sankalp and guidance."
    },
    {
      question: "Can I consult a Pandit before booking?",
      answer: "Absolutely. You can consult with our pandits before booking to understand the ritual, requirements, muhurat, and process."
    }
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-background fade-in">
          <img src="/images/real_hero_havan.jpg" alt="Sacred Vedic Fire Ceremony" className="hero-img-zoom" />
        </div>
        <div className="hero-overlay fade-in"></div>
        <div className="container position-relative">
          <div className="hero-content slide-up">
            <h1>Experience Authentic Vedic Rituals at Home</h1>
            <p>A boutique spiritual platform guided personally by Acharya Ankush Shukla. We bring profound devotion, perfect scriptural accuracy, and absolute peace of mind to your family's sacred moments.</p>
            <div className="hero-buttons">
              <Link to="/poojas" className="btn-primary">
                Book a Pooja
              </Link>
              <button onClick={() => setIsModalOpen(true)} className="btn-secondary">
                <MessageCircle size={20} style={{ marginRight: '8px' }} />
                Talk to a Pandit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <TrustPillars />

      {/* 3. Featured Poojas Section */}
      <section className="section">
        <div className="container">
          <div className="section-header slide-up">
            <h2 className="section-title">Featured Divine Rituals</h2>
            <p className="section-subtitle">Discover our most requested poojas, performed meticulously according to ancient Vedic traditions.</p>
          </div>
          
          <div className="pooja-grid slide-up">
            {featuredPoojas.map((pooja, index) => (
              <Link to={`/poojas/${pooja.id}`} className="pooja-card" key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="pooja-image-wrapper">
                  <img src={pooja.image} alt={pooja.title} />
                </div>
                <div className="pooja-content">
                  <h3>{pooja.title}</h3>
                  <p style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pooja.about}</p>
                  <div className="pooja-footer">
                    <div className="pooja-price">
                      <span>Starts from </span><br />
                      {pooja.price}
                    </div>
                  </div>
                  <div className="btn-secondary" style={{ textAlign: 'center' }}>View Details</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How Booking Works Section */}
      <section className="section">
        <div className="container">
          <div className="section-header slide-up">
            <h2 className="section-title">A Seamless Spiritual Journey</h2>
            <p className="section-subtitle">Experience a hassle-free booking process designed to give you peace of mind.</p>
          </div>

          <div className="workflow-grid slide-up">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <h4>Choose a Pooja</h4>
              <p>Browse our extensive list of rituals or consult our experts to find the right one.</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <h4>Share Details</h4>
              <p>Provide your location, preferred date, and any specific family traditions.</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <h4>Talk to Pandit</h4>
              <p>We align you with the perfect Pandit to finalize the auspicious Muhurat.</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <h4>Confirm Ritual</h4>
              <p>Relax as we arrange the premium samagri and conduct a divine ceremony.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Guide */}
      <PreparationGuide />

      {/* Meet Pandit */}
      <MeetPandit />

      {/* Ritual Moments Video Showcase */}
      <RitualMoments />

      {/* 6. Online Pooja / NRI Support Section */}
      <section className="section nri-section">
        <div className="container">
          <div className="nri-content-wrapper slide-up">
            <div className="nri-text">
              <h2>Connecting Global Devotees to their Roots</h2>
              <p>Distance should never be a barrier to devotion. Our Online e-Pooja services are specially crafted for NRI families and those unable to host physical rituals.</p>
              <ul className="nri-features">
                <li><Video className="icon" size={24} /> High-Definition Livestream Rituals</li>
                <li><Clock className="icon" size={24} /> Flexible Timing across Global Timezones</li>
                <li><Heart className="icon" size={24} /> Sankalp Taken with Your Name & Gotra</li>
                <li><MapPin className="icon" size={24} /> Prasad Shipped Globally to Your Doorstep</li>
              </ul>
              <Link to="/online-poojas" className="btn-primary">Explore e-Poojas</Link>
            </div>
            <div className="nri-image slide-left">
              <video 
                src="https://res.cloudinary.com/dxtxxbjxj/video/upload/v1783702928/WhatsApp_Video_2026-07-10_at_10.26.45_PM_cwae6b.mp4" 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline 
                style={{ width: '100%', borderRadius: '12px', display: 'block', boxShadow: 'var(--shadow-soft)' }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Educational Trust Section */}
      <EducationalTrust />
      
      {/* Spiritual Guidance */}
      <SpiritualGuidance />

      {/* 10. FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="section-header slide-up">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find answers to common queries about our spiritual services.</p>
          </div>

          <div className="faq-container slide-up">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? 'active' : ''}`} key={index}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  {faq.question}
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA Section */}
      <section className="final-cta slide-up">
        <div className="container">
          <div className="final-cta-content">
            <h2>Ready to invite divine blessings?</h2>
            <p>Our experts are ready to guide you in organizing a deeply spiritual and authentic Vedic ceremony for your family.</p>
            <div className="hero-buttons" style={{ justifyContent: 'center' }}>
              <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-primary" style={{ backgroundColor: 'white', color: 'var(--color-accent-secondary)', borderColor: 'white' }}>
                <MessageCircle size={20} style={{ marginRight: '8px' }} />
                Consult on WhatsApp
              </a>
              <Link to="/poojas" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}>
                Browse All Poojas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
