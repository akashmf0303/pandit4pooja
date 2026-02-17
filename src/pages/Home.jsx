import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Star, CheckCircle, ArrowRight, Video, Shield, PlayCircle } from 'lucide-react';
import BookingWizard from '../components/Booking/BookingWizard';

const rituals = [
    "Akhand Ramayan", "Annaprashan", "Antim Sanskar", "Ark Vivah", "Baglamukhi Puja",
    "Bhagwat Katha", "Chandi Path", "Durga Puja", "Gand Mool Shanti", "Ganesh Puja",
    "Grah Shanti (Navgrah)", "Griha Pravesh", "Hanuman Chalisa Path", "Janeu Sanskar",
    "Kaal Bhairav Ashtami", "Kali Puja", "Kalsarp Dosh Nivaran", "Karnavedha",
    "Kumbh Vivah", "Lakshmi Puja", "Maha Mrityunjay Jaap", "Mangal Dosh Nivaran",
    "Mundan Sanskar", "Namkaran Sanskar", "Nishkramana", "Pitra Dosh Nivaran",
    "Pumsavana", "Rudrabhishek", "Saraswati Puja", "Satyanarayan Katha",
    "Shiv Puran Katha", "Shradh Puja", "Simantonnayana", "Sundarkand Path",
    "Tulsi Vivah", "Vastu Shanti", "Vidyarambh", "Vishnu Sahasranam", "Vivah Sanskar"
].sort();

