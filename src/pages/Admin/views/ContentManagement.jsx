import React, { useState } from 'react';
import { Plus, Edit3, Type, Settings, CheckCircle, BarChart2 } from 'lucide-react';
import { blogsData } from '../../../data/blogs';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'editor'

  return (
    <div className="slide-up">
      <div className="admin-header">
        <div>
          <h1>Content Hub & SEO</h1>
          <p>Draft, manage, and optimize spiritual articles for organic growth.</p>
        </div>
        {activeTab === 'list' ? (
          <button className="btn-admin-primary" onClick={() => setActiveTab('editor')}>
            <Plus size={18} /> New Article
          </button>
        ) : (
          <button className="btn-admin-outline" onClick={() => setActiveTab('list')}>
            Cancel
          </button>
        )}
      </div>

      {activeTab === 'list' && (
        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Article Details</th>
                  <th>Category</th>
                  <th>SEO Status</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogsData.map(blog => (
                  <tr key={blog.id}>
                    <td>
                      <div style={{ fontWeight: '600' }}>{blog.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', marginTop: '4px' }}>/{blog.id}</div>
                    </td>
                    <td><span style={{ fontSize: '12px', background: 'var(--admin-bg)', padding: '4px 8px', borderRadius: '4px' }}>{blog.category}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-success)', fontSize: '12px' }}>
                        <BarChart2 size={14} /> Optimized
                      </div>
                    </td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>{blog.date}</td>
                    <td>
                      <button className="btn-admin-action" onClick={() => setActiveTab('editor')}><Edit3 size={16} /> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'editor' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          {/* Main Editor Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="admin-panel" style={{ padding: '32px', marginBottom: 0 }}>
              <input 
                type="text" 
                placeholder="Article Title..." 
                style={{ width: '100%', border: 'none', borderBottom: '2px solid var(--admin-border)', fontSize: '32px', fontFamily: 'var(--font-heading)', paddingBottom: '16px', marginBottom: '24px', outline: 'none', background: 'transparent', color: 'var(--admin-text-primary)' }}
              />
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '16px' }}>
                <button className="btn-admin-action" style={{ background: 'transparent' }}><Type size={18} /> Format</button>
                <button className="btn-admin-action" style={{ background: 'transparent' }}>H2</button>
                <button className="btn-admin-action" style={{ background: 'transparent' }}>H3</button>
                <button className="btn-admin-action" style={{ background: 'transparent' }}>Quote</button>
                <button className="btn-admin-action" style={{ background: 'transparent' }}>List</button>
                <button className="btn-admin-action" style={{ background: 'transparent', color: 'var(--admin-accent)' }}>+ Add FAQ Block</button>
                <button className="btn-admin-action" style={{ background: 'transparent', color: 'var(--admin-accent)' }}>+ Add Related Pooja</button>
              </div>

              <textarea 
                placeholder="Write your spiritual wisdom here. Use Markdown for styling..."
                style={{ width: '100%', minHeight: '500px', border: 'none', resize: 'vertical', fontSize: '16px', lineHeight: '1.8', fontFamily: 'var(--font-body)', outline: 'none', background: 'transparent', color: 'var(--admin-text-primary)' }}
              />
            </div>
          </div>

          {/* Sidebar Settings Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="admin-panel" style={{ padding: '24px', marginBottom: 0 }}>
              <h3 style={{ fontSize: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={18} /> Publishing Details
              </h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '8px' }}>URL Slug</label>
                <input type="text" placeholder="e.g. importance-of-havan" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '8px' }}>Category</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}>
                  <option>Pooja Guides</option>
                  <option>Muhurat & Astrology</option>
                  <option>Spiritual Remedies</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '8px' }}>Featured Image</label>
                <div style={{ width: '100%', height: '120px', border: '2px dashed var(--admin-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
                  Click to Upload Image
                </div>
              </div>

              <button className="btn-admin-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <CheckCircle size={18} /> Publish Article
              </button>
            </div>

            {/* AI Assistant Stub */}
            <div className="admin-panel" style={{ padding: '24px', background: 'rgba(224, 110, 56, 0.02)', borderColor: 'rgba(224, 110, 56, 0.2)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--admin-accent)' }}>AI SEO Assistant</h3>
              <p style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '16px' }}>
                Let our AI scan your text to generate Schema Markup, Meta Descriptions, and suggest internal links to related Poojas.
              </p>
              <button className="btn-admin-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', borderColor: 'var(--admin-accent)', color: 'var(--admin-accent)' }}>
                Analyze Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
