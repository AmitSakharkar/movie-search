import React from 'react';
import { render } from '@testing-library/react';
import MovieList from './MovieList';

const mockMovies = [
    {
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://example.com/inception.jpg',
    },
    {
        Title: 'Interstellar',
        Year: '2014',
        Poster: 'https://example.com/interstellar.jpg',
    },
];

describe('MovieList Component', () => {
    it('should render without crashing', () => {
        const { container } = render(<MovieList movies={[]} />);
        expect(container).toBeInTheDocument();
    });

    it('should render the correct number of MovieCard components', () => {
        const { getAllByTestId } = render(<MovieList movies={mockMovies} />);
        const movieCards = getAllByTestId('movie-card');
        expect(movieCards.length).toBe(mockMovies.length);
    });

    it('should render movie details correctly', () => {
        const { getByText } = render(<MovieList movies={mockMovies} />);
        mockMovies.forEach((movie) => {
            expect(getByText(movie.Title)).toBeInTheDocument();
            expect(getByText(movie.Year)).toBeInTheDocument();
        });
    });
});