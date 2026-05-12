import React from 'react';
import { Plus, Star, MapPin, CheckCircle } from 'lucide-react';

const PanditManagement = () => {
  return (
    <div className="slide-up">
      <div className="admin-header">
        <div>
          <h1>Pandit Roster</h1>
          <p>Manage acharyas, availability, and language skills.</p>
        </div>
        <button className="btn-admin-primary">
          <Plus size={18} /> Onboard Pandit
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="metric-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--admin-accent)' }}>
              <img src="/images/pandit_ankush_1778447215487.png" alt="Ankush Shukla" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Acharya Ankush Shukla</h3>
              <div style={{ color: 'var(--admin-text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <MapPin size={12} /> Head Acharya (Mumbai/Online)
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', background: 'var(--admin-bg)', padding: '4px 10px', borderRadius: '20px', color: 'var(--admin-text-secondary)', border: '1px solid var(--admin-border)' }}>Hindi</span>
            <span style={{ fontSize: '12px', background: 'var(--admin-bg)', padding: '4px 10px', borderRadius: '20px', color: 'var(--admin-text-secondary)', border: '1px solid var(--admin-border)' }}>Sanskrit</span>
            <span style={{ fontSize: '12px', background: 'rgba(34, 197, 94, 0.1)', padding: '4px 10px', borderRadius: '20px', color: 'var(--admin-success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={12} /> Available</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--admin-border)', paddingTop: '16px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--admin-warning)', fontWeight: '600' }}>
              <Star size={16} fill="currentColor" /> 5.0 <span style={{ color: 'var(--admin-text-secondary)', fontWeight: '400', fontSize: '12px' }}>(124)</span>
            </div>
            <button className="btn-admin-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>View Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditManagement;
