import React from 'react';
import MatchCard from './MatchCard';

const MatchesGrid = ({ title, matches }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No {title.toLowerCase()} available</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard key={match.match_id || match.contentId} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchesGrid;