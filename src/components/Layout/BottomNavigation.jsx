import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, BookOpen, Calendar, User } from 'lucide-react';

const BottomNavigation = () => {
    const tabs = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Services', path: '/services', icon: Grid },
        { name: 'Courses', path: '/courses', icon: BookOpen },
        { name: 'Bookings', path: '/bookings', icon: Calendar },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    return (
        <>
            <div className="bottom-nav-spacer"></div>
            <nav className="bottom-nav">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.path}
                        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <tab.icon size={24} />
                        <span>{tab.name}</span>
                    </NavLink>
                ))}
            </nav >
            <style>{`
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: white;
          border-top: 1px solid var(--color-border);
          padding: 0.5rem 1rem 1.5rem; /* Extra padding for iPhone home indicator */
          justify-content: space-between;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
          z-index: 1000;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 500;
          flex: 1;
        }

        .bottom-nav-item.active {
          color: var(--color-primary);
        }

        .bottom-nav-spacer {
          display: none;
          height: 80px;
        }

        @media (max-width: 768px) {
          .bottom-nav { display: flex; }
          .bottom-nav-spacer { display: block; }
          /* Hide Footer on mobile to prevent clutter? Or keep it? kept for now */
        }
      `}</style>
        </>
    );
};

export default BottomNavigation;
