import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    poojaId: null,
    poojaTitle: '',
    basePrice: '',
    preferences: {
      language: 'Hindi',
      mode: 'Offline (At Home/Temple)',
      traditions: '',
      specialRequests: ''
    },
    schedule: {
      date: null,
      timePreference: 'Morning (8 AM - 12 PM)',
      needMuhuratConsultation: true
    },
    contact: {
      address: '',
      city: '',
      landmark: '',
      whatsappNumber: '',
      alternateNumber: ''
    }
  });

  const updateBookingData = (section, data) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const setPoojaSelection = (id, title, price) => {
    setBookingData(prev => ({
      ...prev,
      poojaId: id,
      poojaTitle: title,
      basePrice: price
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step) => setCurrentStep(step);
  const resetBooking = () => {
    setCurrentStep(1);
    setBookingData({
      poojaId: null,
      poojaTitle: '',
      basePrice: '',
      preferences: { language: 'Hindi', mode: 'Offline', traditions: '', specialRequests: '' },
      schedule: { date: null, timePreference: 'Morning', needMuhuratConsultation: true },
      contact: { address: '', city: '', landmark: '', whatsappNumber: '', alternateNumber: '' }
    });
  };

  const submitBooking = async () => {
    // Simulate API call to Supabase
    await new Promise(resolve => setTimeout(resolve, 1500));
    const bookingId = 'BKG-' + Math.floor(100000 + Math.random() * 900000);
    return bookingId;
  };

  const value = {
    currentStep,
    bookingData,
    updateBookingData,
    setPoojaSelection,
    nextStep,
    prevStep,
    goToStep,
    resetBooking,
    submitBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
