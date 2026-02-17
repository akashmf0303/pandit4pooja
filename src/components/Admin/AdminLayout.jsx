import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard, Users, Calendar, BookOpen,
    CreditCard, Flame, LogOut, Settings, PlusCircle
} from 'lucide-react';
import '../../styles/main.css';

const AdminLayout = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
        { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
        { name: 'Services', path: '/admin/services', icon: Flame },
        { name: 'Pandits', path: '/admin/pandits', icon: Users },
        { name: 'Courses', path: '/admin/courses', icon: BookOpen },
        { name: 'Payments', path: '/admin/payments', icon: CreditCard },
        { name: 'Users', path: '/admin/users', icon: Settings },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>

            {/* Sidebar */}
            <aside style={{
                width: '260px',
                backgroundColor: '#1e293b',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                left: 0,
                top: 0
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        <div style={{ padding: '6px', backgroundColor: 'var(--color-primary)', borderRadius: '50%' }}>
                            <Flame size={20} color="white" />
                        </div>
                        <span>Pandit 4 Pooja Admin</span>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem 1rem' }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.5rem',
                                        color: isActive ? 'white' : '#94a3b8',
                                        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        transition: 'all 0.2s'
                                    })}
                                >
                                    <item.icon size={20} />
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #334155' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        background: 'none', border: 'none', color: '#94a3b8',
                        cursor: 'pointer', width: '100%', padding: '0.5rem'
                    }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#1e293b' }}>Administration</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                            <PlusCircle size={18} style={{ marginRight: '0.5rem' }} /> Add New
                        </button>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            A
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>

        </div >
    );
};

export default AdminLayout;
