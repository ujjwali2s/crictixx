import React from 'react';
import { CricketBall, Target, Timer } from 'lucide-react';
import { BattingCard } from './BattingCard';
import { BowlingCard } from './BowlingCard';
import { MatchHeader } from './MatchHeader';
import { RecentOvers } from './RecentOvers';
import { TeamInnings } from './TeamInnings';

import scoreData from "../../scorecard_data.json";

export function ScoreCard() {
  // Access score data safely
  const score = scoreData?.doc?.[0]?.data?.score;

  // Handle loading or missing data scenario
  if (!score || !score.innings || !score.recentOvers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading match data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Match Header */}
        <MatchHeader
          title={score.matchTitle || "Match Title"}
          commentary={score.matchCommentary || "No commentary available."}
        />

        {/* Team Innings */}
        <div className="grid md:grid-cols-2 gap-6">
          {score.innings.map((innings, index) => (
            <TeamInnings
              key={index}
              teamName={innings.teamName || `Team ${index + 1}`}
              score={`${innings.runs || 0}/${innings.wickets || 0}`}
              overs={`${innings.overs || 0}`}
              target={innings.target || "-"}
              isCurrentInnings={index === (score.currentInningsNumber - 1)} // Highlight current innings
            />
          ))}
        </div>

        {/* Detailed Statistics Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Batting Card */}
            {score.innings[1] && <BattingCard innings={score.innings[1]} />}
            {/* Bowling Card */}
            {score.innings[0] && <BowlingCard innings={score.innings[0]} />}
          </div>
          <div className="space-y-6">
            {/* Recent Overs */}
            {score.recentOvers && <RecentOvers overs={score.recentOvers} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ScoreCard;