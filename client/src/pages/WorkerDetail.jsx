import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const WorkerDetail = () => {
  const { id } = useParams();

  const worker = {
    name: 'Ramesh Joshi',
    category: 'Electrician',
    city: 'Hyderabad',
    trustTier: 'gold',
    averageRating: 5.0,
    totalReviews: 48,
    completedJobs: 307,
    experienceYears: 11,
    isAvailable: true,
    basePrice: 714,
    skills: ['Residential Wiring', 'Inverter Setup', 'Circuit Breakers', 'MCB Installation', 'Generator Repair'],
    bio: 'Licensed Master Electrician with 11+ years of experience servicing residential homes and commercial offices. Specialized in high-voltage panel wiring, surge protection, and 24/7 emergency power restoration.',
    workingDays: 'Monday – Saturday',
    workingHours: '09:00 AM – 06:00 PM',
  };

  return (
    <div>
      {/* Header Banner & Breadcrumb */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '1.75rem 0' }}>
        <div className="container">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / <Link to="/workers" style={{ color: 'var(--text-secondary)' }}>Find Workers</Link> / Profile
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{worker.name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Licensed {worker.category} • Background Checked</p>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 340px)', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Left Profile Overview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Profile Card */}
              <div className="card-white">
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--navy-dark)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.85rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    RJ
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                      <h2 style={{ fontSize: '1.65rem' }}>{worker.name}</h2>
                      <span className="trust-badge gold">✓ Gold Verified</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      ⚡ {worker.category} • {worker.city}
                    </p>

                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                      <span style={{ color: '#d97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Star size={16} fill="#d97706" /> {worker.averageRating.toFixed(1)} ({worker.totalReviews} reviews)
                      </span>
                      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{worker.completedJobs} jobs done</span>
                      <span style={{ color: 'var(--text-muted)' }}>{worker.experienceYears} yrs exp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Skills */}
              <div className="card-white">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>About Professional</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  {worker.bio}
                </p>

                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>Skills &amp; Expertise</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {worker.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--accent-green-soft)',
                        color: 'var(--accent-green-hover)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <CheckCircle2 size={14} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Schedule */}
              <div className="card-white">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Availability &amp; Schedule</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} style={{ color: 'var(--accent-green)' }} />
                    <span>{worker.workingDays}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={18} style={{ color: 'var(--accent-green)' }} />
                    <span>{worker.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Customer Reviews Section */}
              <div className="card-white">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Recent Reviews</h3>
                
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: '0.95rem' }}>Anand Sharma</strong>
                    <span style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 700 }}>★ 5.0</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    "Prompt arrival and very neat electrical panel work. Solved our short-circuit issue in less than an hour."
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: '0.95rem' }}>Priya Reddy</strong>
                    <span style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 700 }}>★ 5.0</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    "Super professional electrician. Transparent pricing with zero hidden charges. Highly recommended!"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Booking Card */}
            <aside style={{ position: 'sticky', top: '90px' }}>
              <div className="card-white" style={{ boxShadow: 'var(--shadow-md)' }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Service callout fee</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Sora' }}>
                      ₹{worker.basePrice}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/visit</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <Link to="/bookings" className="btn btn-primary btn-block" style={{ padding: '0.8rem' }}>
                    Book now
                  </Link>
                  <button className="btn btn-outline btn-block" style={{ padding: '0.8rem' }}>
                    Contact worker
                  </button>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--accent-green)' }} />
                  <span>Backed by GigMatch Trust &amp; Safety Policy</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerDetail;
