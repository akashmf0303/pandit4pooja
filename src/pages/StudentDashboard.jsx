import React from 'react';
import { Play, CheckCircle, Clock, BookOpen } from 'lucide-react';

const StudentDashboard = () => {
    const myCourses = [
        {
            id: 1,
            title: 'Vedic Mantras for Beginners',
            progress: 65,
            totalModules: 12,
            completedModules: 8,
            lastPlayed: 'Module 4: Gayathri Mantra'
        }
    ];

    return (
        <div style={{ padding: '4rem 0', minHeight: '80vh', backgroundColor: 'var(--color-background)' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem' }}>My Learning Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Course Progress Card */}
                    {myCourses.map(course => (
                        <div key={course.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase' }}>In Progress</span>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                                Last played: {course.lastPlayed}
                            </p>

                            {/* Progress Bar */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span>{course.progress}% Complete</span>
                                    <span>{course.completedModules}/{course.totalModules} Modules</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${course.progress}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                                </div>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                <Play size={18} style={{ marginRight: '0.5rem' }} /> Resume Learning
                            </button>
                        </div>
                    ))}

                    {/* Video Player Placeholder (Simulated Active Lesson) */}
                    <div className="card" style={{ gridColumn: '1 / -1', padding: '0', overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            backgroundColor: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <Play size={64} color="white" style={{ opacity: 0.8 }} />
                            <span style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontWeight: 500 }}>
                                Currently Playing: Understanding Swara
                            </span>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Module 4: Understanding Swara</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                In this lesson, we explore the importance of intonation (Swara) in Vedic reciting.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
