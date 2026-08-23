import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/customer/SearchBar';
import WorkerCard from '../../components/customer/WorkerCard';
import workerService from '../../services/workerService';
import Loader from '../../components/common/Loader';

const FindWorkers = () => {
  const [searchParams] = useSearchParams();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const fetchWorkers = (params = {}) => {
    setLoading(true);
    workerService.getWorkers(params)
      .then(res => setWorkers(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkers({ category: categoryParam, search: searchParam });
  }, [categoryParam, searchParam]);

  const handleSearch = ({ search, location }) => {
    fetchWorkers({ category: categoryParam, search, location });
  };

  return (
    <div className="section container">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Find Gig Workers</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {categoryParam ? `Showing top available workers for "${categoryParam}"` : 'Browse available local professionals matched to your needs'}
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <SearchBar onSearch={handleSearch} initialQuery={searchParam} />
      </div>

      {loading ? (
        <Loader label="Matching top gig workers..." />
      ) : (
        <div className="results-grid">
          {workers.length > 0 ? (
            workers.map(worker => (
              <WorkerCard key={worker._id} worker={worker} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem' }}>
              <h3>No matching workers found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try broadening your search or choosing a different category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindWorkers;
