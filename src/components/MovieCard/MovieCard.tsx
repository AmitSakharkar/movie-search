import React, { useState } from 'react';
import MovieDetailsModal from '../MovieDetails/MovieDetails';
import { fetchMovies } from '../../services/api';

interface MovieCardProps {
    id: string;
    title: string;
    year: string;
    poster: string;
}

interface MovieDetailsData {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
    Actors: string;
    Runtime: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, year, poster }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(null);
    const [loading, setLoading] = useState(false);

    const openModal = async (title: string) => {
        setModalIsOpen(true);
        setLoading(true);

        try {
            const response = await fetchMovies(title, 'details');
            let movieDetails: MovieDetailsData;
            if ('data' in response) {
                movieDetails = response.data as unknown as MovieDetailsData;
            } else {
                throw new Error('Unexpected response format');
            }

            setMovieDetails(movieDetails);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="movie-card">
            <div onClick={() => openModal(title)} style={{ cursor: 'pointer' }}>
                <img src={poster !== 'N/A' ? poster : 'placeholder.jpg'} alt={title} />
                <div className="movie-info">
                    <h3>{title}</h3>
                    <p>{year}</p>
                </div>
            </div>

            <MovieDetailsModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                movieDetails={movieDetails}
                isLoading={loading}
            />
        </div>
    );
};

export default MovieCard;
