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
  const [error, setError] = useState(null);
  const [isAiMatching, setIsAiMatching] = useState(false);

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const locationParam = searchParams.get('location') || '';

  const fetchWorkers = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const searchTerm = params.search || searchParam;
      const loc = params.location || locationParam;
      const cat = params.category || categoryParam;

      if (searchTerm || loc) {
        setIsAiMatching(true);
        const matchRes = await workerService.matchWorkers({
          service: searchTerm || cat || 'General Service',
          location: loc || undefined
        });
        let rawMatches = matchRes.matches || matchRes.data || matchRes.workers || [];
        const matchedList = rawMatches.map(m => {
          if (m.worker) {
            return {
              ...m.worker,
              matchScore: m.matchScore,
              scoreBreakdown: m.scoreBreakdown,
              name: m.worker.userId?.name || m.worker.title || 'Verified Specialist',
              category: m.worker.categoryName || m.worker.category || 'Service'
            };
          }
          return m;
        });
        setWorkers(matchedList);
      } else {
        setIsAiMatching(false);
        const res = await workerService.getWorkers({ category: cat, search: searchTerm });
        setWorkers(res.data || []);
      }
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError(err.message || 'Failed to match workers. Please try again.');
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers({ category: categoryParam, search: searchParam, location: locationParam });
  }, [categoryParam, searchParam, locationParam]);

  const handleSearch = ({ search, location }) => {
    fetchWorkers({ category: categoryParam, search, location });
  };

  return (
    <div className="section container">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Find Gig Workers</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {isAiMatching
            ? '🤖 AI Matching Engine active — workers dynamically ranked by skills, location, ratings & availability'
            : categoryParam
              ? `Showing top available workers for "${categoryParam}"`
              : 'Browse available local professionals matched to your needs'}
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <SearchBar onSearch={handleSearch} initialQuery={searchParam} initialLocation={locationParam} />
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#f87171',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <Loader label={isAiMatching ? "AI Matching Engine calculating best local talent..." : "Loading top gig workers..."} />
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
