export interface Match {
  match_id: string;
  title: string;
  team_1: string;
  team_2: string;
  status: string;
  event_name: string;
  startTime: string;
  src: string;
  adfree_url?: string;
  dai_url?: string;
  contentId?: string;
  broadcast_channel?: string;
  audioLanguageName?: string;
  match_name?: string;
  isLive?: boolean;
}

export interface MatchesResponse {
  matches: Match[];
}