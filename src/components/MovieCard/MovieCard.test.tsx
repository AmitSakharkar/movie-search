import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieCard from './MovieCard';
import MovieDetailsModal from '../MovieDetails/MovieDetails';
import { fetchMovies } from '../../services/api';

jest.mock('../../services/api');
jest.mock('../MovieDetails/MovieDetails', () => jest.fn(() => null));

const mockFetchMovies = fetchMovies as jest.MockedFunction<typeof fetchMovies>;

describe('MovieCard', () => {
    const movie = {
        id: '1',
        title: 'Inception',
        year: '2010',
        poster: 'inception.jpg',
    };

    beforeEach(() => {
        mockFetchMovies.mockClear();
    });

    test('renders movie card with title, year, and poster', () => {
        render(<MovieCard {...movie} />);

        expect(screen.getByText(movie.title)).toBeInTheDocument();
        expect(screen.getByText(movie.year)).toBeInTheDocument();
        expect(screen.getByAltText(movie.title)).toHaveAttribute('src', movie.poster);
    });

    test('opens modal and fetches movie details on click', async () => {
        const movieDetails = {
            Title: 'Inception',
            Year: '2010',
            Poster: 'inception.jpg',
            Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
            Genre: 'Action, Adventure, Sci-Fi',
            Director: 'Christopher Nolan',
            Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
            Runtime: '148 min',
        };

        mockFetchMovies.mockResolvedValueOnce({
            data: {
                Search: [],
                totalResults: '1',
                Response: 'True',
                ...movieDetails,
            },
        });

        render(<MovieCard {...movie} />);

        fireEvent.click(screen.getByAltText(movie.title));

        await waitFor(() => expect(mockFetchMovies).toHaveBeenCalledWith(movie.title, 'details'));

        expect(MovieDetailsModal).toHaveBeenCalledWith(
            expect.objectContaining({
                isOpen: true,
                movieDetails,
                isLoading: false,
            }),
            {}
        );
    });

    test('displays placeholder image if poster is N/A', () => {
        const movieWithNoPoster = { ...movie, poster: 'N/A' };

        render(<MovieCard {...movieWithNoPoster} />);

        expect(screen.getByAltText(movie.title)).toHaveAttribute('src', 'placeholder.jpg');
    });
});