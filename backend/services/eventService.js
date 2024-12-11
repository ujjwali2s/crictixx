import { fetchFromApi } from './apiService.js';
import { filterOpenEvents, sortEventsByTimestamp, enrichEventData } from '../utils/eventUtils.js';

/**
 * Utility function to parse team names and draw from the event name.
 * @param {string} eventName - The event name containing the team names and optionally a draw.
 * @returns {Object} - An object containing team1, team2, and draw (if applicable).
 */
const parseTeamsFromEventName = (eventName) => {
  if (!eventName) {
    throw new Error('Invalid event name');
  }

  // Split event name using 'v' or 'vs.' as delimiters
  const delimiters = / v | vs\. /i;
  const teams = eventName.split(delimiters);

  if (teams.length < 2) {
    throw new Error(`Unable to parse team names from event name: "${eventName}"`);
  }

  // Check for a third part (e.g., draw) if it exists
  return {
    team1: teams[0].trim(),
    team2: teams[1].trim(),
    draw: teams.length === 3 ? null : 'Draw',
  };
};

export const getEvents = async () => {
  try {
    const { events } = await fetchFromApi();

    const openEvents = filterOpenEvents(events);
    const sortedEvents = sortEventsByTimestamp(openEvents);

    // Enrich event data with parsed team names and draw
    const enrichedEvents = sortedEvents.map(event => {
      const { team1, team2, draw } = parseTeamsFromEventName(event.event_name);
      return {
        ...enrichEventData(event),
        team1,
        team2,
        draw,
      };
    });

    return enrichedEvents;
  } catch (error) {
    console.error('Error in getEvents:', error);
    throw new Error('Failed to process events');
  }
};

export const getEventOdds = async (sportRadarId) => {
  try {
    const { events } = await fetchFromApi();

    const event = events.find(e => e.sport_radar_id === parseInt(sportRadarId, 10));

    if (!event?.data?.runners) {
      throw new Error('Event or odds not found');
    }

    // Parse team names and draw from event name
    const { team1, team2, draw } = parseTeamsFromEventName(event.event_name);

    const runnersData = event.data.runners.map((runner, index) => ({
      teamName: index === 0 ? team1 : index === 1 ? team2 : draw,
      odds_back: runner.ex.availableToBack.map(odd => odd.price),
      odds_lay: runner.ex.availableToLay.map(odd => odd.price),
    }));

    return {
      eventName: event.event_name,
      teamsWithOdds: runnersData,
      team1,
      team2,
      draw,
    };
  } catch (error) {
    console.error('Error in getEventOdds:', error);
    throw error;
  }
};
