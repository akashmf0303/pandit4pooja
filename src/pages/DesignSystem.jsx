import React from 'react';

const DesignSystem = () => {
    return (
        <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                <h1 style={{ marginBottom: '3rem', borderBottom: '2px solid var(--color-primary)', display: 'inline-block' }}>Design System</h1>

                {/* Colors */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Colors</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                        <ColorSwatch name="Primary" color="var(--color-primary)" />
                        <ColorSwatch name="Primary Light" color="var(--color-primary-light)" />
                        <ColorSwatch name="Accent" color="var(--color-accent)" />
                        <ColorSwatch name="Text Main" color="var(--color-text-main)" />
                        <ColorSwatch name="Text Muted" color="var(--color-text-muted)" />
                        <ColorSwatch name="Success" color="var(--color-success)" />
                        <ColorSwatch name="Error" color="var(--color-error)" />
                        <ColorSwatch name="Warning" color="var(--color-warning)" />
                    </div>
                </section>

                {/* Typography */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Typography</h2>
                    <div className="card">
                        <h1>Heading 1 - Cormorant Garamond</h1>
                        <h2>Heading 2 - The Quick Brown Fox</h2>
                        <h3>Heading 3 - Jumps Over The Lazy Dog</h3>
                        <h4>Heading 4 - Sacred Rituals & Offerings</h4>
                        <p style={{ marginTop: '1rem' }}>
                            <strong>Body Text (Outfit):</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </section>

                {/* Buttons */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Buttons</h2>
                    <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary">Primary Button</button>
                        <button className="btn btn-secondary">Secondary Button</button>
                        <button className="btn btn-primary" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>Disabled</button>
                    </div>
                </section>

                {/* Form Elements */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Form Elements</h2>
                    <div className="card" style={{ maxWidth: '600px' }}>
                        <div className="form-group">
                            <label className="label">Full Name</label>
                            <input type="text" className="input" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label className="label">Select Service</label>
                            <select className="select">
                                <option>Rudrabhishek</option>
                                <option>Satyanarayan Katha</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label">Message</label>
                            <textarea className="textarea" rows="4" placeholder="Any special requests..."></textarea>
                        </div>
                    </div>
                </section>

                {/* Badges & Cards */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Components</h2>
                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                        <div className="card">
                            <h3 style={{ marginBottom: '1rem' }}>Badges</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className="badge badge-success">Success</span>
                                <span className="badge badge-error">Error</span>
                                <span className="badge badge-warning">Warning</span>
                                <span className="badge badge-info">Info</span>
                                <span className="badge badge-primary">New</span>
                            </div>
                        </div>
                        <div className="card">
                            <h3 style={{ marginBottom: '0.5rem' }}>Card Component</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>This is a standard card container with a subtle shadow and hover effect.</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

const ColorSwatch = ({ name, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{
            height: '80px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: color,
            border: '1px solid #eee',
            boxShadow: 'var(--shadow-sm)'
        }}></div>
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{color}</span>
    </div>
);

export default DesignSystem;
