import axios from 'axios';
import CONSTANTS from '../utils/constants';
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export const fetchMovies = async (query: string, type: 'search' | 'details') => {
  try {
    const params: { [key: string]: string } = {
      apikey: CONSTANTS.apiKey,
      plot: 'full',
    };

    if (type === 'search') {
      params['s'] = query;
    } else if (type === 'details') {
      params['t'] = query;
    }

    const response: { data: ApiResponse } = await axios.get(CONSTANTS.baseApiUrl, { params });

    if (type === 'search') {
      const sortedMoviesList: Movie[] = response.data.Search.sort(
        (objA, objB) => Number(objB.Year) - Number(objA.Year),
      );
      return sortedMoviesList;
    } else {
      return response;
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
