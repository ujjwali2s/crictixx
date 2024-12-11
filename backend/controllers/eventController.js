import { getEvents, getEventOdds } from '../services/eventService.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    console.error('Controller error - getAllEvents:', error);
    res.status(500).json({ message: 'Error fetching events.' });
  }
};

export const getOddsForEvent = async (req, res) => {
  try {
    const { sportRadarId } = req.params;
    const oddsData = await getEventOdds(sportRadarId);
    res.json(oddsData);
  } catch (error) {
    if (error.message === 'Event or odds not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching odds data' });
    }
  }
};