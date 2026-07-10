import React, { useState } from 'react';
import { Play } from 'lucide-react';
import './RitualMoments.css';

const RitualMoments = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const moments = [
    {
      id: 1,
      title: "Sundarkand Path",
      subtitle: "Recitation of Lord Hanuman's Glory",
      image: "/images/hanuman_puja_1778447133698.png",
      videoUrl: "https://res.cloudinary.com/dxtxxbjxj/video/upload/v1783702955/WhatsApp_Video_2026-07-10_at_10.29.39_PM_kx2vry.mp4"
    },
    {
      id: 2,
      title: "Mahamrityunjay Anusthan",
      subtitle: "Vedic Chants for Health & Longevity",
      image: "/images/shiva_puja_1778447103439.png",
      videoUrl: "https://res.cloudinary.com/dxtxxbjxj/video/upload/v1783702965/WhatsApp_Video_2026-07-10_at_10.30.17_PM_aaypaw.mp4"
    },
    {
      id: 3,
      title: "Durga Saptashati Path",
      subtitle: "Sacred Invocation of Divine Mother",
      image: "/images/durga_chandi.png",
      videoUrl: "https://res.cloudinary.com/dxtxxbjxj/video/upload/v1783702978/WhatsApp_Video_2026-07-10_at_10.31.02_PM_xhi7vz.mp4"
    }
  ];

  return (
    <section className="ritual-moments-section">
      <div className="container">
        <div className="section-header slide-up">
          <h2 className="section-title">Sacred Experiences</h2>
          <p className="section-subtitle">Witness the profound devotion and exact scriptural adherence of our rituals.</p>
        </div>

        <div className="moments-grid">
          {moments.map((moment) => (
            <div 
              key={moment.id} 
              className="moment-card slide-up"
              onClick={() => setActiveVideo(moment.videoUrl)}
            >
              <div className="moment-thumbnail">
                <img src={moment.image} alt={moment.title} />
                <div className="moment-overlay">
                  <div className="play-button-wrapper">
                    <Play fill="white" size={24} className="play-icon" />
                  </div>
                </div>
              </div>
              <div className="moment-info">
                <h4>{moment.title}</h4>
                <p>{moment.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setActiveVideo(null)}>×</button>
            <div className="video-wrapper">
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RitualMoments;
