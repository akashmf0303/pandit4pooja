import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin, requireSuperAdmin }) => {
  const { user, isAdmin, isSuperAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-primary)' }}>
        <Loader2 className="animate-spin" size={48} color="var(--color-accent-primary)" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf9f7', padding: '24px', textAlign: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid rgba(110, 38, 14, 0.1)', maxWidth: '440px', boxShadow: 'var(--shadow-soft)' }}>
          <ShieldAlert size={64} color="#e53e3e" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '24px', color: 'var(--color-accent-secondary)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Super Admin Access Required</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
            This section is restricted to Super Administrators. You are currently logged in as <strong>{user.email}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => signOut()} className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              Logout & Switch Account
            </button>
            <Link to="/" className="btn-outline" style={{ width: '100%', padding: '12px', textAlign: 'center', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf9f7', padding: '24px', textAlign: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid rgba(110, 38, 14, 0.1)', maxWidth: '440px', boxShadow: 'var(--shadow-soft)' }}>
          <ShieldAlert size={64} color="#e53e3e" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '24px', color: 'var(--color-accent-secondary)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Admin Access Required</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
            You need administrator privileges to access the Admin Panel. You are currently logged in as <strong>{user.email}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => signOut()} className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              Logout & Switch Account
            </button>
            <Link to="/" className="btn-outline" style={{ width: '100%', padding: '12px', textAlign: 'center', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
