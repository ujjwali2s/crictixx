import axios from 'axios';
import { API_URL, USER_AGENT } from '../config/constants.js';

const apiClient = axios.create({
  headers: {
    'User-Agent': USER_AGENT,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'iframe',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
  }
});

export const fetchFromApi = async (url = API_URL) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error.message);
    throw new Error('Failed to fetch data from API');
  }
};