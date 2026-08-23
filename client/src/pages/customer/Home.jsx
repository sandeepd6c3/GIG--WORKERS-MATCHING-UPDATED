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
        background: 'linear-gradient(180deg, var(--navy-hero) 0%, var(--navy-dark) 100%)',
        color: '#ffffff',
        padding: '5rem 0 6rem 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(32, 180, 134, 0.15)',
            border: '1px solid rgba(32, 180, 134, 0.3)',
            color: 'var(--accent-green)',
            fontSize: '0.825rem',
            fontWeight: 700,
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} /> AI-Powered Gig Worker Matching
          </span>

          <h1 style={{ fontSize: '3.2rem', color: '#ffffff', maxWidth: '850px', margin: '0 auto 1.25rem auto', lineHeight: 1.15 }}>
            Book Top-Rated Local Experts <br />
            <span style={{ color: 'var(--accent-green)' }}>In Under 60 Seconds</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            Verified background checks, instant scheduling, transparent hourly rates, and gold-tier service guarantees.
          </p>

          <SearchBar onSearch={handleSearch} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--accent-green)" /> 100% Background Verified
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--accent-green)" /> Instant Upfront Pricing
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--accent-green)" /> Satisfaction Guaranteed
            </span>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Services Available</span>
              <h2>Popular Gig Categories</h2>
            </div>
            <Link to="/categories" style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
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
      <section className="section" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Top Rated Talent</span>
              <h2>Featured Gig Workers Nearby</h2>
            </div>
            <Link to="/workers" style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
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
