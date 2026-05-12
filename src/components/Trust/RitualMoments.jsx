import React, { useState } from 'react';
import { Play } from 'lucide-react';
import './RitualMoments.css';

const RitualMoments = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const moments = [
    {
      id: 1,
      title: "Authentic Havan Preparation",
      subtitle: "The Science of Samagri",
      image: "/images/real_pooja_samagri.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder for actual video
    },
    {
      id: 2,
      title: "Sacred Chants & Aarti",
      subtitle: "Experiencing Deep Devotion",
      image: "/images/real_shivling_pooja.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Family Griha Pravesh",
      subtitle: "Inviting Prosperity Home",
      image: "/images/real_family_havan.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
              {/* Replace with actual video player when videos are provided */}
              <iframe 
                src={activeVideo} 
                allow="autoplay; encrypted-media" 
                allowFullScreen
                title="Ritual Video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RitualMoments;
