import React, { useState } from 'react';
import { fetchMovies, Movie, ApiResponse } from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

// Removed duplicate ApiResponse interface

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
        const response: Movie[] | { data: ApiResponse } = await fetchMovies(query, 'search');
        if (Array.isArray(response)) {
          setMovies(response);
        } else {
          setMovies(response.data as unknown as Movie[]);
        }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default Home;
