import React from 'react';
import Modal from 'react-modal';
import Loader from 'components/Loader/Loader';
import styles from './MovieDetails.module.css';
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
                <Loader />
            ) : movieDetails ? (
                <div className={styles.modalContent}>
                    <button onClick={onRequestClose} className={styles.closeButton}>
                        &times;
                    </button>
                    <img
                        src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'placeholder.jpg'}
                        alt={movieDetails.Title}
                    />
                    <h2>{movieDetails.Title}</h2>
                    <p><strong>Year:</strong> {movieDetails.Year}</p>
                    <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                    <p><strong>Director:</strong> {movieDetails.Director}</p>
                    <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                    <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
                    <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                </div>
            ) : (
                <div className={styles.error}>Failed to load movie details.</div>
            )}
        </Modal>
    );
};

export default MovieDetailsModal;
