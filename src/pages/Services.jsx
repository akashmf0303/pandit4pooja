import React, { useState } from 'react';
import { Clock, IndianRupee, ArrowRight, Filter, ChevronDown } from 'lucide-react';

const Services = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Dosh Nivaran', 'Shanti Pujan', 'Sanskar', 'Special Anushthan'];

    const services = [
        {
            id: 1,
            name: 'Kaal Sarp Dosh Nivaran',
            description: 'Complete removal of Kaal Sarp Dosh to bring stability and success in life.',
            duration: '3-4 Hours',
            price: '5100',
            category: 'Dosh Nivaran'
        },
        {
            id: 2,
            name: 'Navgrah Shanti Pujan',
            description: 'Pacify all nine planets to reduce malefic effects and enhance positive vibrations.',
            duration: '2 Hours',
            price: '3100',
            category: 'Shanti Pujan'
        },
        {
            id: 3,
            name: 'Rudrabhishek Pujan',
            description: 'Abhishek of Lord Shiva with Rudra hymns for health, wealth, and prosperity.',
            duration: '1.5 Hours',
            price: '2100',
            category: 'Special Anushthan'
        },
        {
            id: 4,
            name: 'Vivah Sanskar',
            description: 'Traditional Vedic wedding ceremony performed by experienced Acharyas.',
            duration: '4-6 Hours',
            price: '11000',
            category: 'Sanskar'
        },
        {
            id: 5,
            name: 'Mahamrityunjay Jaap',
            description: '1.25 Lakh Jaap for conquering death, disease, and fear. Performed over multiple days.',
            duration: '5 Days',
            price: '21000',
            category: 'Special Anushthan'
        },
        {
            id: 6,
            name: 'Mangal Dosh Nivaran',
            description: 'Resolve marriage delays and disharmony caused by Mangal Dosh.',
            duration: '3 Hours',
            price: '4100',
            category: 'Dosh Nivaran'
        },
        {
            id: 7,
            name: 'Grih Pravesh Pujan',
            description: 'Bless your new home with positive energy before moving in.',
            duration: '3 Hours',
            price: '5100',
            category: 'Sanskar'
        },
        {
            id: 8,
            name: 'Satyanarayan Katha',
            description: 'Story of Lord Vishnu for domestic happiness and fulfilling desires.',
            duration: '2 Hours',
            price: '2100',
            category: 'Shanti Pujan'
        }
    ];

    const filteredServices = activeFilter === 'All'
        ? services
        : services.filter(service => service.category === activeFilter);

    return (
        <div style={{ padding: '4rem 0 6rem', backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ marginBottom: '1rem' }}>Sacred Rituals & Offerings</h1>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Choose from our comprehensive list of Vedic services performed with absolute purity and devotion.
                    </p>
                </div>

                {/* Filters */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '4rem'
                }}>
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                padding: '0.6rem 1.5rem',
                                borderRadius: '2rem',
                                border: activeFilter === filter ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                backgroundColor: activeFilter === filter ? 'var(--color-primary-light)' : 'white',
                                color: activeFilter === filter ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontSize: '0.95rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {filteredServices.map(service => (
                        <div key={service.id} className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0',
                            overflow: 'hidden',
                            border: '1px solid rgba(229, 204, 160, 0.4)' // Subtle gold border
                        }}>
                            {/* Card Decoration */}
                            <div style={{ height: '6px', backgroundColor: 'var(--color-primary)', width: '100%' }}></div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: 'var(--color-background)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '1rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    alignSelf: 'flex-start',
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em'
                                }}>
                                    {service.category}
                                </div>

                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                                    {service.name}
                                </h3>

                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>
                                    {service.description}
                                </p>

                                <div style={{
                                    borderTop: '1px solid var(--color-border)',
                                    paddingTop: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)' }}>
                                        <Clock size={16} color="var(--color-accent)" />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{service.duration}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        <IndianRupee size={18} />
                                        <span>{service.price}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'space-between' }}>
                                    Book Now
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredServices.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                        <p>No services found in this category.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Services;
