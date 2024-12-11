import { API_ENDPOINTS } from '../config/constants.js';

export async function fetchMatches(endpoint) {
  try {
    const response = await fetch(API_ENDPOINTS[endpoint]);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.matches) {
      throw new Error('Matches data not found');
    }

    return data.matches;
  } catch (error) {
    console.error(`Error fetching matches from ${endpoint}:`, error);
    throw error;
  }
}