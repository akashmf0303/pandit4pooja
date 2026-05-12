import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingWizard from '../components/Booking/BookingWizard';

const BookPuja = () => {
    const navigate = useNavigate();

    // When the wizard is closed, we navigate back to home or previous page
    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="sacred-pattern" style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* The Wizard is a modal, so it will overlay this */}
            <h2 className="fade-in" style={{ opacity: 0.5 }}>Starting your spiritual journey...</h2>
            <BookingWizard isOpen={true} onClose={handleClose} />
        </div>
    );
};

export default BookPuja;
