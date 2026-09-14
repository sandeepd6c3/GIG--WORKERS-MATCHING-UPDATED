import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Star, Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import SearchBar from '../../components/customer/SearchBar';
import CategoryCard from '../../components/customer/CategoryCard';
import WorkerCard from '../../components/customer/WorkerCard';
import categoryService from '../../services/categoryService';
import workerService from '../../services/workerService';

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [featuredWorkers, setFeaturedWorkers] = useState([]);

  useEffect(() => {
    categoryService.getCategories().then(res => setCategories(res.slice(0, 4)));
    workerService.getWorkers().then(res => setFeaturedWorkers(res.data?.slice(0, 3) || []));
  }, []);

  const handleSearch = ({ search, location }) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    navigate(`/workers?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #070a12 0%, #0c1424 50%, var(--bg-page) 100%)',
        color: '#ffffff',
        padding: '6rem 0 6.5rem 0',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent-green-soft)',
            border: '1px solid var(--accent-green-border)',
            color: 'var(--accent-green)',
            fontSize: '0.825rem',
            fontWeight: 700,
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            boxShadow: 'var(--accent-green-glow)'
          }}>
            <Sparkles size={15} /> AI-Powered Gig Worker Matching
          </span>

          <h1 style={{
            fontSize: '3.4rem',
            color: 'var(--text-white)',
            maxWidth: '880px',
            margin: '0 auto 1.35rem auto',
            lineHeight: 1.15,
            fontFamily: 'Sora, Outfit, sans-serif',
            letterSpacing: '-0.03em'
          }}>
            Book Top-Rated Local Experts <br />
            <span style={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              In Under 60 Seconds
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2.75rem auto', lineHeight: 1.6 }}>
            Verified background checks, instant scheduling, transparent hourly rates, and gold-tier service guarantees.
          </p>

          <SearchBar onSearch={handleSearch} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.25rem', marginTop: '3.25rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={17} color="var(--accent-green)" /> 100% Background Verified
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={17} color="var(--accent-green)" /> Instant Upfront Pricing
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={17} color="var(--accent-green)" /> Satisfaction Guaranteed
            </span>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow"><Sparkles size={13} /> Services Available</span>
              <h2 style={{ fontSize: '1.9rem' }}>Popular Gig Categories</h2>
            </div>
            <Link to="/categories" style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.95rem' }}>
              View All Categories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id || cat._id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers */}
      <section className="section" style={{ background: 'var(--bg-surface-subtle)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow"><Award size={13} /> Top Rated Talent</span>
              <h2 style={{ fontSize: '1.9rem' }}>Featured Gig Workers Nearby</h2>
            </div>
            <Link to="/workers" style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.95rem' }}>
              Explore All Workers <ArrowRight size={16} />
            </Link>
          </div>

          <div className="results-grid">
            {featuredWorkers.map((worker) => (
              <WorkerCard key={worker._id} worker={worker} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

