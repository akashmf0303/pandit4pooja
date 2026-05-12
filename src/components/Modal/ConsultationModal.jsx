import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import './ConsultationModal.css';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would trigger an API call to Supabase/Email service
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div className="modal-content slide-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="modal-header">
              <h2>Schedule a Consultation</h2>
              <p>Acharya Ankush Shukla will review your details and contact you via WhatsApp shortly to discuss your spiritual needs.</p>
            </div>
            
            <form className="unified-contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input type="tel" placeholder="Enter your WhatsApp number" required />
              </div>
              <div className="form-group">
                <label>How can we help?</label>
                <textarea 
                  placeholder="Tell us about the pooja you want to perform, or any specific astrological guidance you need..." 
                  rows="4" 
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                Request Consultation
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <CheckCircle size={64} className="success-icon" />
            <h2>Request Received!</h2>
            <p>Thank you for reaching out. Acharya Ankush Shukla will contact you on WhatsApp very soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
