import React from 'react';
import { Shield, Users, Heart, CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="fade-in">
            {/* Hero Section */}
            <section style={{
                backgroundColor: 'var(--color-surface)',
                padding: '6rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <span style={{
                        color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.05em',
                        textTransform: 'uppercase', marginBottom: '1rem', display: 'block'
                    }}>
                        Our Mission
                    </span>
                    <h1 style={{
                        fontSize: '3rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem',
                        fontFamily: 'var(--font-family-heading)', color: 'var(--color-text-heading)'
                    }}>
                        Restoring the Sanctity of <br /> <span className="text-saffron">Vedic Traditions</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto',
                        lineHeight: '1.8'
                    }}>
                        Pandit 4 Pooja was born from a desire to bridge the gap between ancient wisdom and modern convenience.
                        We connect devotees with authentic, knowledgeable Pandits to ensure every ritual is performed with
                        absolute purity and devotion.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        {[
                            {
                                icon: Shield,
                                title: "Authenticity",
                                desc: "We strictly adhere to Vedic scriptures. No shortcuts, only pure tradition."
                            },
                            {
                                icon: Users,
                                title: "Qualified Pandits",
                                desc: "Our Pandits are graduates from prestigiousgurukuls and vedic universities."
                            },
                            {
                                icon: Heart,
                                title: "Devotion First",
                                desc: "We believe that a ritual performed with true bhaav (emotion) yields the best fruit."
                            }
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: '2rem', borderRadius: '1rem', border: '1px solid var(--color-border)',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '64px', height: '64px', margin: '0 auto 1.5rem',
                                    backgroundColor: 'var(--color-primary-light)', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'
                                }}>
                                    <item.icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{
                            width: '100%', height: '400px', backgroundColor: '#fed7aa', borderRadius: '1rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c2410c'
                        }}>
                            <span style={{ fontWeight: 600, fontSize: '1.5rem' }}>Our Journey Image</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-family-heading)' }}>
                            Why We Started
                        </h2>
                        <p style={{ color: 'var(--color-text-main)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                            In today's fast-paced world, finding a reliable Pandit Ji who can explain the meaning behind the mantras
                            is becoming increasingly difficult. Many rituals have become mere transactions.
                        </p>
                        <p style={{ color: 'var(--color-text-main)', marginBottom: '2rem', lineHeight: '1.8' }}>
                            We created Pandit 4 Pooja to change this. We verify every Pandit's credentials, ensuring they not only
                            know the 'How' but also the 'Why' of every ritual.
                        </p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                "5000+ Happy Families",
                                "Verified Vedic Scholars",
                                "Global Service Availability"
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                                    <CheckCircle size={20} color="var(--color-primary)" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
