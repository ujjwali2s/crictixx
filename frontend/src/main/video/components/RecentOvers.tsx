interface Over {
  overNumber: number;
  runs: number;
  balls: string[]; // balls is an array of strings like ['w', '4', '6', '1', '2']
  isCurrentOver: boolean;
}

interface RecentOversProps {
  overs: Over[];
}

export function RecentOvers({ overs }: RecentOversProps) {
  if (!overs || overs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Overs</h3>
        <div className="text-gray-500">No recent overs data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Overs</h3>
      <div className="space-y-4">
        {overs.map((over, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${over.isCurrentOver ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Over {over.overNumber}</span>
              <span className="text-green-600 font-medium">{over.runs} runs</span>
            </div>
            <div className="flex gap-2">
              {over.balls.length === 0 ? (
                <div className="text-gray-500">No balls data available</div>
              ) : (
                over.balls
                  .filter(ball => ball !== '') // Filter out empty balls if any
                  .map((ball, ballIndex) => (
                    <div
                      key={ballIndex}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                        ${ball === 'w' ? 'bg-red-100 text-red-600' : 
                          ball === '4' || ball === '6' ? 'bg-green-100 text-green-600' : 
                          'bg-gray-100 text-gray-600'}`}
                    >
                      {ball}
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
