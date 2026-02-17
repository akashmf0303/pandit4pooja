import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminResourceManager = () => {
    const location = useLocation();
    const resourceName = location.pathname.split('/').pop();

    // Title Case Helper
    const title = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1e293b' }}>Manage {title}</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder={`Search ${title}...`}
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', width: '240px' }}
                    />
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        Add New {title.slice(0, -1)}
                    </button>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                    This is a placeholder for the <strong>{title}</strong> management interface.
                </p>
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
                    Real data integration will be implemented in the next phase.
                </p>
            </div>
        </div>
    );
};

export default AdminResourceManager;
