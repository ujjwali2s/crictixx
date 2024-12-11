export default function OddsTable({ runners, team1, team2 }) {
  const drawRow = runners.length === 3;

  const OddsCell = ({ type, odds }) => {
    const baseClasses = "px-4 py-2 rounded-lg text-center font-semibold";
    const classes = type === "back" 
      ? `${baseClasses} bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 cursor-pointer`
      : `${baseClasses} bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 cursor-pointer`;
    
    return (
      <td className="p-1">
        <div className={classes}>
          {odds || "N/A"}
        </div>
      </td>
    );
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="text-left text-gray-400 font-medium px-4 py-2">Selection</th>
            <th className="text-center text-blue-400 font-medium px-4 py-2">Back</th>
            <th className="text-center text-pink-400 font-medium px-4 py-2">Lay</th>
          </tr>
        </thead>
        <tbody>
          {runners.slice(0, 2).map((runner, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-4 py-2 text-gray-200">{index === 0 ? team1 : team2}</td>
              <OddsCell 
                type="back" 
                odds={runner.ex?.availableToBack?.[0]?.price} 
              />
              <OddsCell 
                type="lay" 
                odds={runner.ex?.availableToLay?.[0]?.price} 
              />
            </tr>
          ))}
          {drawRow && (
            <tr className="hover:bg-gray-800/50 transition-colors">
              <td className="px-4 py-2 text-gray-200">Draw</td>
              <OddsCell 
                type="back" 
                odds={runners[2]?.ex?.availableToBack?.[0]?.price} 
              />
              <OddsCell 
                type="lay" 
                odds={runners[2]?.ex?.availableToLay?.[0]?.price} 
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}