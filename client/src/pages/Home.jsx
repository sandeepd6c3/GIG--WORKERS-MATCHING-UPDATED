import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import WorkerCard from '../components/WorkerCard';
import { getCategories } from '../services/api';

const defaultCategories = [
  { name: 'Electrician', slug: 'electrician' },
  { name: 'Plumber', slug: 'plumber' },
  { name: 'Carpenter', slug: 'carpenter' },
  { name: 'Painter', slug: 'painter' },
  { name: 'AC Repair & Service', slug: 'ac-repair' },
  { name: 'Appliance Repair', slug: 'appliance-repair' },
  { name: 'Home Cleaning', slug: 'cleaner' },
  { name: 'Pest Control', slug: 'pest' },
];

const sampleFeaturedWorkers = [
  {
    _id: '1',
    name: 'Ramesh Joshi',
    category: 'Electrician',
    city: 'Hyderabad',
    trustTier: 'gold',
    averageRating: 5.0,
    completedJobs: 307,
    experienceYears: 11,
    isAvailable: true,
    basePrice: 714,
  },
  {
    _id: '2',
    name: 'Manoj Patel',
    category: 'Appliance Repair',
    city: 'Hyderabad',
    trustTier: 'bronze',
    averageRating: 5.0,
    completedJobs: 352,
    experienceYears: 3,
    isAvailable: true,
    basePrice: 436,
  },
  {
    _id: '3',
    name: 'Neha Verma',
    category: 'Driver',
    city: 'Pune',
    trustTier: 'bronze',
    averageRating: 5.0,
    completedJobs: 167,
    experienceYears: 7,
    isAvailable: true,
    basePrice: 529,
  },
  {
    _id: '4',
    name: 'Rekha Patel',
    category: 'AC Repair & Service',
    city: 'Pune',
    trustTier: 'gold',
    averageRating: 4.9,
    completedJobs: 227,
    experienceYears: 4,
    isAvailable: true,
    basePrice: 378,
  },
  {
    _id: '5',
    name: 'Kavita Verma',
    category: 'Home Cleaning',
    city: 'Mumbai',
    trustTier: 'silver',
    averageRating: 4.9,
    completedJobs: 49,
    experienceYears: 12,
    isAvailable: true,
    basePrice: 349,
  },
  {
    _id: '6',
    name: 'Naveen Kumar',
    category: 'Home Cleaning',
    city: 'Delhi',
    trustTier: 'gold',
    averageRating: 4.9,
    completedJobs: 314,
    experienceYears: 7,
    isAvailable: true,
    basePrice: 605,
  },
];

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data && data.length > 0 ? data : defaultCategories);
      } catch (err) {
        setCategories(defaultCategories);
      }
    };
    loadCategories();
  }, []);

  return (
    <div>
      {/* Hero Banner (Dark Navy) */}
      <section style={{ background: 'var(--navy-hero)', color: '#ffffff', padding: '4rem 0 3.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              🤖 AI-matched · Verified professionals
            </span>

            <h1 style={{ fontSize: '3rem', color: '#ffffff', lineHeight: 1.18, marginBottom: '1.25rem' }}>
              Skilled workers you can trust, matched to your job in minutes.
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 2.25rem', lineHeight: '1.6' }}>
              Electricians, plumbers, cleaners, tutors and 20+ more categories — background-checked and rated by real customers.
            </p>

            {/* Search Box */}
            <div style={{ maxWidth: '780px', margin: '0 auto 3rem' }}>
              <SearchBar categories={categories} />
            </div>

            {/* Stats Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'Sora' }}>26+</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Service categories</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'Sora' }}>12,000+</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Verified workers</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'Sora', color: '#fbbf24' }}>4.6★</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Avg. customer rating</div>
              </div>
              <div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'Sora' }}>40+</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Cities covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">BROWSE SERVICES</span>
              <h2 style={{ fontSize: '1.85rem' }}>Popular categories</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>20+ verified skill categories, from home repair to daily care</p>
            </div>
            <Link to="/categories" className="btn btn-outline">
              View all categories
            </Link>
          </div>

          <div className="category-grid">
            {categories.slice(0, 8).map((cat) => (
              <CategoryCard key={cat._id || cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* How GigMatch AI Works */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">SIMPLE PROCESS</span>
              <h2 style={{ fontSize: '1.85rem' }}>How GigMatch AI works</h2>
            </div>
          </div>

          <div className="grid-3">
            <div className="card-white" style={{ textAlign: 'left', padding: '1.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--accent-green-soft)',
                  color: 'var(--accent-green)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Tell us the job</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Pick a category, share your location and describe what you need done.
              </p>
            </div>

            <div className="card-white" style={{ textAlign: 'left', padding: '1.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--accent-green-soft)',
                  color: 'var(--accent-green)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Get AI-matched workers</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Our matching engine ranks verified workers by skill, rating, distance and availability.
              </p>
            </div>

            <div className="card-white" style={{ textAlign: 'left', padding: '1.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--accent-green-soft)',
                  color: 'var(--accent-green)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Book with confidence</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Compare trust badges and reviews, then book directly — no back-and-forth calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals Grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">TOP RATED</span>
              <h2 style={{ fontSize: '1.85rem' }}>Featured professionals</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Highly rated workers active on the platform this week</p>
            </div>
            <Link to="/workers" className="btn btn-outline">
              Browse all workers
            </Link>
          </div>

          <div className="results-grid">
            {sampleFeaturedWorkers.map((worker) => (
              <WorkerCard key={worker._id} worker={worker} />
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Trust Check Banner */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="card-white"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
              background: 'rgba(15, 33, 55, 0.03)',
              border: 'none',
              padding: '1.75rem 2rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Every worker goes through our 3-step trust check</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Government ID verification, skill assessment and background screening — reflected in Gold, Silver and Bronze trust badges.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <span className="trust-badge gold">✓ Gold Verified</span>
              <span className="trust-badge silver">✓ Silver Verified</span>
              <span className="trust-badge bronze">✓ Bronze Verified</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
