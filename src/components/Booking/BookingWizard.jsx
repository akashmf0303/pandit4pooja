import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Calendar, MapPin, CheckCircle, Video, Users } from 'lucide-react';

const BookingWizard = ({ isOpen, onClose, initialData = null }) => {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({
        occasion: '',
        date: '',
        mode: '',
        location: ''
    });

    React.useEffect(() => {
        if (isOpen && initialData) {
            setSelection(prev => ({ ...prev, ...initialData }));
            // If ritual is selected, skip to step 2 (Date) or Step 3 if date is also present?
            // User flow: Home Widget -> Select Ritual -> Select Date -> Check Availability
            // So we should probably jump to a "Confirmation/Mode" step or just show the Date step pre-filled.
            // Let's jump to step 3 (Mode) if date is present, or Step 2 if only ritual is present.
            if (initialData.date) {
                setStep(3);
            } else if (initialData.occasion) {
                setStep(2);
            }
        } else if (isOpen && !initialData) {
            // Reset if opened without data (generic "Book Now" button)
            setStep(1);
            setSelection({ occasion: '', date: '', mode: '', location: '' });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const occasions = [
        { id: 'hawan', label: 'Hawan / Yagya', icon: '🔥' },
        { id: 'sanskar', label: 'Sanskar (Wedding, etc)', icon: '💍' },
        { id: 'puja', label: 'Festival Pooja', icon: '🙏' },
        { id: 'dosh', label: 'Dosh Nivaran', icon: '✨' },
    ];

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
            backdropFilter: 'blur(5px)'
        }}>
            <div className="card" style={{
                width: '90%', maxWidth: '600px', padding: '0', overflow: 'hidden',
                animation: 'slideUp 0.3s ease-out'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem', borderBottom: '1px solid var(--color-border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    backgroundColor: 'var(--color-surface)'
                }}>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Book a Ritual</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Step {step} of 4</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>

                    {/* Step 1: Occasion Selection */}
                    {step === 1 && (
                        <div className="fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>What is the holy occasion?</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {occasions.map((occ) => (
                                    <button
                                        key={occ.id}
                                        onClick={() => { setSelection({ ...selection, occasion: occ.label }); nextStep(); }}
                                        style={{
                                            padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
                                            backgroundColor: 'white', textAlign: 'center', transition: 'all 0.2s',
                                            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>{occ.icon}</span>
                                        <span style={{ fontWeight: 600 }}>{occ.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Date & Details */}
                    {step === 2 && (
                        <div className="fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>When should we perform it?</h2>
                            <div className="form-group">
                                <label className="label">Select Date</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={selection.date}
                                    onChange={(e) => setSelection({ ...selection, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Preferred Time</label>
                                <select className="select">
                                    <option>Morning (Brahma Muhurta)</option>
                                    <option>Afternoon</option>
                                    <option>Evening</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Mode */}
                    {step === 3 && (
                        <div className="fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>How would you like to attend?</h2>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setSelection({ ...selection, mode: 'Online' })}
                                    className={selection.mode === 'Online' ? 'card active-mode' : 'card'}
                                    style={{ flex: 1, textAlign: 'center', cursor: 'pointer', border: selection.mode === 'Online' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}
                                >
                                    <Video size={32} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
                                    <h4>Online (e-Pooja)</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Video call via Zoom/Meet</p>
                                </button>
                                <button
                                    onClick={() => setSelection({ ...selection, mode: 'Offline' })}
                                    className={selection.mode === 'Offline' ? 'card active-mode' : 'card'}
                                    style={{ flex: 1, textAlign: 'center', cursor: 'pointer', border: selection.mode === 'Offline' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}
                                >
                                    <MapPin size={32} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
                                    <h4>Offline (At Home)</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Pandit visits your place</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Review Booking</h2>
                            <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Occasion:</span>
                                    <strong>{selection.occasion}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Mode:</span>
                                    <strong>{selection.mode}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Consultation Fee:</span>
                                    <strong>₹501</strong>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Controls */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                    {step > 1 ? (
                        <button onClick={prevStep} className="btn btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Back</button>
                    ) : <div></div>}

                    {step < 4 ? (
                        <button onClick={nextStep} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Next <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></button>
                    ) : (
                        <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Confirm & Pay</button>
                    )}
                </div>
            </div>
            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
        </div>
    );
};

export default BookingWizard;
