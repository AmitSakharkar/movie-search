import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieDetailsModal from './MovieDetails';

const mockMovieDetails = {
    Title: 'Inception',
    Year: '2010',
    Poster: 'https://example.com/inception.jpg',
    Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    Genre: 'Action, Adventure, Sci-Fi',
    Director: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    Runtime: '148 min',
};

describe('MovieDetailsModal', () => {
    it('renders loader when loading', () => {
        render(<MovieDetailsModal isOpen={true} onRequestClose={jest.fn()} movieDetails={null} isLoading={true} />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders movie details when loaded', () => {
        render(<MovieDetailsModal isOpen={true} onRequestClose={jest.fn()} movieDetails={mockMovieDetails} isLoading={false} />);
        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('2010')).toBeInTheDocument();
        expect(screen.getByText('Action, Adventure, Sci-Fi')).toBeInTheDocument();
        expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
        expect(screen.getByText('Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page')).toBeInTheDocument();
        expect(screen.getByText('148 min')).toBeInTheDocument();
        expect(screen.getByText('A thief who steals corporate secrets through the use of dream-sharing technology.')).toBeInTheDocument();
    });

    it('renders error message when movie details are not available', () => {
        render(<MovieDetailsModal isOpen={true} onRequestClose={jest.fn()} movieDetails={null} isLoading={false} />);
        expect(screen.getByText('Failed to load movie details.')).toBeInTheDocument();
    });

    it('calls onRequestClose when close button is clicked', () => {
        const onRequestClose = jest.fn();
        render(<MovieDetailsModal isOpen={true} onRequestClose={onRequestClose} movieDetails={mockMovieDetails} isLoading={false} />);
        screen.getByText('×').click();
        expect(onRequestClose).toHaveBeenCalled();
    });
});