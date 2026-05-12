import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requireRole }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--color-accent-primary)" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && profile?.role !== requireRole && profile?.role !== 'admin') {
    // If role is required and user doesn't have it (and isn't admin), send to home or unauthorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
