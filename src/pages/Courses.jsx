import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Star, ArrowRight, User } from 'lucide-react';

const Courses = () => {
    const courses = [
        {
            id: 1,
            title: 'Vedic Mantras for Beginners',
            instructor: 'Ankush Shukla',
            rating: 4.8,
            students: 1200,
            duration: '4 Weeks',
            price: '₹2,499',
            image: '/anushthan_mahamrityunjay.png',
            description: 'Learn the foundational mantras for daily practice and spiritual protection.'
        },
        {
            id: 2,
            title: 'Advanced Rudram Chanting',
            instructor: 'Ankush Shukla',
            rating: 4.9,
            students: 850,
            duration: '8 Weeks',
            price: '₹5,999',
            image: '/anushthan_rudrabhishek.png',
            description: 'Master the powerful Sri Rudram with perfect swara and pronunciation.'
        },
        {
            id: 3,
            title: 'Science of Yagya & Hawan',
            instructor: 'Ankush Shukla',
            rating: 4.7,
            students: 600,
            duration: '6 Weeks',
            price: '₹4,499',
            image: '/anushthan_navgrah.png',
            description: 'Understand the meaning, procedure, and benefits of Vedic fire rituals.'
        }
    ];

    return (
        <div style={{ padding: '4rem 0 6rem', backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ marginBottom: '1rem' }}>Vedic Wisdom Courses</h1>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Learn authentic mantras and rituals from certified Vedic scholars.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                    {courses.map(course => (
                        <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {/* Course Image Placeholder */}
                            <div style={{
                                height: '180px',
                                position: 'relative'
                            }}>
                                <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, backgroundColor: 'var(--color-primary-light)', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                                        Certified Course
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: '#fbbf24' }}>
                                        <Star size={14} fill="#fbbf24" />
                                        <span>{course.rating}</span>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{course.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{course.description}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    <User size={16} />
                                    <span>{course.instructor}</span>
                                </div>

                                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        <Clock size={16} />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                                        {course.price}
                                    </div>
                                </div>

                                <Link to={`/courses/${course.id}`} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                                    View Details <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
