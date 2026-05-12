import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, Star, ShieldCheck, PlayCircle, CheckCircle } from 'lucide-react';

const CourseDetail = () => {
    const { id } = useParams();

    // Mock Data - In a real app, fetch based on ID
    const course = {
        id: 1,
        title: 'Vedic Mantras for Beginners',
        instructor: 'Ankush Shukla',
        rating: 4.8,
        students: 1200,
        duration: '4 Weeks',
        price: '₹2,499',
        description: 'Learn the foundational mantras for daily practice and spiritual protection. This course covers the correct pronunciation, meaning, and significance of essential Vedic mantras.',
        modules: [
            { title: 'Introduction to Om & Gayathri Mantra', duration: '45 mins' },
            { title: 'Ganesh Proktam & Shanti Mantras', duration: '60 mins' },
            { title: 'Daily Protection Chants', duration: '50 mins' },
            { title: 'Conclusion & Practice Routine', duration: '30 mins' }
        ],
        features: [
            'Lifetime Access',
            'Certificate of Completion',
            'Live Q&A Sessions',
            'Downloadable Resources'
        ]
    };

    return (
        <div style={{ backgroundColor: 'var(--color-surface)', minHeight: '100vh', paddingBottom: '4rem' }}>

            {/* Hero Banner */}
            <div style={{
                backgroundColor: 'var(--color-primary-dark)',
                color: 'white',
                padding: '4rem 0',
                backgroundImage: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-secondary))'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.85rem',
                            fontWeight: 600
                        }}>
                            Bestseller
                        </span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0', color: 'white' }}>{course.title}</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: '1.6' }}>
                            {course.description}
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem', opacity: 0.9 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Star size={18} fill="#FFD700" color="#FFD700" />
                                <span>{course.rating} Rating</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <ShieldCheck size={18} />
                                <span>{course.instructor}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={18} />
                                <span>{course.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                {/* Main Content */}
                <div style={{ flex: 2, minWidth: '300px' }}>

                    {/* Curriculum */}
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Course Curriculum</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {course.modules.map((module, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '0.5rem',
                                    backgroundColor: 'var(--color-background)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <PlayCircle size={24} color="var(--color-primary)" />
                                        <div>
                                            <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Module {index + 1}: {module.title}</h4>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{module.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructor */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About the Instructor</h2>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                            <img src="/pandit_profile.jpg" alt="Acharya Ji" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }} />
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.instructor}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                    Head Priest & Vedic Astrologer. A renowned Vedic scholar with over 20 years of experience in teaching Sanskrit, Mantra Vidya, and conducting authentic Anushthans.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar / Pricing Card */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <div className="card" style={{ position: 'sticky', top: '100px', borderTop: '4px solid var(--color-primary)' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{course.price}</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>One-time payment</p>

                        <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', justifyContent: 'center' }}>
                            Buy Now
                        </Link>
                        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            Add to Wishlist
                        </button>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                            <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>This Course Includes:</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {course.features.map((feature, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        <CheckCircle size={16} color="var(--color-accent)" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseDetail;
