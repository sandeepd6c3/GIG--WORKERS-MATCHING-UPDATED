import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import WorkerCard from '../components/WorkerCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getCategories } from '../services/api';

const sampleWorkersList = [
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

const WorkerDirectory = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || '';

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('rating');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        if (data && data.length > 0) setCategories(data);
      } catch (err) {}
    };
    fetchCats();
  }, []);

  // Filter & Sort Logic
  const filteredWorkers = sampleWorkersList.filter((worker) => {
    if (selectedCategory && worker.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (selectedCity && !worker.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    if (parseFloat(minRating) > 0 && worker.averageRating < parseFloat(minRating)) {
      return false;
    }
    if (availableOnly && !worker.isAvailable) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.averageRating - a.averageRating;
    if (sortBy === 'jobs') return b.completedJobs - a.completedJobs;
    if (sortBy === 'rate-low') return a.basePrice - b.basePrice;
    if (sortBy === 'rate-high') return b.basePrice - a.basePrice;
    return 0;
  });

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedCity('');
    setMinRating('0');
    setSortBy('rating');
    setAvailableOnly(false);
  };

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / Find Workers
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Find verified workers</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Showing {filteredWorkers.length} background-checked workers
          </p>
        </div>
      </section>

      {/* Main Listing Layout: Left Sidebar + Right Results */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 280px) 1fr', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Left Filter Sidebar */}
            <aside className="card-white" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                Filters
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Category Filter */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Category
                  </label>
                  <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All categories</option>
                    {categories.map((c) => (
                      <option key={c._id || c.slug} value={c.slug}>{c.name}</option>
                    ))}
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="ac-repair">AC Repair & Service</option>
                    <option value="cleaner">Home Cleaning</option>
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    City
                  </label>
                  <select
                    className="form-control"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">All cities</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Minimum rating
                  </label>
                  <select
                    className="form-control"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  >
                    <option value="0">Any rating</option>
                    <option value="4.5">4.5 &amp; up</option>
                    <option value="4">4.0 &amp; up</option>
                    <option value="3.5">3.5 &amp; up</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Sort by
                  </label>
                  <select
                    className="form-control"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Highest rated</option>
                    <option value="jobs">Most jobs done</option>
                    <option value="rate-low">Price: low to high</option>
                    <option value="rate-high">Price: high to low</option>
                  </select>
                </div>

                {/* Available Today Checkbox */}
                <div style={{ paddingTop: '0.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--accent-green)' }}
                    />
                    <span>Available today only</span>
                  </label>
                </div>

                {/* Clear Filters Button */}
                <button onClick={clearFilters} className="btn btn-outline btn-sm btn-block" style={{ marginTop: '0.5rem' }}>
                  Clear all filters
                </button>
              </div>
            </aside>

            {/* Right Results Grid */}
            <main>
              <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Showing <strong>{filteredWorkers.length}</strong> available professionals matching your criteria
              </div>

              {filteredWorkers.length === 0 ? (
                <div className="card-white" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No workers found</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Try expanding your filter selections or clearing category filters.</p>
                  <button onClick={clearFilters} className="btn btn-primary btn-sm">
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="results-grid">
                  {filteredWorkers.map((worker) => (
                    <WorkerCard key={worker._id} worker={worker} />
                  ))}
                </div>
              )}
            </main>

          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerDirectory;
