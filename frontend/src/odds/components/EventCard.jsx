import { Clock, Trophy } from 'lucide-react';
import OddsTable from './OddsTable';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

export default function EventCard({ event, onClick }) {
  const navigate = useNavigate();  // Initialize navigate function

  const convertToIST = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEventClick = (eventId) => {
    // Navigate to the scorecard route with event.sport_radar_id as matchId
    navigate(`/get_scorecard/${eventId}`);
  };

  return (
    <div 
      onClick={() => handleEventClick(event.sport_radar_id)}  // Update onClick to use handleEventClick
      className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700 hover:border-gray-600"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{event.event_name}</h3>
          {event.data?.inplay && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded-full animate-pulse">
              LIVE
            </span>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-400 text-sm">
            <Trophy className="w-4 h-4 mr-2" />
            <span>{event.league_name}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {event.event_timestamp_date
                ? convertToIST(event.event_timestamp_date)
                : "Time TBD"}
            </span>
          </div>
        </div>
      </div>

      {/* Odds Table */}
      <div className="p-4 bg-gray-850">
        {event.data?.runners ? (
          <OddsTable
            runners={event.data.runners}
            team1={event.team1}
            team2={event.team2}
          />
        ) : (
          <p className="text-gray-400 text-sm text-center">Odds not available</p>
        )}
      </div>
    </div>
  );
}
