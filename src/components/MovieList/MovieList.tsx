import MovieCard from "components/MovieCard/MovieCard";

interface Movie {
    Title: string;
    Year: string;
    Poster: string;
  }
  
  interface MovieListProps {
    movies: Movie[];
  }
  
  const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            id={index.toString()}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
          />
        ))}
      </div>
    );
  };
  
  export default MovieList;
  