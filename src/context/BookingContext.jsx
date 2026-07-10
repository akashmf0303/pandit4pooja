import React, { createContext, useContext, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const withTimeout = (promise, timeoutMs = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs))
  ]);
};

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

  const { user } = useAuth();

  const submitBooking = async () => {
    const bookingId = 'BKG-' + Math.floor(100000 + Math.random() * 900000);
    const userId = user?.uid || null;

    const newBooking = {
      bookingId,
      userId,
      user_id: userId,
      poojaId: bookingData.poojaId,
      poojaTitle: bookingData.poojaTitle,
      pooja_name: bookingData.poojaTitle,
      basePrice: bookingData.basePrice,
      amount: bookingData.basePrice,
      preferences: bookingData.preferences,
      schedule: bookingData.schedule,
      booking_date: bookingData.schedule?.date || 'Awaiting Muhurat',
      contact: bookingData.contact,
      status: 'Pending Consult',
      createdAt: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    try {
      await withTimeout(addDoc(collection(db, 'bookings'), newBooking), 3000);
    } catch (err) {
      console.warn('[BOOKING] Failed to save booking to Firestore:', err);
    }

    // Double-write to localStorage for instant local access
    try {
      const localKey = userId ? `bookings_${userId}` : 'bookings_anonymous';
      const existing = localStorage.getItem(localKey);
      const list = existing ? JSON.parse(existing) : [];
      list.push(newBooking);
      localStorage.setItem(localKey, JSON.stringify(list));

      // Also append to the global admin fallback list
      const globalKey = 'bookings_all_fallback';
      const existingGlobal = localStorage.getItem(globalKey);
      const globalList = existingGlobal ? JSON.parse(existingGlobal) : [];
      globalList.push(newBooking);
      localStorage.setItem(globalKey, JSON.stringify(globalList));

      // Add admin notification
      const notifyKey = 'admin_notifications';
      const existingNotify = localStorage.getItem(notifyKey);
      const notifyList = existingNotify ? JSON.parse(existingNotify) : [];
      notifyList.unshift({
        id: 'notify_' + Date.now() + '_' + Math.random().toString().substring(2, 6),
        message: `New booking request received for ${bookingData.poojaTitle || 'Pooja'}.`,
        type: 'booking',
        read: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      localStorage.setItem(notifyKey, JSON.stringify(notifyList.slice(0, 20)));
    } catch (localErr) {
      console.error('[BOOKING] Failed to write to localStorage:', localErr);
    }

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
