import axios from 'axios';
import CONSTANTS from '../utils/constants';

export const fetchMovies = async (query: string) => {
  try {
    const response = await axios.get(CONSTANTS.baseApiUrl, {
      params: {
        s: query,
        apikey: CONSTANTS.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
