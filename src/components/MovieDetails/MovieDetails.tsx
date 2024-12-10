import React from 'react';
import Modal from 'react-modal';

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

interface MovieDetailsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    movieDetails: MovieDetailsData | null;
    isLoading: boolean;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
    isOpen,
    onRequestClose,
    movieDetails,
    isLoading,
}) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
            {isLoading ? (
                <div className="loader">Loading...</div>
            ) : movieDetails ? (
                <div className="modal-content">
                    <button onClick={onRequestClose} className="close-button">
                        &times;
                    </button>
                    <h2>{movieDetails.Title}</h2>
                    <img
                        src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'placeholder.jpg'}
                        alt={movieDetails.Title}
                    />
                    <p><strong>Year:</strong> {movieDetails.Year}</p>
                    <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                    <p><strong>Director:</strong> {movieDetails.Director}</p>
                    <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                    <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
                    <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                </div>
            ) : (
                <div className="error">Failed to load movie details.</div>
            )}
        </Modal>
    );
};

export default MovieDetailsModal;
