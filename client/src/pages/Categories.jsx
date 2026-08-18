import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, AlertCircle, Wrench, ArrowLeft } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getCategories } from '../services/api';

const defaultCategoryList = [
  { name: 'Electrician', slug: 'electrician', workerCount: 1420, icon: 'electrician' },
  { name: 'Plumber', slug: 'plumber', workerCount: 980, icon: 'plumber' },
  { name: 'Carpenter', slug: 'carpenter', workerCount: 650, icon: 'carpenter' },
  { name: 'Painter', slug: 'painter', workerCount: 420, icon: 'painter' },
  { name: 'AC Repair', slug: 'ac-repair', workerCount: 890, icon: 'ac-repair' },
  { name: 'Appliance Repair', slug: 'appliance-repair', workerCount: 540, icon: 'appliance-repair' },
  { name: 'Home Cleaning', slug: 'cleaner', workerCount: 1100, icon: 'cleaner' },
  { name: 'Mechanic', slug: 'mechanic', workerCount: 310, icon: 'mechanic' },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data && data.length > 0 ? data : defaultCategoryList);
        setError(null);
      } catch (err) {
        setCategories(defaultCategoryList);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / Categories
        </div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>All Service Categories</h1>
        <p style={{ color: 'var(--text-secondary)' }}>20+ verified skill categories. Pick one to see available workers near you.</p>
      </div>

      {/* Category Search Input */}
      <div className="ui-card" style={{ maxWidth: '460px', marginBottom: '2rem', padding: '0.75rem 1rem' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="ui-input"
            placeholder="Search categories (e.g. plumber, electrician)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem', background: 'transparent', border: 'none' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Category Grid */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : filteredCategories.length === 0 ? (
        <div className="ui-card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
          <Wrench size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
          <p>No service categories match your search query "{searchTerm}".</p>
        </div>
      ) : (
        <div className="grid-4">
          {filteredCategories.map((cat) => (
            <CategoryCard key={cat._id || cat.slug} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