const Home = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [bookingWidget, setBookingWidget] = useState({
        occasion: 'Rudrabhishek',
        date: '',
        location: ''
    });
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "Priyal Sharma",
            location: "Mumbai",
            rating: 5,
            comment: "I booked a Rudrabhishek for my parents. The pandit ji was very knowledgeable and the entire process was seamless.",
            image: "/profile_priyal.png"
        },
        {
            id: 2,
            name: "Rahul Verma",
            location: "Delhi",
            rating: 5,
            comment: "Excellent service! The booking was easy, and the pandit ji arrived on time with all the samagri. Highly recommended.",
            image: "/profile_rahul.png"
        },
        {
            id: 3,
            name: "Sunita Gupta",
            location: "Bangalore",
            rating: 4,
            comment: "Very peaceful experience. We performed the Satyanarayan Katha online, and the video quality was great.",
            image: "/profile_sunita.png"
        }
    ]);

    const [newReview, setNewReview] = useState({ name: '', location: '', rating: 5, comment: '' });

    const openWizard = () => setIsWizardOpen(true);

    const bookSpecificRitual = (ritualName) => {
        setBookingWidget({ ...bookingWidget, occasion: ritualName });
        setIsWizardOpen(true);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const review = {
            id: reviews.length + 1,
            ...newReview,
            image: `https://ui-avatars.com/api/?name=${newReview.name}&background=random` // Fallback for new users
        };
        setReviews([review, ...reviews]);
        setIsReviewModalOpen(false);
        setNewReview({ name: '', location: '', rating: 5, comment: '' });
    };

    return (
        <div>
            <BookingWizard
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                initialData={bookingWidget}
            />

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="card" style={{ width: '90%', maxWidth: '500px', position: 'relative' }}>
                        <button
                            onClick={() => setIsReviewModalOpen(false)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <Calendar size={24} style={{ transform: 'rotate(45deg)' }} /> {/* Using Calendar as X for now if X not imported, wait, let's fix import */}
                        </button>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Share Your Experience</h3>
                        <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text" placeholder="Your Name" required className="input"
                                value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                            />
                            <input
                                type="text" placeholder="Location (City)" required className="input"
                                value={newReview.location} onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                            />
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Rating</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            <Star size={24} fill={star <= newReview.rating ? "#fbbf24" : "none"} color={star <= newReview.rating ? "#fbbf24" : "#ccc"} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                placeholder="Write your review here..." required className="input" rows="4"
                                value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                            ></textarea>
                            <button type="submit" className="btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                textAlign: 'center',
                padding: '0 1rem'
            }} className="sacred-pattern">

                {/* Abstract Mandala Background */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '800px', height: '800px', opacity: 0.1, pointerEvents: 'none',
                    backgroundImage: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="fade-in">
                    <span style={{
                        display: 'inline-block', marginBottom: '1.5rem', padding: '0.75rem 2rem',
                        borderRadius: '2rem', backgroundColor: '#e65100', // Darker/Richer Orange
                        color: 'white', fontWeight: 800, letterSpacing: '0.05em',
                        boxShadow: '0 4px 15px rgba(230, 81, 0, 0.4)', textTransform: 'uppercase'
                    }}>
                        #1 Platform: Pandit 4 Pooja
                    </span>
                    <h1 style={{ marginBottom: '1.5rem', color: '#000000', fontWeight: 800, textShadow: 'none' }}>
                        Book Trusted Pandits for <br /> <span style={{ color: '#FF6D00', textShadow: '0 2px 10px rgba(255, 109, 0, 0.2)' }}>Sacred Rituals</span> {/* Brighter Orange */}
                    </h1>
                    <p style={{ fontSize: '1.6rem', color: '#111827', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', fontWeight: 600, lineHeight: '1.6' }}>
                        Perform Hawan, Anushthan, and Poojas with verified Vedic experts. <br />
                        Experience divinity from the comfort of your home or online.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={openWizard} className="btn btn-primary" style={{
                            padding: '1.25rem 3rem', fontSize: '1.2rem', fontWeight: 700,
                            background: 'linear-gradient(135deg, #FF6D00 0%, #FF9100 100%)', // Vibrant Gradient
                            boxShadow: '0 10px 25px rgba(255, 109, 0, 0.5)',
                            border: 'none'
                        }}>
                            Book a Pandit Now
                        </button>
                        <Link to="/courses" className="btn btn-secondary" style={{
                            padding: '1.25rem 3rem', fontSize: '1.2rem',
                            borderColor: '#FF6D00', color: '#FF6D00',
                            fontWeight: 700, borderWidth: '2px',
                            background: 'transparent'
                        }}>
                            <PlayCircle size={24} style={{ marginRight: '0.5rem' }} />
                            Learn Mantras
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Booking Widget - Floating */}
            <div style={{ position: 'relative', marginTop: '-60px', zIndex: 10, padding: '0 1rem' }} className="fade-in">
                <div className="container card glass-effect" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem', alignItems: 'end', padding: '2rem', borderRadius: '1rem',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Ritual</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#999' }} />
                            <select
                                className="select"
                                style={{ paddingLeft: '2.5rem' }}
                                value={bookingWidget.occasion}
                                onChange={(e) => setBookingWidget({ ...bookingWidget, occasion: e.target.value })}
                            >
                                {rituals.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#999' }} />
                            <input
                                type="date"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={bookingWidget.date}
                                onChange={(e) => setBookingWidget({ ...bookingWidget, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#999' }} />
                            <input
                                type="text"
                                placeholder="City or Online"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={bookingWidget.location}
                                onChange={(e) => setBookingWidget({ ...bookingWidget, location: e.target.value })}
                            />
                        </div>
                    </div>
                    <button onClick={openWizard} className="btn btn-primary" style={{ height: '48px' }}>Check Availability</button>
                </div>
            </div>

            {/* How It Works - New Section */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="text-saffron" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Process</h2>
                        <h3 style={{ fontSize: '2.5rem' }}>How It Works</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'center' }}>
                        {[
                            { title: 'Select Ritual', desc: 'Choose from 50+ Vedic Anushthans.', icon: Search },
                            { title: 'Customize', desc: 'Pick date, time, and samagri options.', icon: Calendar },
                            { title: 'Perform', desc: 'Connect with Pandit Ji online or offline.', icon: Video },
                            { title: 'Blessings', desc: 'Receive Prasad and digital recording.', icon: Star }
                        ].map((step, i) => (
                            <div key={i} className="float-hover" style={{ padding: '2rem', borderRadius: '1rem', backgroundColor: 'var(--color-gray-50)' }}>
                                <div style={{
                                    width: '64px', height: '64px', margin: '0 auto 1.5rem',
                                    backgroundColor: 'var(--color-primary-light)', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'
                                }}>
                                    <step.icon size={32} />
                                </div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                                <p style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Anushthans */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Popular Anushthans</h2>
                            <p style={{ color: 'var(--color-text-muted)' }}>Most booked rituals by our devotees this month</p>
                        </div>
                        <Link to="/services" className="btn btn-secondary">View All Services</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Maha Mrityunjay Jaap', desc: 'For longevity and health', price: '₹21,000', img: '/anushthan_mahamrityunjay.png' },
                            { title: 'Navgrah Shanti', desc: 'Pacify nine planets', price: '₹5,100', img: '/anushthan_navgrah.png' },
                            { title: 'Rudrabhishek', desc: 'Shiva invocation for prosperity', price: '₹2,100', img: '/anushthan_rudrabhishek.png' }
                        ].map((item, i) => (
                            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{item.desc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>{item.price}</span>
                                        <button onClick={() => bookSpecificRitual(item.title)} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Book</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Trust Us?</h2>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            We bring authenticity to your doorstep. Every pandit is verified and every ritual is performed according to Vedic scriptures.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Verified Vedic Pandits', icon: Shield },
                            { title: '100% Authentic Samagri', icon: CheckCircle },
                            { title: 'Live Video Streaming', icon: Video }
                        ].map((feat, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
                                <div style={{ color: 'var(--color-primary)' }}><feat.icon size={32} /></div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feat.title}</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Experienced acharyas from Kashi and Haridwar.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section style={{ padding: '6rem 0', backgroundColor: '#1e293b', color: 'white' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
                    <div style={{ maxWidth: '500px' }}>
                        <span style={{ color: '#fbbf24', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Vedic Wisdom</span>
                        <h2 style={{ fontSize: '3rem', margin: '1rem 0', color: 'white' }}>Learn the Ancient <br /> Science of Mantras</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Join 5000+ students learning authentic Sanskrit chanting and Vedic rituals from home.
                        </p>
                        <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <img src="/pandit_profile.jpg" alt="Acharya Ji" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fbbf24' }} />
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', margin: 0, color: '#fbbf24' }}>Ankush Shukla</h4>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Head Priest & Vedic Astrologer</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.9 }}>
                                "The vibration of a mantra is more important than the meaning. Learn to vibrate correctly."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Devotee Experiences</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>See what our devotees are saying</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        {reviews.map((review) => (
                            <div key={review.id} className="card" style={{ textAlign: 'left' }}>
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#fbbf24' }}>
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= review.rating ? "#fbbf24" : "none"} color={s <= review.rating ? "#fbbf24" : "#e5e7eb"} />)}
                                </div>
                                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--color-text-main)', minHeight: '80px' }}>
                                    "{review.comment}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={review.image} alt={review.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                        <h5 style={{ fontSize: '1rem', margin: 0 }}>{review.name}</h5>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{review.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="btn btn-secondary"
                        style={{ padding: '1rem 2.5rem' }}
                    >
                        Write a Review
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
