import React from 'react';
import { useNavigate } from 'react-router-dom';

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  const handleWatchClick = () => {
    navigate('/video', { 
      state: { 
        adfreeUrl: match.adfree_url || match.video_url 
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={match.src} 
        alt={match.title || match.event_name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{match.title || match.event_name}</h3>
        {match.team_1 && match.team_2 && (
          <p className="text-gray-600 mb-2">
            {match.team_1} vs {match.team_2}
          </p>
        )}
        <p className="text-sm text-gray-500 mb-1">
          Status: <span className="font-medium">{match.status || (match.isLive ? 'LIVE' : 'Upcoming')}</span>
        </p>
        {match.broadcast_channel && (
          <p className="text-sm text-gray-500 mb-1">
            Channel: {match.broadcast_channel}
          </p>
        )}
        {(match.status === 'LIVE' || match.isLive) && (
          <button
            onClick={handleWatchClick}
            className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Watch Now
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchCard;