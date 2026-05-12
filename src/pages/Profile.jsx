import React from 'react';
import { User, Settings, CreditCard, Heart, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
    const user = {
        name: 'Akash Mishra',
        email: 'akash@example.com',
        phone: '+91 98765 43210',
        avatar: 'AM'
    };

    const menuItems = [
        { icon: User, label: 'Personal Details' },
        { icon: CreditCard, label: 'Payment Methods' },
        { icon: Heart, label: 'Wishlist' },
        { icon: Settings, label: 'Settings' },
        { icon: LogOut, label: 'Logout', color: 'red' }
    ];

    return (
        <div style={{ padding: '4rem 0 6rem', backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Profile</h1>

                {/* User Card */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary)',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', fontWeight: 'bold'
                    }}>
                        {user.avatar}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{user.email}</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{user.phone}</p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {menuItems.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1.25rem', borderBottom: index !== menuItems.length - 1 ? '1px solid var(--color-border)' : 'none',
                            cursor: 'pointer', transition: 'background 0.2s',
                            ':hover': { backgroundColor: '#f9f9f9' }
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <item.icon size={20} color={item.color || 'var(--color-text-main)'} />
                                <span style={{ fontWeight: 500, color: item.color || 'var(--color-text-main)' }}>{item.label}</span>
                            </div>
                            <ChevronRight size={18} color="var(--color-text-muted)" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Profile;
