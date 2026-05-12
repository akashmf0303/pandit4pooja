import React from 'react';
import { Plus, Edit3, Image as ImageIcon } from 'lucide-react';
import { poojasData } from '../../../data/poojas';

const PoojaManagement = () => {
  return (
    <div className="slide-up">
      <div className="admin-header">
        <div>
          <h1>Pooja Catalog</h1>
          <p>Manage offerings, pricing, descriptions, and SEO details.</p>
        </div>
        <button className="btn-admin-primary">
          <Plus size={18} /> Add New Pooja
        </button>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Ritual Title</th>
                <th>Base Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {poojasData.slice(0, 10).map((pooja) => (
                <tr key={pooja.id}>
                  <td>
                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {pooja.image ? (
                        <img src={pooja.image} alt={pooja.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <ImageIcon size={20} color="var(--admin-text-secondary)" />
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{pooja.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pooja.subtitle}</div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{pooja.price}</td>
                  <td><span className="status-badge status-confirmed">Active</span></td>
                  <td>
                    <button className="btn-admin-action"><Edit3 size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', textAlign: 'center', borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', fontSize: '14px' }}>
          Showing 10 of {poojasData.length} poojas
        </div>
      </div>
    </div>
  );
};

export default PoojaManagement;
