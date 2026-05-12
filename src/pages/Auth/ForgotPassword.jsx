import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    const { error } = await resetPassword(email);
    setIsSubmitting(false);
    
    if (!error) {
      setIsSent(true);
    }
  };

  return (
    <div className="auth-page slide-up">
      <div className="auth-container">
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '24px', fontSize: '15px' }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
        
        <div className="auth-header" style={{ marginBottom: isSent ? '0' : '32px' }}>
          <h1>Reset Password</h1>
          <p>
            {isSent 
              ? "We've sent you an email with a link to reset your password. Please check your inbox."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!isSent && (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary auth-submit-btn"
              disabled={isSubmitting}
              style={{ marginTop: '16px' }}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
