import React, { useState, useEffect } from 'react';
import CategoryCard from '../../components/customer/CategoryCard';
import categoryService from '../../services/categoryService';
import Loader from '../../components/common/Loader';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories()
      .then(res => setCategories(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading service categories..." />;

  return (
    <div className="section container">
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        <span className="eyebrow">Explore Marketplace</span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Gig Service Categories</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Browse trusted, background-checked professionals available for hire in your local area across all trade categories.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat.id || cat._id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
