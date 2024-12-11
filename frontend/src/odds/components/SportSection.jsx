export default function SportSection({ title, liveEvents, upcomingEvents }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-400 border-b border-gray-700 pb-2">
        {title}
      </h2>
      
      {/* Live Events */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-green-400 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Live Matches
        </h3>
        {liveEvents.length > 0 ? (
          <div className="grid gap-4">
            {liveEvents}
          </div>
        ) : (
          <p className="text-gray-400 italic">No live matches at the moment</p>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold text-blue-400">Upcoming Matches</h3>
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-4">
            {upcomingEvents}
          </div>
        ) : (
          <p className="text-gray-400 italic">No upcoming matches scheduled</p>
        )}
      </div>
    </div>
  );
}