import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, CheckCircle, ChevronRight, MessageCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { poojasData } from '../../data/poojas';
import './BookingFlow.css';

const steps = [
  "Select Pooja",
  "Preferences",
  "Date & Time",
  "Location",
  "Review",
  "Confirmation"
];

const BookingFlow = () => {
  const { currentStep, bookingData, updateBookingData, setPoojaSelection, nextStep, prevStep, submitBooking } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (currentStep === 5) {
      setIsSubmitting(true);
      const id = await submitBooking();
      setBookingId(id);
      setIsSubmitting(false);
      nextStep();
    } else {
      nextStep();
    }
  };

  const isStep1Valid = bookingData.poojaId !== null;
  const isStep2Valid = true; // Added default selections
  const isStep3Valid = bookingData.schedule.date !== null || bookingData.schedule.needMuhuratConsultation;
  const isStep4Valid = bookingData.contact.address !== '' && bookingData.contact.city !== '' && bookingData.contact.whatsappNumber !== '';

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      case 4: return isStep4Valid;
      default: return true;
    }
  };

  return (
    <div className="booking-container slide-up">
      <div className="booking-header">
        <h1>Book Your Ritual</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>A seamless, guided process to arrange your authentic Vedic ceremony.</p>
      </div>

      <div className="booking-progress">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;
          return (
            <div key={index} className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? <Check size={20} /> : stepNum}
              </div>
              <span className="step-label">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="booking-card">
        {/* STEP 1: Select Pooja */}
        {currentStep === 1 && (
          <div className="step-content fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--color-accent-secondary)' }}>Which ritual would you like to book?</h2>
            <div className="pooja-selection-grid">
              {poojasData.map(pooja => (
                <div 
                  key={pooja.id} 
                  className={`pooja-select-card ${bookingData.poojaId === pooja.id ? 'selected' : ''}`}
                  onClick={() => setPoojaSelection(pooja.id, pooja.title, pooja.price)}
                >
                  <h4>{pooja.title}</h4>
                  <p>{pooja.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Ritual Preferences */}
        {currentStep === 2 && (
          <div className="step-content fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--color-accent-secondary)' }}>How would you like it performed?</h2>
            
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>Preferred Language of Pandit</label>
              <select 
                value={bookingData.preferences.language}
                onChange={(e) => updateBookingData('preferences', { language: e.target.value })}
              >
                <option value="Hindi">Hindi (Sanskrit Mantras + Hindi Explanation)</option>
                <option value="English">English (Sanskrit Mantras + English Explanation)</option>
                <option value="Marathi">Marathi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>Mode of Ritual</label>
              <div className="radio-group">
                <label className={`radio-option ${bookingData.preferences.mode === 'Offline' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="mode" 
                    value="Offline" 
                    checked={bookingData.preferences.mode === 'Offline'}
                    onChange={(e) => updateBookingData('preferences', { mode: e.target.value })}
                  />
                  <span><strong>Offline</strong> — Pandit visits your home or office.</span>
                </label>
                <label className={`radio-option ${bookingData.preferences.mode === 'Online' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="mode" 
                    value="Online" 
                    checked={bookingData.preferences.mode === 'Online'}
                    onChange={(e) => updateBookingData('preferences', { mode: e.target.value })}
                  />
                  <span><strong>Online (e-Pooja)</strong> — Conducted via live 4K video call.</span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Special Requests or Family Traditions (Optional)</label>
              <input 
                type="text" 
                placeholder="E.g., We belong to the Bhardwaj Gotra"
                value={bookingData.preferences.specialRequests}
                onChange={(e) => updateBookingData('preferences', { specialRequests: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Date & Muhurat */}
        {currentStep === 3 && (
          <div className="step-content fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--color-accent-secondary)' }}>When should the ritual take place?</h2>
            
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className={`radio-option ${bookingData.schedule.needMuhuratConsultation ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={bookingData.schedule.needMuhuratConsultation}
                  onChange={(e) => updateBookingData('schedule', { needMuhuratConsultation: e.target.checked })}
                />
                <span><strong>I need help finding an auspicious date (Muhurat)</strong>. Our astrologers will contact you.</span>
              </label>
            </div>

            {!bookingData.schedule.needMuhuratConsultation && (
              <>
                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label>Select Date</label>
                  <input 
                    type="date" 
                    value={bookingData.schedule.date || ''}
                    onChange={(e) => updateBookingData('schedule', { date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time Slot</label>
                  <select 
                    value={bookingData.schedule.timePreference}
                    onChange={(e) => updateBookingData('schedule', { timePreference: e.target.value })}
                  >
                    <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 4: Address & Contact */}
        {currentStep === 4 && (
          <div className="step-content fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--color-accent-secondary)' }}>Where and how should we contact you?</h2>
            
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Complete Address</label>
              <input 
                type="text" 
                placeholder="House No, Building, Street"
                value={bookingData.contact.address}
                onChange={(e) => updateBookingData('contact', { address: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label>City</label>
                <select 
                  value={bookingData.contact.city}
                  onChange={(e) => updateBookingData('contact', { city: e.target.value })}
                >
                  <option value="" disabled>Select City</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Other">Other (For Online)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Landmark</label>
                <input 
                  type="text" 
                  placeholder="Optional"
                  value={bookingData.contact.landmark}
                  onChange={(e) => updateBookingData('contact', { landmark: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input 
                  type="tel" 
                  placeholder="+91"
                  value={bookingData.contact.whatsappNumber}
                  onChange={(e) => updateBookingData('contact', { whatsappNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Alternate Number</label>
                <input 
                  type="tel" 
                  placeholder="Optional"
                  value={bookingData.contact.alternateNumber}
                  onChange={(e) => updateBookingData('contact', { alternateNumber: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review */}
        {currentStep === 5 && (
          <div className="step-content fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--color-accent-secondary)' }}>Review your Request</h2>
            
            <div className="review-summary">
              <div className="review-row">
                <span className="review-label">Ritual</span>
                <span className="review-value">{bookingData.poojaTitle}</span>
              </div>
              <div className="review-row">
                <span className="review-label">Mode & Language</span>
                <span className="review-value">{bookingData.preferences.mode} • {bookingData.preferences.language}</span>
              </div>
              <div className="review-row">
                <span className="review-label">Date</span>
                <span className="review-value">{bookingData.schedule.needMuhuratConsultation ? 'Awaiting Consultation' : bookingData.schedule.date}</span>
              </div>
              <div className="review-row">
                <span className="review-label">Location</span>
                <span className="review-value">{bookingData.contact.city}</span>
              </div>
              <div className="review-row" style={{ marginTop: '12px', paddingTop: '16px', borderTop: '2px dashed rgba(0,0,0,0.1)' }}>
                <span className="review-label" style={{ fontSize: '16px', color: 'var(--color-accent-secondary)' }}>Estimated Total</span>
                <span className="review-value" style={{ fontSize: '20px', color: 'var(--color-accent-primary)' }}>{bookingData.basePrice}</span>
              </div>
            </div>
            
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              No payment is required right now. Our Acharya will review your request and confirm the details with you via WhatsApp.
            </p>
          </div>
        )}

        {/* STEP 6: Confirmation */}
        {currentStep === 6 && (
          <div className="step-content fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="success-icon-wrapper">
              <CheckCircle size={40} />
            </div>
            <h2 style={{ marginBottom: '16px', color: 'var(--color-accent-secondary)' }}>Request Submitted Successfully!</h2>
            <p style={{ marginBottom: '8px', fontSize: '18px' }}>Your Booking ID is: <strong>{bookingId}</strong></p>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Our Head Acharya has received your request. We will contact you on your WhatsApp number shortly to confirm the Muhurat and finalize the details.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={20} /> Talk on WhatsApp Now
              </a>
              <Link to="/dashboard" className="btn-outline">
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}

        {currentStep < 6 && (
          <div className="booking-actions">
            <button 
              className="btn-outline" 
              onClick={prevStep} 
              style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!isCurrentStepValid() || isSubmitting}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {isSubmitting ? 'Submitting...' : currentStep === 5 ? 'Confirm Request' : 'Continue'}
              {currentStep < 5 && !isSubmitting && <ChevronRight size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
