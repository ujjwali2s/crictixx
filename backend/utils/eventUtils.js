export const parseTeamNames = (eventName) => {
  if (!eventName) return ["Team 1", "Team 2"];
  return eventName.split(/ vs\.| v /).map(name => name.trim());
};

export const enrichEventData = (event) => {
  const [team1, team2] = parseTeamNames(event.event_name);
  return { ...event, team1, team2 };
};

export const filterOpenEvents = (events) => {
  return events.filter(event => 
    event.data && 
    event.data.status === 'OPEN'
  );
};

export const sortEventsByTimestamp = (events) => {
  return events.sort((a, b) => a.event_timestamp_date - b.event_timestamp_date);
};