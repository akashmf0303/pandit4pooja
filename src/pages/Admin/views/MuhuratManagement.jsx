import React from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

const MuhuratManagement = () => {
  return (
    <div className="slide-up">
      <div className="admin-header">
        <div>
          <h1>Muhurat Calendar</h1>
          <p>Define auspicious dates and block unavailable periods.</p>
        </div>
        <button className="btn-admin-primary">
          <Plus size={18} /> Add Auspicious Event
        </button>
      </div>

      <div className="admin-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
        <CalendarIcon size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
        <h3 style={{ margin: '0 0 8px', color: 'var(--admin-text-primary)' }}>Muhurat Intelligence Engine</h3>
        <p style={{ maxWidth: '400px', margin: '0 auto' }}>This module will connect to the future AI astrological engine to automatically flag auspicious dates for specific poojas.</p>
      </div>
    </div>
  );
};

export default MuhuratManagement;
