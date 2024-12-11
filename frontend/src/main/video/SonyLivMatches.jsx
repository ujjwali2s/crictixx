import React, { useEffect, useState } from 'react';
import MatchesGrid from './MatchesGrid';
import { fetchMatches } from '../utils/api';

const SonyLivMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatches('SONYLIV');
        setMatches(data);
      } catch (err) {
        setError(err.message || 'Failed to load matches');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  const liveMatches = matches.filter((match) => match.isLive);
  const upcomingMatches = matches.filter((match) => !match.isLive);

  return (
    <div className="space-y-8">
      <MatchesGrid title="Live Matches" matches={liveMatches} />
      <MatchesGrid title="Upcoming Matches" matches={upcomingMatches} />
    </div>
  );
};

export default SonyLivMatches;